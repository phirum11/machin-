import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

const initialState = {
  items: [],
  wishlist: [],
  ratings: {},
  coupon: null,
  shipping: 0,
  tax: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'TOGGLE_WISHLIST':
      if (state.wishlist.includes(action.payload)) {
        return {
          ...state,
          wishlist: state.wishlist.filter((id) => id !== action.payload)
        };
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };

    case 'APPLY_COUPON':
      return {
        ...state,
        coupon: action.payload
      };

    case 'REMOVE_COUPON':
      return {
        ...state,
        coupon: null
      };

    case 'RATE_PRODUCT': {
      const { productId, userRating } = action.payload;
      const existing = state.ratings[productId] || { userRatings: [] };
      return {
        ...state,
        ratings: {
          ...state.ratings,
          [productId]: {
            userRatings: [...existing.userRatings, userRating]
          }
        }
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [savedCart, saveCart] = useLocalStorage('cart', initialState);
  const [state, dispatch] = useReducer(cartReducer, {
    ...initialState,
    ...savedCart,
    ratings: savedCart.ratings || {}
  });

  useEffect(() => {
    saveCart(state);
  }, [state, saveCart]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleWishlist = (productId) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  };

  const applyCoupon = (coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon });
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const rateProduct = (productId, userRating) => {
    dispatch({ type: 'RATE_PRODUCT', payload: { productId, userRating } });
  };

  const getProductRating = (productId, baseRating = 0, baseReviews = 0) => {
    try {
      const ratings = state.ratings || {};
      const productRatings = ratings[productId];
      if (
        !productRatings ||
        !productRatings.userRatings ||
        productRatings.userRatings.length === 0
      ) {
        return { avgRating: baseRating || 0, totalReviews: baseReviews || 0 };
      }
      const userRatings = productRatings.userRatings;
      const totalUserRating = userRatings.reduce((sum, r) => sum + r, 0);
      const totalRatingSum =
        (baseRating || 0) * (baseReviews || 0) + totalUserRating;
      const totalReviews = (baseReviews || 0) + userRatings.length;
      const avgRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;
      return { avgRating: Math.round(avgRating * 10) / 10, totalReviews };
    } catch {
      return { avgRating: baseRating || 0, totalReviews: baseReviews || 0 };
    }
  };

  const hasUserRated = (productId) => {
    const ratings = state.ratings || {};
    const productRatings = ratings[productId];
    return productRatings && productRatings.userRatings.length > 0;
  };

  const getCartTotal = () => {
    return state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return state.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const isInCart = (productId) => {
    return state.items.some((item) => item.id === productId);
  };

  const isInWishlist = (productId) => {
    return state.wishlist.includes(productId);
  };

  const value = {
    cart: state.items,
    wishlist: state.wishlist,
    coupon: state.coupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    applyCoupon,
    removeCoupon,
    rateProduct,
    getProductRating,
    hasUserRated,
    getCartTotal,
    getCartCount,
    isInCart,
    isInWishlist
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

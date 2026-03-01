import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductContext = createContext();

const initialState = {
  products: [],
  filteredProducts: [],
  categories: [],
  filters: {
    category: '',
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    inStock: false,
    search: ''
  },
  sortBy: 'newest',
  sortOrder: 'desc',
  loading: false,
  error: null
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload
      };

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      };

    case 'APPLY_FILTERS': {
      let filtered = [...state.products];

      // Apply category filter
      if (state.filters.category) {
        filtered = filtered.filter(p => p.category === state.filters.category);
      }

      // Apply price range filter
      filtered = filtered.filter(p => 
        p.price >= state.filters.priceRange.min && 
        p.price <= state.filters.priceRange.max
      );

      // Apply rating filter
      if (state.filters.rating > 0) {
        filtered = filtered.filter(p => (p.rating || 0) >= state.filters.rating);
      }

      // Apply stock filter
      if (state.filters.inStock) {
        filtered = filtered.filter(p => (p.stock || 0) > 0);
      }

      // Apply search filter
      if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.category?.toLowerCase().includes(searchLower)
        );
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let comparison = 0;
        switch (state.sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'rating':
            comparison = (a.rating || 0) - (b.rating || 0);
            break;
          case 'newest':
            comparison = new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
            break;
          case 'popularity':
            comparison = (a.soldCount || 0) - (b.soldCount || 0);
            break;
          default:
            comparison = 0;
        }
        return state.sortOrder === 'asc' ? comparison : -comparison;
      });

      return {
        ...state,
        filteredProducts: filtered
      };
    }

    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    // Load products
    dispatch({ type: 'SET_PRODUCTS', payload: initialProducts });
    
    // Extract categories
    const categories = [...new Set(initialProducts.map(p => p.category))];
    dispatch({ type: 'SET_CATEGORIES', payload: categories });
  }, []);

  useEffect(() => {
    dispatch({ type: 'APPLY_FILTERS' });
  }, [state.filters, state.sortBy, state.sortOrder, state.products]);

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setSort = (sortBy, sortOrder) => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  };

  const resetFilters = () => {
    dispatch({
      type: 'SET_FILTER',
      payload: {
        category: '',
        priceRange: { min: 0, max: 1000 },
        rating: 0,
        inStock: false,
        search: ''
      }
    });
  };

  const getProductById = (id) => {
    return state.products.find(p => p.id === id);
  };

  const getRelatedProducts = (productId, limit = 4) => {
    const product = getProductById(productId);
    if (!product) return [];
    
    return state.products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit);
  };

  const value = {
    products: state.filteredProducts,
    allProducts: state.products,
    categories: state.categories,
    filters: state.filters,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    loading: state.loading,
    error: state.error,
    setFilter,
    setSort,
    resetFilters,
    getProductById,
    getRelatedProducts
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
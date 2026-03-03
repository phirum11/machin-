import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart,
  FiHeart,
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiStar,
  FiCheckCircle
} from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import useAuth from '../hooks/useAuth';
import { formatCurrency } from '../utils/formatCurrency';
import RatingStars from '../components/common/RatingStars';
import ProductCard from '../components/product/ProductCard';
import LoginModal from '../components/auth/LoginModal';
import MainLayout from '../layout/MainLayout';
import { ScrollReveal, useScrollRevealMany } from '../hooks/useScrollReveal';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts } = useProducts();
  const {
    addToCart,
    toggleWishlist,
    isInCart,
    isInWishlist,
    rateProduct,
    getProductRating,
    hasUserRated
  } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const product = getProductById(id);

  if (!product) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-2xl text-gray-400 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/products')}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mx-auto"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Products
          </button>
        </div>
      </MainLayout>
    );
  }

  const related = getRelatedProducts(id);
  const inCart = isInCart(id);
  const wishlisted = isInWishlist(id);
  const { avgRating, totalReviews } = getProductRating(
    id,
    product.rating,
    product.reviews
  );
  const alreadyRated = hasUserRated(id);

  const handleSubmitRating = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (userRating > 0) {
      rateProduct(id, userRating);
      setRatingSubmitted(true);
      setTimeout(() => setRatingSubmitted(false), 3000);
      setUserRating(0);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleRelatedAddToCart = (relatedProduct) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    addToCart(relatedProduct);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back
        </button>

        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden">
              <img
                src={product.image || 'https://via.placeholder.com/600'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <RatingStars rating={avgRating} reviewCount={totalReviews} />
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 dark:text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Stock */}
              <p
                className={`text-sm font-medium mb-6 ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}
              >
                {product.stock > 0
                  ? `✓ In stock (${product.stock} available)`
                  : '✗ Out of stock'}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity:
                </span>
                <div className="flex items-center gap-3 border border-gray-200 dark:border-gray-600 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-700 dark:text-gray-300"
                    disabled={quantity <= 1}
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock || 10, q + 1))
                    }
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-700 dark:text-gray-300"
                    disabled={quantity >= (product.stock || 10)}
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {inCart ? 'Add More' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => toggleWishlist(id)}
                  className={`p-3 border rounded-lg transition-colors ${wishlisted ? 'border-red-300 dark:border-red-500/40 text-red-500 bg-red-50 dark:bg-red-500/10' : 'border-gray-200 dark:border-gray-600 text-gray-400 hover:text-red-500 hover:border-red-300'}`}
                  aria-label="Toggle wishlist"
                >
                  <FiHeart
                    className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* User Rating Section */}
        <ScrollReveal animation="fade-up" delay={50}>
          <section className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Rate this Product
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              Share your experience to help others make better decisions
            </p>

            {ratingSubmitted ? (
              <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl px-5 py-4">
                <FiCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-green-700 dark:text-green-300 font-medium">
                  Thank you! Your rating has been submitted.
                </span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your rating:
                  </p>
                  <RatingStars
                    rating={userRating}
                    size="xl"
                    interactive
                    onRate={setUserRating}
                    showValue={userRating > 0}
                    className="mb-1"
                  />
                  {userRating === 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      Click a star to rate
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubmitRating}
                  disabled={userRating === 0}
                  className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <FiStar className="w-4 h-4" />
                  Submit Rating
                </button>
              </div>
            )}

            {/* Rating summary */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900 dark:text-white">
                    {avgRating.toFixed(1)}
                  </p>
                  <RatingStars rating={avgRating} size="sm" showValue={false} />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {totalReviews.toLocaleString()} reviews
                  </p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percentage =
                      totalReviews > 0
                        ? Math.round(
                            star <= avgRating
                              ? star === Math.ceil(avgRating)
                                ? 60
                                : star < avgRating
                                  ? 80 + Math.random() * 15
                                  : 10 + Math.random() * 15
                              : 5 + Math.random() * 10
                          )
                        : 0;
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 w-3">
                          {star}
                        </span>
                        <FiStar className="w-3 h-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                        <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-8 text-right">
                          {percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Related Products */}
        {related.length > 0 && (
          <ScrollReveal animation="fade-up" delay={100}>
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={handleRelatedAddToCart}
                    onToggleWishlist={toggleWishlist}
                    onViewDetails={(pid) => navigate(`/product/${pid}`)}
                    isWishlisted={isInWishlist(p.id)}
                  />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}
      </div>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </MainLayout>
  );
};

export default ProductDetails;

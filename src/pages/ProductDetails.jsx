import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiArrowLeft, FiMinus, FiPlus, FiStar } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import RatingStars from '../components/common/RatingStars';
import ProductCard from '../components/product/ProductCard';
import MainLayout from '../layout/MainLayout';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts } = useProducts();
  const { addToCart, toggleWishlist, isInCart, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  if (!product) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-2xl text-gray-400 mb-4">Product not found</p>
          <button onClick={() => navigate('/products')} className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mx-auto">
            <FiArrowLeft className="w-4 h-4" /> Back to Products
          </button>
        </div>
      </MainLayout>
    );
  }

  const related = getRelatedProducts(id);
  const inCart = isInCart(id);
  const wishlisted = isInWishlist(id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-6 transition-colors">
          <FiArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <img src={product.image || 'https://via.placeholder.com/600'} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-sm text-blue-600 font-medium mb-2">{product.category}</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={product.rating || 0} />
              <span className="text-sm text-gray-500">({product.reviews || 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
              {product.discount > 0 && (
                <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded-full">-{product.discount}%</span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Stock */}
            <p className={`text-sm font-medium mb-6 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `✓ In stock (${product.stock} available)` : '✗ Out of stock'}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors"
                  disabled={quantity <= 1}
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock || 10, q + 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors"
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
                className={`p-3 border rounded-lg transition-colors ${wishlisted ? 'border-red-300 text-red-500 bg-red-50' : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300'}`}
                aria-label="Toggle wishlist"
              >
                <FiHeart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  onViewDetails={(pid) => navigate(`/product/${pid}`)}
                  isWishlisted={isInWishlist(p.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetails;

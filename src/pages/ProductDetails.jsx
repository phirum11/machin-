import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiArrowLeft, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import RatingStars from '../components/common/RatingStars';
import { formatCurrency } from '../utils/formatCurrency';
import ProductCard from '../components/product/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts } = useProducts();
  const { addToCart, toggleWishlist, isInCart, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(Number(id));
  const related = getRelatedProducts(Number(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="text-blue-600 hover:underline">
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          <img
            src={product.image || 'https://via.placeholder.com/600'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-blue-600 font-medium mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <RatingStars rating={product.rating} size="md" />
            <span className="text-gray-500 text-sm">({product.reviewCount} reviews)</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>
            {savings > 0 && (
              <p className="text-green-600 text-sm mt-1 font-medium">
                You save {formatCurrency(savings)} ({Math.round((savings / product.originalPrice) * 100)}% off)
              </p>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          {/* Stock */}
          <p className={`text-sm font-medium mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `✓ In stock (${product.stock} left)` : '✗ Out of stock'}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                −
              </button>
              <span className="px-4 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShoppingCart className="w-5 h-5" />
              {isInCart(product.id) ? 'Add More to Cart' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-xl border-2 transition-colors ${
                isInWishlist(product.id)
                  ? 'border-red-500 text-red-500 bg-red-50'
                  : 'border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-500'
              }`}
            >
              <FiHeart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-4 border-t pt-6">
            {[
              { icon: FiTruck, text: 'Free shipping over $100' },
              { icon: FiShield, text: '2-year warranty' },
              { icon: FiRefreshCw, text: '30-day returns' }
            ].map(({ icon, text }) => {
              const Icon = icon;
              return (
              <div key={text} className="text-center">
                <Icon className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">{text}</p>
              </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                onViewDetails={(id) => navigate(`/products/${id}`)}
                isWishlisted={isInWishlist(p.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;

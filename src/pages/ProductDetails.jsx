import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import RatingStars from '../components/common/RatingStars';
import ProductCard from '../components/product/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getRelatedProducts } = useProducts();
  const { addToCart, updateQuantity, cart, toggleWishlist, isInWishlist, wishlist } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState('description');

  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-400 mb-4">Product not found</p>
        <button onClick={() => navigate('/products')} className="text-blue-600 hover:underline">
          Back to Products
        </button>
      </div>
    );
  }

  const related = getRelatedProducts(product.id);
  const inWishlist = wishlist.includes(product.id);

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.id === product.id);
    const currentQty = existingItem ? existingItem.quantity : 0;
    if (currentQty === 0) {
      addToCart(product);
    }
    if (quantity + currentQty > 1) {
      updateQuantity(product.id, quantity + currentQty);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <FiArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={product.image || 'https://via.placeholder.com/500'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <p className="text-sm text-blue-600 font-medium mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-4">
            <RatingStars rating={product.rating || 4.5} size="md" />
            <span className="text-sm text-gray-500">({product.reviews || 0} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
            )}
            {product.discount > 0 && (
              <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded-full">-{product.discount}%</span>
            )}
          </div>

          <p className={`text-sm font-medium mb-6 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `In stock (${product.stock} available)` : 'Out of stock'}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-600 dark:text-gray-300 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                –
              </button>
              <span className="px-5 py-2 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-lg border transition-colors ${
                inWishlist
                  ? 'border-red-300 text-red-500 bg-red-50'
                  : 'border-gray-300 dark:border-gray-600 text-gray-500 hover:text-red-500'
              }`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Share"
            >
              <FiShare2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="flex gap-6 border-b dark:border-gray-700 mb-6">
          {['description', 'details'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === 'description' && (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description || 'No description available.'}
          </p>
        )}
        {tab === 'details' && (
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-gray-500">Category</dt><dd className="font-medium mt-1">{product.category}</dd></div>
            <div><dt className="text-gray-500">Rating</dt><dd className="font-medium mt-1">{product.rating} / 5</dd></div>
            <div><dt className="text-gray-500">Reviews</dt><dd className="font-medium mt-1">{product.reviews}</dd></div>
            <div><dt className="text-gray-500">In Stock</dt><dd className="font-medium mt-1">{product.stock}</dd></div>
          </dl>
        )}
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                onViewDetails={(pid) => navigate(`/product/${pid}`)}
                isWishlisted={wishlist.includes(p.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;

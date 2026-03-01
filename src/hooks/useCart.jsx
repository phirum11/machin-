import { useCart as useCartContext } from '../context/CartContext';

/**
 * Re-exports the CartContext hook for convenience.
 *
 * @returns {object} Cart context value.
 */
export const useCart = useCartContext;

export default useCartContext;

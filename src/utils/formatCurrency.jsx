/**
 * Formats a number as a currency string using the Intl.NumberFormat API.
 *
 * @param {number} amount - The numeric value to format.
 * @param {string} [currency='USD'] - ISO 4217 currency code (e.g. 'USD', 'EUR').
 * @param {string} [locale='en-US'] - BCP 47 locale string (e.g. 'en-US', 'fr-FR').
 * @returns {string} The formatted currency string (e.g. '$1,234.56').
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (amount == null || isNaN(amount)) return '$0.00';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export default formatCurrency;


"use client";



import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCheckout } from '@/context/CheckoutContext';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext'

const PaymentPage = () => {
  const { user, loading } = useAuth();
  const { checkoutData, updateCheckoutData,  } = useCheckout();
  const { clearCart } = useCart()
  const router = useRouter();
  const [cardDetails, setCardDetails] = useState(
    checkoutData.cardDetails || {
      cardNumber: '',
      holderName: '',
      expiry: '',
      cvv: '',
    }
  );
  const [taxInfo, setTaxInfo] = useState(checkoutData.taxInfo || { vatNumber: '', pec: '' });
  const [billingAddress, setBillingAddress] = useState(checkoutData.billingAddress || 'same');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (!checkoutData.contact) {
      console.log('Contact is missing, redirecting to /checkout/details');
      router.push('/checkout/details');
    }
    if (!checkoutData.shippingAddress || !checkoutData.shippingAddress.address) {
      console.log('Shipping address is missing, redirecting to /checkout/shipping');
      router.push('/checkout/shipping');
    }
  }, [loading, user, checkoutData, router]);

  if (loading) {
    return (
      <div className="py-16 bg-white min-h-screen flex items-center justify-center">
        <p className="text-black">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const validateCardDetails = () => {
    const newErrors = {};
    console.log('Validating card details:', cardDetails);
    if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!cardDetails.holderName.trim()) {
      newErrors.holderName = 'Holder name is required';
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = 'Expiry must be in MM/YY format';
    } else {
      const [month, year] = cardDetails.expiry.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiry = 'Card has expired';
      }
    }
    if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${randomNum}`;
  };

  const handleProceedToConfirmation = () => {
    console.log('Attempting to proceed to confirmation');
    console.log('Current checkoutData:', checkoutData);
    if (validateCardDetails()) {
      console.log('Validation passed, updating checkout data and navigating');
      const orderNumber = generateOrderNumber();
      updateCheckoutData({ cardDetails, taxInfo, billingAddress, orderNumber });
      clearCart();

      router.push('/checkout/confirmation');
    } else {
      console.log('Validation failed, not navigating');
      alert('Please correct the errors in the payment form.');
    }
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    }
    setCardDetails((prev) => ({ ...prev, [field]: formattedValue }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleTaxInputChange = (field, value) => {
    setTaxInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="flex items-center space-x-2 mb-6 text-gray-500">
          <span className="text-green-500">Cart</span>
          <span>&gt;</span>
          <span className="text-green-500">Details</span>
          <span>&gt;</span>
          <span className="text-green-500">Shipping</span>
          <span>&gt;</span>
          <span className="text-black font-medium">Payment</span>
        </div>


        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <p className="text-gray-700">Contact: {checkoutData.contact || ''}</p>
                <button
                  onClick={() => router.push('/checkout/details')}
                  className="text-green-500 hover:underline uppercase text-sm"
                >
                  Edit
                </button>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-700">
                  Ship to: {checkoutData.shippingAddress?.address || ''},{' '}
                  {checkoutData.shippingAddress?.city || ''},{' '}
                  {checkoutData.shippingAddress?.postalCode || ''},{' '}
                  {checkoutData.shippingAddress?.province || ''},{' '}
                  {checkoutData.shippingAddress?.country || ''}{' '}
                </p>
                <button
                  onClick={() => router.push('/checkout/details')}
                  className="text-green-500 hover:underline uppercase text-sm"
                >
                  Edit
                </button>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Method: {checkoutData.shippingMethod || ''}</p>
                <button
                  onClick={() => router.push('/checkout/shipping')}
                  className="text-green-500 hover:underline uppercase text-sm"
                >
                  Edit
                </button>
              </div>
            </div>


            <h2 className="text-2xl font-semibold text-black mb-4 uppercase">Payment method</h2>
            <div className="border rounded p-4 mb-4 bg-green-50">

              <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-green-700 " fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v3H2V4zm0 5h20v11a2 2 0 01-2 2H4a2 2 0 01-2-2V9zm6 7a1 1 0 100 2h2a1 1 0 100-2H8z" />
          </svg>
                <span className=" uppercase text-green-700 text-sm ml-[15px]">Credit Card</span>
              </div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="CARD NUMBER"
                    value={cardDetails.cardNumber || ''}
                    onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                    className={`w-full p-2 border rounded uppercase placeholder-gray-400 text-sm ${
                      errors.cardNumber ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  <svg
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-4-4c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-4-4c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4"
                    />
                  </svg>
                </div>
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="HOLDER NAME"
                  value={cardDetails.holderName || ''}
                  onChange={(e) => handleCardInputChange('holderName', e.target.value)}
                  className={`w-full p-2 border rounded uppercase placeholder-gray-400 text-sm ${
                    errors.holderName ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.holderName && (
                  <p className="text-red-500 text-sm mt-1">{errors.holderName}</p>
                )}
              </div>
              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="EXPIRATION (MM/YY)"
                    value={cardDetails.expiry || ''}
                    onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                    className={`w-full p-2 border rounded uppercase placeholder-gray-400 text-sm ${
                      errors.expiry ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                  )}
                </div>
                <div className="w-1/2 relative">
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv || ''}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                    className={`w-full p-2 border rounded uppercase placeholder-gray-400 text-sm ${
                      errors.cvv ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  <svg
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>


            <h2 className="text-2xl font-semibold text-black mb-4 uppercase">Tax informations</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="VAT NUMBER (OPTIONAL)"
                value={taxInfo.vatNumber || ''}
                onChange={(e) => handleTaxInputChange('vatNumber', e.target.value)}
                className="w-full p-2 border rounded uppercase placeholder-gray-400 text-sm"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="PEC (OPTIONAL)"
                value={taxInfo.pec || ''}
                onChange={(e) => handleTaxInputChange('pec', e.target.value)}
                className="w-full p-2 border rounded uppercase placeholder-gray-400 text-sm"
              />
            </div>


            <h2 className="text-2xl font-semibold text-black mb-4 uppercase">Billing address</h2>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="sameAddress"
                  name="billingAddress"
                  value="same"
                  checked={billingAddress === 'same'}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="mr-2 w-5 h-5 text-green-500 border-gray-300 focus:ring-green-500"
                />
                <label htmlFor="sameAddress" className="text-black uppercase text-sm">
                  Same as the shipping address
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="differentAddress"
                  name="billingAddress"
                  value="different"
                  checked={billingAddress === 'different'}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="mr-2 w-5 h-5 text-green-500 border-gray-300 focus:ring-green-500"
                />
                <label htmlFor="differentAddress" className="text-black uppercase text-sm">
                  Use a different address for billing
                </label>
              </div>
            </div>


            <div className="flex justify-between mt-6">
              <button
                onClick={() => router.push('/checkout/shipping')}
                className="text-green-500 hover:underline uppercase text-sm"
              >
                Back to shipping
              </button>
              <button
                onClick={handleProceedToConfirmation}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 uppercase text-sm"
              >
                Pay now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
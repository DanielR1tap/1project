import React, { createContext, useContext, useState, useEffect } from 'react';

const CheckoutContext = createContext();

const defaultCheckoutData = {
  contact: '',
  shippingAddress: {
    firstName: '',
    lastName: '',
    address: '',
    shippingNote: '',
    city: '',
    postalCode: '',
    province: '',
    country: 'Italy',
  },
  shippingMethod: 'Standard Shipping - FREE',
  paymentMethod: 'Credit Card',
  cardDetails: {
    cardNumber: '',
    holderName: '',
    expiry: '',
    cvv: '',
  },
  taxInfo: {
    vatNumber: '',
    pec: '',
  },
  billingAddress: 'same',
  billingAddressDetails: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    province: '',
    country: '',
  },
};

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState(defaultCheckoutData);

  useEffect(() => {
    const storedCheckoutData = localStorage.getItem('checkoutData');
    if (storedCheckoutData) {
      try {
        const parsedData = JSON.parse(storedCheckoutData);

        if (!parsedData.contact) {
          parsedData.contact = defaultCheckoutData.contact;
        }

        if (!parsedData.shippingAddress || typeof parsedData.shippingAddress !== 'object') {
          parsedData.shippingAddress = defaultCheckoutData.shippingAddress;
        } else {
          parsedData.shippingAddress = {
            ...defaultCheckoutData.shippingAddress,
            ...parsedData.shippingAddress,
          };
        }
       
        if (!parsedData.cardDetails || typeof parsedData.cardDetails !== 'object') {
          parsedData.cardDetails = defaultCheckoutData.cardDetails;
        } else {
          parsedData.cardDetails = {
            ...defaultCheckoutData.cardDetails,
            ...parsedData.cardDetails,
          };
        }
        setCheckoutData(parsedData);
      } catch (error) {
        console.error('Error parsing checkout data from localStorage:', error);
        setCheckoutData(defaultCheckoutData);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
  }, [checkoutData]);

  const updateCheckoutData = (newData) => {
    setCheckoutData((prev) => ({ ...prev, ...newData }));
  };

  const clearCheckoutData = () => {
    setCheckoutData(defaultCheckoutData);
  };

  return (
    <CheckoutContext.Provider value={{ checkoutData, updateCheckoutData, clearCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
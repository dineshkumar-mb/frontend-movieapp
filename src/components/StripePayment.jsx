// frontend/src/StripePayment.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PfEQKIGMXT0myEMc0tW6LWBF03XGIQRKqP2cQeAdCq9sa3W4lDKcM9tGTJsYnzUa1tLIdMzQCc4NE4fP0v9XYPl00ZI4k9wkt');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    
    // Create a payment intent on the server
    const response = await axios.post('http://localhost:6969/api/payment/create-payment-intent', {
      amount: 1000, // specify amount in cents
      currency: 'inr'
    });
    const clientSecret = response.data.clientSecret;

    // Confirm card payment
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement }
    });

    if (error) {
      setPaymentStatus(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentStatus('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
      <p>{paymentStatus}</p>
    </form>
  );
};

const StripePayment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripePayment;

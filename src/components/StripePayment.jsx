import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const stripePromise = loadStripe('pk_test_51PfEQKIGMXT0myEMc0tW6LWBF03XGIQRKqP2cQeAdCq9sa3W4lDKcM9tGTJsYnzUa1tLIdMzQCc4NE4fP0v9XYPl00ZI4k9wkt');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setPaymentStatus('');

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a payment intent on the server
      const { data } = await axios.post('http://localhost:6969/apppayment/payment', {
        amount: 150 * 100, // amount in cents for INR
        currency: 'inr',
      });
      const { clientSecret } = data;

      // Confirm card payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (error) {
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent?.status === 'succeeded') {
        setPaymentStatus('Payment successful!');
      }
    } catch (error) {
      setPaymentStatus('Error creating payment intent.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <Form.Group className="mb-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
          className="p-2 border rounded"
        />
      </Form.Group>
      <Button type="submit" variant="primary" disabled={!stripe || isLoading} className="w-100">
        {isLoading ? <Spinner animation="border" size="sm" /> : 'Pay'}
      </Button>
      {paymentStatus && (
        <Alert variant={paymentStatus.includes('successful') ? 'success' : 'danger'} className="mt-3">
          {paymentStatus}
        </Alert>
      )}
    </Form>
  );
};

const StripePayment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripePayment;

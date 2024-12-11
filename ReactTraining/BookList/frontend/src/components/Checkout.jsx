import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { message } from "antd"; // For a better user experience with notifications

export default function PaypalPayment() {
  const cartItems = useSelector((state) => state.cartData.cartItems);
  const [isLoading, setIsLoading] = useState(false); // Loading state for PayPal initialization
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const calculateTotal = (cartItems) => {
    let totalPrice = cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
    return totalPrice;
  };

  const handleApprove = (data, actions) => {
    setIsLoading(true); // Set loading to true when payment is being processed
    return actions.order.capture().then((details) => {
      setIsLoading(false); // Set loading to false after successful payment
      message.success(
        `Payment Successful: ${details.payer.name.given_name}`,
        1
      );
      // Redirect or show confirmation UI
    });
  };

  const handleCancel = () => {
    message.warning("Payment Cancelled", 1);
  };

  const handleError = (error) => {
    setIsLoading(false);
    message.error(`Payment failed: ${error}`, 1);
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          clientId,
          "currency":"USD"
      }}
    >
      <div>
        <h1 className="paypal-head">PayPal Payment</h1>
        {isLoading ? (
          <div>Loading...</div> // Show loading text while the PayPal buttons are initializing
        ) : (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: `${calculateTotal(cartItems)}`
                    },
                  },
                ],
              });
            }}
            onApprove={handleApprove}
            onCancel={handleCancel}
            onError={handleError}
          />
        )}
      </div>
    </PayPalScriptProvider>
  );
}

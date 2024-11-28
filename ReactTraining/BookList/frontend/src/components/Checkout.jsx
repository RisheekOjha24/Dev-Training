import React, { useState } from "react";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Checkout</h2>

      {/* Payment Method Tabs */}
      <div className="flex justify-around mb-6">
        <button
          className={`py-2 px-4 rounded-md ${
            paymentMethod === "upi"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setPaymentMethod("upi")}
        >
          UPI
        </button>
        <button
          className={`py-2 px-4 rounded-md ${
            paymentMethod === "card"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          Card
        </button>
        <button
          className={`py-2 px-4 rounded-md ${
            paymentMethod === "netbanking"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setPaymentMethod("netbanking")}
        >
          Net Banking
        </button>
      </div>

      {/* Payment Method Content */}
      <div className="border-t pt-4">
        {paymentMethod === "upi" && (
          <div>
            <label className="block text-gray-700 mb-2">Enter UPI ID</label>
            <input
              type="text"
              placeholder="example@upi"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
        {paymentMethod === "card" && (
          <div>
            <label className="block text-gray-700 mb-2">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="block text-gray-700 mb-2">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="block text-gray-700 mb-2">CVV</label>
            <input
              type="text"
              placeholder="123"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}
        {paymentMethod === "netbanking" && (
          <div>
            <label className="block text-gray-700 mb-2">
              Select Your Bank
            </label>
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
            </select>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;

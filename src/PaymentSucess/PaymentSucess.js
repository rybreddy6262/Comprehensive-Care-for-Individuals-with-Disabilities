import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserTrackerView from "../UserTrackerView/UserTrackerView";

const PaymentSuccess = () => {
  const { orderId, paymentId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Optionally fetch order/payment details from backend if needed
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/order/${orderId}`);
        setOrderDetails(res.data);
      } catch (err) {
        console.error("Failed to fetch order details", err);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <>
    <div>
      <h1>Payment Successful 🎉</h1>
      <p>Order ID: {orderId}</p>
      <p>Payment ID: {paymentId}</p>

      {orderDetails && (
        <div>
          <h2>Order Details:</h2>
          <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
        </div>
      )}
    </div>
    <UserTrackerView/>
    </>
  );
};

export default PaymentSuccess;

// RazorpayPayment.jsx
import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./RazorpayPayment.css"; // Optional for styling
//import CaregiverLocationSender from "../CaregiverLocationSender/CaregiverLocationSender";

const RazorpayPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, caregiver, amount } = location.state || {};

  const loadRazorpay = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount,
        currency: "INR",
      });

      const options = {
        key: "rzp_test_scLzHIiiBAqpNQ",
        amount: data.amount,
        currency: data.currency,
        name: "Caregiver Services",
        description: "Service Booking Payment",
        order_id: data.orderId,
        handler: async function (response) {
          alert("Payment Successful!");

          // Save to DB
          await axios.post("http://localhost:5000/bookings", {
            caregiver,
            formData,
            paymentDetails: {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
          });

          navigate(`/payment-success/${response.razorpay_order_id}`);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#2ecc71",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
    }
  };

  return (
    <>
    <div className="payment-container">
      <h2>🔎 Confirm Your Booking</h2>

      <div className="confirmation-box">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Service:</strong> {formData.service}</p>
        <p><strong>Date:</strong> {formData.date}</p>
        <p><strong>Location:</strong> {formData.location}</p>
        <p><strong>Duration:</strong> {formData.duration} hour(s)</p>
        <p><strong>Special Requirements:</strong> {formData.requirements || "None"}</p>
        <p><strong>Total Amount:</strong> ₹{amount}</p>
      </div>

      <button onClick={loadRazorpay} className="submit-btn">
        💳 Pay ₹{amount}
      </button>
    </div>

    </>
  );
};

export default RazorpayPayment;

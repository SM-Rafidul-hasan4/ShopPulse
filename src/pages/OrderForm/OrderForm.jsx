// src/components/OrderForm.jsx
import React, { useState } from "react";

function OrderForm({ cartItems, totalPrice, onClose }) {
  const [orderData, setOrderData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [submittedOrder, setSubmittedOrder] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderInfo = {
      customer: orderData,
      items: cartItems,
      total: totalPrice,
    };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderInfo),
      });

      const result = await response.json();

      console.clear();
      console.log("===== Order Submitted =====");
      console.log("Order ID:", result.id);

      console.group("Customer Info");
      console.log("Name:", orderInfo.customer.name);
      console.log("Address:", orderInfo.customer.address);
      console.log("Phone:", orderInfo.customer.phone);
      console.log("Email:", orderInfo.customer.email);
      console.groupEnd();

      console.group("Ordered Items");
      orderInfo.items.forEach((item, index) => {
        console.log(
          `${index + 1}. Product ID: ${item.id}, Title: ${item.title}, Price: $${item.price.toFixed(
            2
          )}, Quantity: ${item.quantity}, Total: $${(item.price * item.quantity).toFixed(2)}`
        );
      });
      console.groupEnd();

      console.log("Total Price: $", orderInfo.total.toFixed(2));
      console.log("===========================");

      alert("Order submitted successfully!");
      setSubmittedOrder(orderInfo);
    } catch (error) {
      console.error("Order submit failed:", error);
      alert("Failed to submit order");
    }
  };

  if (submittedOrder) {
    return (
      <div className="p-4 bg-green-50 rounded shadow">
        <h2 className="text-xl font-bold text-green-700">🎉 Order Submitted Successfully!</h2>
        <p className="mt-2"><strong>Name:</strong> {submittedOrder.customer.name}</p>
        <p><strong>Address:</strong> {submittedOrder.customer.address}</p>
        <p><strong>Phone:</strong> {submittedOrder.customer.phone}</p>
        <p><strong>Email:</strong> {submittedOrder.customer.email}</p>

        <ul className="mt-4 list-disc list-inside">
          {submittedOrder.items.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price} × {item.quantity} = ${(
                item.price * item.quantity
              ).toFixed(2)}
            </li>
          ))}
        </ul>

        <p className="font-bold mt-4">Total: ${submittedOrder.total.toFixed(2)}</p>

        <button
          onClick={() => {
            setSubmittedOrder(null);
            onClose();
          }}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📝 Order Form</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={orderData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="address"
          value={orderData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="phone"
          value={orderData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={orderData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Order (${totalPrice.toFixed(2)})
        </button>
      </form>
    </div>
  );
}

export default OrderForm;

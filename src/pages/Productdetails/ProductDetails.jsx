// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useCart } from "../AllFunction/CartFunction";
import OrderForm from "../OrderForm/OrderForm"; //  Ensure this path is correct based on your folder structure

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();

  const category = location.state?.category;
  const source = location.state?.source || "dummyjson";

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const { addToCart } = useCart();

  //  Fetch product details
  useEffect(() => {
    if (!id) return;

    let productURL = "";

    if (source === "dummyjson") {
      productURL = `https://dummyjson.com/products/${id}`;
    } else if (source === "fakestore") {
      productURL = `https://fakestoreapi.com/products/${id}`;
    } else {
      console.warn("Unknown API source.");
      return;
    }

    fetch(productURL)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Product fetch error", err));
  }, [id, source]);

  //  Fetch related products
  useEffect(() => {
    if (!category || !source) return;

    let categoryURL = "";

    if (source === "dummyjson") {
      categoryURL = `https://dummyjson.com/products/category/${category}`;
    } else if (source === "fakestore") {
      categoryURL = `https://fakestoreapi.com/products/category/${category}`;
    }

    fetch(categoryURL)
      .then((res) => res.json())
      .then((data) => {
        const items = data.products || data;
        const filtered = items.filter((item) => item.id !== Number(id));
        setRelatedProducts(filtered);
      })
      .catch((err) => console.error("Related fetch error", err));
  }, [category, source, id]);

  if (!product) return <p className="p-8">Loading...</p>;

  const imageURL =
    product.thumbnail || product.image || (product.images && product.images[0]);

  return (
    <div className="p-8 relative">
      {/*  Product Information */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={imageURL}
          alt={product.title}
          className="w-full md:w-1/2 rounded"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-green-600 font-bold text-xl">${product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={() => setShowOrderForm(true)}
            className="mt-4 ml-4 bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/*  Related Products */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">
          Related Products in: <span className="capitalize">{category}</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((item) => {
            const relatedImg =
              item.thumbnail || item.image || (item.images && item.images[0]);

            return (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                state={{ category: item.category, source }}
                className="bg-white p-4 rounded shadow block hover:shadow-lg transition"
              >
                <img
                  src={relatedImg}
                  alt={item.title}
                  className="h-32 object-cover w-full rounded"
                />
                <p className="mt-2 text-sm font-medium">{item.title}</p>
                <p className="text-green-500 font-semibold">${item.price}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/*  Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
            <OrderForm
              cartItems={[{ ...product, quantity: 1 }]}
              totalPrice={product.price}
              onClose={() => setShowOrderForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;

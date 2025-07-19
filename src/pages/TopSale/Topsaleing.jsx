import React, { useEffect, useState } from "react";
import { useCart } from "../AllFunction/CartFunction";
import { Link } from "react-router-dom";

function TopSaleing() {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { addToCart } = useCart();

  // Fetch products from the API on component mount
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  // Show either 4 or all products based on toggle
  const visibleProducts = showAll ? products : products.slice(0, 4);

  return (
    <section className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-left ps-[32px] text-black">
        Top Selling
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-[32px]">
        {visibleProducts.map((product) => {
          const price = product.price;
          const discount = 10; // Default 10% discount
          const newPrice = (price * (1 - discount / 100)).toFixed(2);
          const rating = product.rating?.rate || 4.5;

          return (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
            >
              {/* Image and title wrapped in link */}
              <Link
                to={`/product/${product.id}`}
                state={{ category: product.category, source: "fakestore" }}
                className="cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain rounded"
                />
                <h2 className="text-lg font-semibold mt-4">{product.title}</h2>
              </Link>

              <p className="text-sm text-gray-600">Discount: {discount}%</p>
              <p className="text-gray-800">
                Price:{" "}
                <span className="line-through text-red-400">${price}</span>{" "}
                <span className="font-bold text-green-600">${newPrice}</span>
              </p>
              <p className="text-yellow-500">⭐ {rating}</p>

              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      {/* Toggle button for showing more/less */}
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      </div>
    </section>
  );
}

export default TopSaleing;

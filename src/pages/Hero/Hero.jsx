import React, { useEffect, useState } from "react";

function Hero() {
  const heroImg = "/image/Hero.png";

  // Separate states for three counts
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [brandCount, setBrandCount] = useState(0);

  // Fetch Product Count from API
  useEffect(() => {
    fetch("https://dummyjson.com/products") // Put your product API link here
      .then((res) => res.json())
      .then((data) => {
        // Example: data.total or data.length
        setProductCount(data.total || data.length || 0);
      })
      .catch((err) => console.error("Product count error:", err));
  }, []);

  // Fetch User Count from API
  useEffect(() => {
    fetch("https://dummyjson.com/users") // Put your user API link here
      .then((res) => res.json())
      .then((data) => {
        setUserCount(data.total || data.length || 0);
      })
      .catch((err) => console.error("User count error:", err));
  }, []);

  // Fetch Brand Count from API
  useEffect(() => {
    fetch("https://dummyjson.com/carts") // Put your brand API link here
      .then((res) => res.json())
      .then((data) => {
        setBrandCount(data.total || data.length || 0);
      })
      .catch((err) => console.error("Brand count error:", err));
  }, []);

  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      <div className="absolute top-[15vh] ps-[125px] text-left">
        <h1 className="text-black text-5xl font-extrabold leading-tight max-w-2xl">
          FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
        </h1>

        <h6 className="text-gray-700 text-base mt-4 max-w-xl">
          Browse through our diverse range of meticulously crafted garments,<br />
          designed to bring out your individuality and cater to your sense of style.
        </h6>

        <button className="mt-4 px-14 py-3 bg-black text-white rounded-full hover:bg-blue-600 transition duration-300">
          Shop Now
        </button>

        {/* Count Section with Divider */}
        <div className="flex items-center gap-10 mt-8 text-black font-semibold text-lg">
          <div className="text-center">
            <h3 className="text-3xl font-bold">{productCount}+</h3>
            <p>Products</p>
          </div>

          <div className="w-px h-12 bg-gray-400"></div>

          <div className="text-center">
            <h3 className="text-3xl font-bold">{userCount}+</h3>
            <p>Users</p>
          </div>

          <div className="w-px h-12 bg-gray-400"></div>

          <div className="text-center">
            <h3 className="text-3xl font-bold">{brandCount}+</h3>
            <p>Brands</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

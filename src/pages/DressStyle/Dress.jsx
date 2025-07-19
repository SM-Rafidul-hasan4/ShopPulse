import React from "react";
import { Link } from "react-router-dom";

const dressData = [
  {
    name: "Casual",
    imageUrl: "/image/Dress/image 11.png",
    link: "/category/casual",
    textColor: "black",
  },
  {
    name: "Formal",
    imageUrl: "/image/Dress/image 12.png",
    link: "/category/formal",
    textColor: "black",
  },
  {
    name: "Party",
    imageUrl: "/image/Dress/image 13.png",
    link: "/category/party",
    textColor: "black",
  },
  {
    name: "Gym",
    imageUrl: "/image/Dress/image 14.png",
    link: "/category/gym",
    textColor: "black",
  },
];

function Dress() {
  return (
    <div className="bg-white py-16 flex flex-col items-center px-4 md:px-0">
      {/* Outer grey container */}
      <div
        className="bg-gray-200 rounded-4xl px-6 py-4 max-w-[1239px] w-full"
        style={{ height: "866px" }}
      >
        {/* Title */}
        <h2 className="text-black font-semibold text-2xl mb-8 text-center">
          Browse by Dress Style
        </h2>

        {/* Tiles Container */}
        <div className="flex flex-wrap gap-5 justify-center">
          {dressData.map((item, index) => {
            // Custom width & height per tile
            let tileStyle = { height: "289px", width: "407px" };
            if (index === 1 || index === 2) {
              tileStyle.width = "684px";
            }

            return (
              <Link
                key={index}
                to={item.link}
                className="relative rounded-lg overflow-hidden bg-gray-300"
                style={tileStyle}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-5 left-4 font-bold drop-shadow-lg text-xl"
                  style={{ color: item.textColor }}
                >
                  {item.name}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dress;

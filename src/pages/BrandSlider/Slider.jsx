import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Slider() {
  const [headlines, setHeadlines] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    // JSON file  headline data load
    fetch("/data/headline.json")
      .then((res) => res.json())
      .then((data) => setHeadlines(data))
      .catch((err) => console.error("Failed to load headlines:", err));
  }, []);

  useEffect(() => {
    if (!headlines.length) return;

    const track = trackRef.current;
    let position = 0;

    const animate = () => {
      position -= 1;
      if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
    };

    const interval = setInterval(animate, 10); // scroll speed
    return () => clearInterval(interval); // cleanup
  }, [headlines]);

  return (
    <div className="bg-gray-100 overflow-hidden whitespace-nowrap py-3">
      <div
        ref={trackRef}
        className="flex gap-8 w-max"
        style={{ willChange: "transform" }}
      >
        {[...headlines, ...headlines].map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="text-blue-600 font-semibold text-lg hover:underline"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Slider;

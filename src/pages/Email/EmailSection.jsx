import React, { useState } from "react";
import { validateEmail } from "../AllFunction/Function"; // আপনার ফাইল লোকেশন অনুযায়ী ঠিক করুন

function EmailSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    alert("Subscribed successfully with: " + email);
    setEmail(""); // সাবমিট করার পর ইনপুট খালি হবে
  };

  return (
    <div
      className="
        absolute 
        top-[-20%] 
        left-1/2 
        transform -translate-x-1/2 
        bg-black 
        w-full max-w-[1140px] 
        h-[180px] 
        rounded-2xl
        flex 
        items-center 
        justify-between 
        px-8 
        text-white 
        shadow-lg 
        z-10
      "
    >
      {/* Left Text */}
      <h2 className="text-2xl font-semibold max-w-[50%] leading-snug">
        STAY UP TO DATE ABOUT <br />
        OUR LATEST OFFERS
      </h2>

      {/* Right Input & Button */}
      <div className="flex flex-col items-start gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md bg-white text-black placeholder-gray-600 focus:outline-none"
          style={{ height: "48px", width: "288px", paddingLeft: "12px", paddingRight: "12px" }}
        />
        <button
          onClick={handleSubscribe}
          className="bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition-all"
          style={{ height: "48px", width: "288px" }}
        >
          Subscribe To Newsletter
        </button>
      </div>

      {/* ng: Future Improvement → Add backend integration for storing emails */}
    </div>
  );
}

export default EmailSection;

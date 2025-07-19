import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import EmailSection from "../Email/EmailSection"; // EmailSection এর পাথ ঠিক রাখবেন

function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white pt-[140px] pb-12 px-6 overflow-visible max-w-7xl mx-auto">
      {/* Email Section: ভাসমান */}
      

      {/* Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
        {/* 1st Column */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-bold text-white">
            YourLogo
          </Link>
          <p className="text-sm leading-relaxed">
            We have clothes that suit your style and <br />
            which you’re proud to wear. <br />
            From women to men.
          </p>
          <div className="flex space-x-4 mt-2 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-400">
              <FaGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* 2nd Column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/feature">Feature</Link></li>
            <li><Link to="/career">Career</Link></li>
            <li><Link to="/help">Help</Link></li>
          </ul>
        </div>

        {/* 3rd Column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/delivery">Delivery Details</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* 4th Column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Accounts</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/account/manage">Manage Devices</Link></li>
            <li><Link to="/account/orders">Order</Link></li>
            <li><Link to="/account/payment">Payment</Link></li>
          </ul>
        </div>

        {/* 5th Column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/resources/free-books">Free Books</Link></li>
            <li><Link to="/resources/development">Development</Link></li>
            <li><Link to="/resources/tutorial">Tutorial</Link></li>
            <li><Link to="/resources/how-to">How to</Link></li>
            <li><Link to="/resources/blog">Blog</Link></li>
            <li><Link to="/resources/youtube">YouTube Playlist</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../AllFunction/CartFunction"; // Cart context

function Nav() {
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks which dropdown is open
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const { getCartCount } = useCart(); // Get cart item count from context

  const shopDropdownRef = useRef();
  const brandsDropdownRef = useRef();

  // Closes dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        shopDropdownRef.current &&
        !shopDropdownRef.current.contains(event.target) &&
        brandsDropdownRef.current &&
        !brandsDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dropdown menus
  function toggleDropdown(name) {
    setOpenDropdown((prev) => (prev === name ? null : name));
  }

  return (
    <nav className="bg-gray-900 text-white py-4 relative z-50">
      <section className="max-w-[1440px] mx-auto px-6 flex justify-evenly items-center relative">
        
        {/* Logo */}
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-xl font-bold hover:text-orange-400 ${
                isActive ? "text-orange-500" : "text-green-500"
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            MyShop
          </NavLink>
        </div>

        {/* Center Menu: Links & Dropdowns */}
        <div
          className={`flex-col md:flex-row md:flex items-center gap-6
            md:static absolute top-full left-0 w-full md:w-auto bg-gray-900 md:bg-transparent px-6 py-6 md:py-0 transition-all duration-300 z-40
            ${menuOpen ? "flex" : "hidden md:flex"}`}
        >
          <ul className="flex flex-col md:flex-row gap-6 w-full md:w-auto justify-center items-center">
            
            {/* Shop Dropdown */}
            <li className="relative" ref={shopDropdownRef}>
              <button
                onClick={() => toggleDropdown("shop")}
                className="cursor-pointer font-semibold hover:text-yellow-400"
                aria-haspopup="true"
                aria-expanded={openDropdown === "shop"}
              >
                Shop ▾
              </button>
              {openDropdown === "shop" && (
                <ul className="absolute left-0 w-[150px] bg-white text-black mt-1 rounded shadow z-30">
                  <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">
                    <Link
                      to="/easy1"
                      onClick={() => {
                        setOpenDropdown(null);
                        setMenuOpen(false);
                      }}
                    >
                      Easy 1
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">
                    <Link
                      to="/easy2"
                      onClick={() => {
                        setOpenDropdown(null);
                        setMenuOpen(false);
                      }}
                    >
                      Easy 2
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link
                      to="/easy3"
                      onClick={() => {
                        setOpenDropdown(null);
                        setMenuOpen(false);
                      }}
                    >
                      Easy 3
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* On Sale Link */}
            <li>
              <NavLink
                to="/On-sale"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-bold"
                    : "hover:text-yellow-400"
                }
                onClick={() => setMenuOpen(false)}
              >
                On Sale
              </NavLink>
            </li>

            {/* New Arrival Link */}
            <li>
              <NavLink
                to="/New-arrivel"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-bold"
                    : "hover:text-yellow-400"
                }
                onClick={() => setMenuOpen(false)}
              >
                New Arrival
              </NavLink>
            </li>

            {/* Brands Dropdown */}
            <li className="relative" ref={brandsDropdownRef}>
              <button
                onClick={() => toggleDropdown("brands")}
                className="cursor-pointer font-semibold hover:text-yellow-400"
                aria-haspopup="true"
                aria-expanded={openDropdown === "brands"}
              >
                Brands ▾
              </button>
              {openDropdown === "brands" && (
                <ul className="absolute left-0 w-[150px] bg-white text-black mt-1 rounded shadow z-30">
                  <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">
                    <Link
                      to="/samsung"
                      onClick={() => {
                        setOpenDropdown(null);
                        setMenuOpen(false);
                      }}
                    >
                      Samsung
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">
                    <Link
                      to="/lg"
                      onClick={() => {
                        setOpenDropdown(null);
                        setMenuOpen(false);
                      }}
                    >
                      LG
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="w-48 px-3 py-1 rounded-full bg-white text-black shadow placeholder-gray-500"
          />
        </div>

        {/* Right Side: Cart, Profile, Hamburger Menu */}
        <div className="flex items-center gap-6">
          
          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-bold text-2xl relative"
                : "hover:text-yellow-400 text-2xl relative"
            }
            onClick={() => setMenuOpen(false)}
          >
            🛒
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                {getCartCount()}
              </span>
            )}
          </NavLink>

          {/* Profile Icon */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-bold text-2xl"
                : "hover:text-yellow-400 text-2xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            👤
          </NavLink>

          {/* Mobile Menu Toggle */}
          <div
            className="md:hidden text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </section>
    </nav>
  );
}

export default Nav;

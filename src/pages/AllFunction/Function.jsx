import { useState, useEffect } from "react";

// Email validation function using regex
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Checks if email format is valid
  return re.test(email); // Returns true if valid, else false
}

// Calculate discounted price given price and discount percentage (default 10%)
export function calculateDiscountPrice(price, discountPercentage = 10) {
  const newPrice = price - (price * discountPercentage) / 100; // Apply discount
  return newPrice.toFixed(2); // Return price fixed to 2 decimal places
}

// Simple function to show alert when product is added to cart
export function addToCart(product) {
  alert(`Added "${product.title}" to cart!`);
}

// Pagination hook with optional auto slide functionality
export function usePagination(data, itemsPerPage, autoSlide = true, intervalTime = 3000) {
  const [currentPage, setCurrentPage] = useState(0); // Current page index
  const totalPages = Math.ceil(data.length / itemsPerPage); // Total number of pages

  // Move to next page, loop back to first page after last
  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  // Move to previous page, loop to last page if at first
  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Auto slide setup using useEffect and setInterval
  useEffect(() => {
    if (!autoSlide || totalPages <= 1) return;

    const interval = setInterval(() => {
      handleNext(); // Automatically move to next page every intervalTime ms
    }, intervalTime);

    return () => clearInterval(interval); // Clear interval on cleanup
  }, [currentPage, totalPages, data, autoSlide, intervalTime]);

  // Calculate current page's data slice
  const startIndex = currentPage * itemsPerPage;
  const currentItems = Array.isArray(data)
    ? data.slice(startIndex, startIndex + itemsPerPage)
    : [];

  return {
    currentItems, // Data items of current page
    handleNext,   // Function to go to next page
    handlePrev,   // Function to go to previous page
  };
}

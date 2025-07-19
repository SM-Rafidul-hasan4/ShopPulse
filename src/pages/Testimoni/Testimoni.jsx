import React, { useState, useEffect } from "react";

function Testi() {
  const [testimonies, setTestimonies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 4;

  // Initial fake load
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?_limit=8")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.name || "Anonymous",
          position: "Customer",
          message: item.body,
          profilePic: getRandomAvatar(),
        }));
        setTestimonies(formatted);
      })
      .catch((err) => console.error("API Fetch Error:", err));
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = testimonies.slice(indexOfFirst, indexOfLast);

  const nextPage = () => {
    if (indexOfLast < testimonies.length) setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleAddTestimony = async (data) => {
    try {
      // Fake API call
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("POST response:", result);

      setTestimonies((prev) => [
        {
          id: Date.now(),
          name: "Anonymous",
          position: "Customer",
          message: data.message,
          profilePic: getRandomAvatar(),
        },
        ...prev,
      ]);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit");
    }
  };

  return (
    <div className="relative w-full max-w-[1140px] mx-auto p-6 bg-white rounded shadow z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Testimonials</h2>
        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={nextPage}
            disabled={indexOfLast >= testimonies.length}
            className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Share Your Testimony
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentItems.map((item) => (
          <div key={item.id} className="p-4 bg-gray-100 rounded shadow">
            <div className="flex items-center gap-4 mb-2">
              <img
                src={item.profilePic}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.position}</p>
              </div>
            </div>
            <p>{item.message}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <TestimonyForm
          onClose={() => setShowForm(false)}
          onSubmit={handleAddTestimony}
        />
      )}
    </div>
  );
}

//  Updated Form: Just a comment box
function TestimonyForm({ onClose, onSubmit }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      alert("Please write your comment before submitting.");
      return;
    }

    onSubmit({ message });
    onClose();
    setMessage("");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-full max-w-md"
      >
        <h3 className="text-lg font-bold mb-4">Share Your Testimony</h3>
        <textarea
          placeholder="Write your comment here..."
          className="w-full p-2 border mb-3 rounded"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// Helper: returns a random avatar image
function getRandomAvatar() {
  const id = Math.floor(Math.random() * 70) + 1;
  return `https://i.pravatar.cc/150?img=${id}`;
}

export default Testi;

import React from 'react'
import { useState } from "react";
const Customerfavorite = () => {
       const reviews = [
        {
            image: "https://i.pinimg.com/1200x/75/45/51/7545519248abb0d48e10936131f50bd1.jpg",
            rating: 5,
            text: "Best burgers in town! Always fresh, hot and super tasty.",
            name: "James T.",
        },
        {
            image: "https://i.pinimg.com/736x/f9/00/7f/f9007f73da46783cb255a1e621637f27.jpg",
            rating: 5,
            text: "Love the quick delivery and the portion sizes are awesome!",
            name: "Sarah M.",
        },
        {
            image: "https://i.pinimg.com/1200x/cf/9b/af/cf9bafa8f904bb4c2aacf06cebf46331.jpg",
            rating: 5,
            text: "My go-to place for fast food. Never disappoints!",
            name: "Michael R.",
        },
        {
            image: "https://i.pinimg.com/1200x/f3/35/3d/f3353da22218a4de90629ea801d6d0ff.jpg",
            rating: 5,
            text: "Nice,Service and Friendly staffs !",
            name: "Loinel jr.",
        },
    ];
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % reviews.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
    };
  return (
   <div>
        <section className="w-full bg-white py-8">

                {/* Heading */}
                <div className="text-center mb-5">
                    <p className="text-red-600 font-bold text-sm uppercase">
                        What Our Customers Say
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900">
                        Customer Favorites
                    </h2>

                    <div className="text-yellow-400 text-xl mt-1">
                        〰
                    </div>
                </div>

                {/* Reviews */}
                <div className="max-w-6xl mx-auto px-12 relative">

                    {/* Left Arrow */}
                    <button onClick={prevSlide}  className="absolute left-0 top-1/2 -translate-y-1/ w-9 h-9 rounded-full bg-red-600 text-center text-white cursor-pointer items-center justify-cente hover:bg-red-700 transition"
                    >
                        ❮
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-4  gap-5">

                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className={`border border-gray-200 rounded-lg p-4 flex items-center gap-4 shadow-sm transition  ${index === current? "ring-2 ring-red-500": "" }`} >
                                {/* Food Image */}
                                <img
                                    src={review.image}
                                    alt="food"
                                    className="w-16 h-16 object-contain rounded-[10px]"
                                />

                                {/* Review */}
                                <div>
                                    <div className="text-yellow-400 text-sm">
                                        {"★".repeat(review.rating)}
                                    </div>

                                    <p className="text-gray-700 text-xs leading-5">
                                        "{review.text}"
                                    </p>

                                    <p className="text-gray-800 text-xs font-bold mt-1">
                                        - {review.name}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>

                    {/* Right Arrow */}
                    <button onClick={nextSlide}  className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-red-600 text-white cursor-pointer  hover:bg-red-700 transition"
                    >
                        ❯
                    </button>

                </div>
            </section>

        </div>
  )
}

export default Customerfavorite

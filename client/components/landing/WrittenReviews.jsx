"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, UserRound } from "lucide-react";

// This component has no <section> wrapper and no background of its own —
// it's meant to render inside the existing Testimonials <section>, directly
// below the video carousel, inheriting that section's background.
// Usage (inside VideoTestimonials.jsx or the parent Testimonials section):
//   <VideoCarousel />
//   <WrittenReviews />

const REVIEWS = [
  {
    id: "ananya",
    name: "Ananya Sharma",
    state: "Karnataka",
    review:
      "The state-wise filtering helped me shortlist colleges within my actual reach. I stopped wasting time on colleges I'd never get into.",
  },
  {
    id: "rohit",
    name: "Rohit Verma",
    state: "Maharashtra",
    review:
      "Choice filling felt overwhelming until I used this. The ranked list matched almost exactly with where I got my seat.",
  },
  {
    id: "sneha",
    name: "Sneha Reddy",
    state: "Telangana",
    review:
      "Seeing round-wise cutoff trends gave me the confidence to wait for a better round instead of locking in early.",
  },
  {
    id: "arjun",
    name: "Arjun Nair",
    state: "Kerala",
    review:
      "Simple, fast, and accurate. I shared my rank and got a clear picture of realistic options within minutes.",
  },
  {
    id: "priya",
    name: "Priya Iyer",
    state: "Tamil Nadu",
    review:
      "The category-wise breakdown was the most useful part. It explained things my coaching centre never did.",
  },
  {
    id: "karthik",
    name: "Karthik Rao",
    state: "Andhra Pradesh",
    review:
      "I saved a handful of colleges early on and kept revisiting them as cutoffs updated. Made counselling far less stressful.",
  },
];

const AUTO_ADVANCE_MS = 4500;

export default function WrittenReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused.current) return;
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, []);

  const prevIndex = (activeIndex - 1 + REVIEWS.length) % REVIEWS.length;
  const nextIndex = (activeIndex + 1) % REVIEWS.length;

  const slots = [
    { review: REVIEWS[prevIndex], isActive: false, visibility: "hidden lg:block" },
    { review: REVIEWS[activeIndex], isActive: true, visibility: "block" },
    { review: REVIEWS[nextIndex], isActive: false, visibility: "hidden sm:block" },
  ];

  return (
    <div
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
      className="mt-10 px-6 lg:px-12 xl:px-16 mb-10"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map(({ review, isActive, visibility }, slotIndex) => (
          <motion.div
            key={`${review.id}-${slotIndex}`}
            animate={{ scale: isActive ? 1.04 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className={`${visibility} rounded-2xl border p-5 transition-shadow duration-300 ${
              isActive
                ? "border-blue-700 bg-blue-600 shadow-xl shadow-blue-600/25"
                : "border-slate-200 bg-slate-50 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  isActive ? "bg-white/15" : "bg-blue-600/10"
                }`}
              >
                <UserRound
                  className={`h-5 w-5 ${isActive ? "text-white" : "text-blue-600"}`}
                  strokeWidth={2}
                />
              </div>
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isActive ? "text-white" : "text-slate-900"
                  }`}
                >
                  {review.name}
                </p>
                <p
                  className={`text-xs ${isActive ? "text-blue-100" : "text-slate-500"}`}
                >
                  {review.state}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star
                  key={starIndex}
                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                  strokeWidth={0}
                />
              ))}
            </div>

            <p
              className={`mt-3 line-clamp-4 text-sm leading-relaxed ${
                isActive ? "text-blue-50" : "text-slate-600"
              }`}
            >
              {review.review}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {REVIEWS.map((review, index) => (
          <button
            key={review.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show review from ${review.name}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-6 bg-blue-600"
                : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
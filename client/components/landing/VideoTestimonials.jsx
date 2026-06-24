"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { Play, Star, GraduationCap, Quote, X } from "lucide-react";

// TODO: replace youtubeId values with real video IDs
const TESTIMONIALS = [
  { id: "ananya", name: "Ananya Sharma", youtubeId: "dQw4w9WgXcQ" },
  { id: "rohit", name: "Rohit Verma", youtubeId: "dQw4w9WgXcQ" },
  { id: "sneha", name: "Sneha Reddy", youtubeId: "dQw4w9WgXcQ" },
  { id: "arjun", name: "Arjun Nair", youtubeId: "dQw4w9WgXcQ" },
  { id: "priya", name: "Priya Iyer", youtubeId: "dQw4w9WgXcQ" },
  { id: "karthik", name: "Karthik Rao", youtubeId: "dQw4w9WgXcQ" },
];

const CARD_WIDTH = 360;
const GAP = 24;
const TRACK_WIDTH = TESTIMONIALS.length * (CARD_WIDTH + GAP);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function TestimonialCard({ testimonial, onPlay }) {
  return (
    <motion.button
      type="button"
      onClick={() => onPlay(testimonial)}
      aria-label={`Play ${testimonial.name}'s testimonial video`}
      style={{ width: CARD_WIDTH }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative h-[440px] shrink-0 overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-md transition-shadow duration-200 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      {/* Thumbnail — dominates the entire card */}
      {/* TODO: Replace with real video thumbnail, e.g. <Image src={`https://img.youtube.com/vi/${testimonial.youtubeId}/hqdefault.jpg`} alt={testimonial.name} fill className="object-cover transition-transform duration-300 ease-out group-hover:scale-105" /> */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-slate-300 transition-transform duration-300 ease-out group-hover:scale-105">
        <GraduationCap className="h-12 w-12" strokeWidth={1.5} />
      </div>

      {/* Play button */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform duration-200 group-hover:scale-105">
          <Play className="h-6 w-6 fill-blue-600 text-blue-600" strokeWidth={0} />
        </span>
      </div>

      {/* Bottom gradient overlay — name + rating only */}
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pb-5 pt-16">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
              strokeWidth={0}
            />
          ))}
        </div>
        <p className="mt-2 text-base font-semibold text-white">
          {testimonial.name}
        </p>
      </div>
    </motion.button>
  );
}

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState(null);

  const x = useMotionValue(0);
  const isPaused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (isPaused.current || activeVideo) return;
    const speed = 36; // px per second
    let next = x.get() - (speed * delta) / 1000;
    if (Math.abs(next) >= TRACK_WIDTH) {
      next += TRACK_WIDTH;
    }
    x.set(next);
  });

  useEffect(() => {
    if (!activeVideo) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo]);

  const loopedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50 py-20 sm:py-24 lg:py-28">
      <div className="px-6 lg:px-12 xl:px-16">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-sm"
          >
            <Quote className="h-3.5 w-3.5 text-blue-600" strokeWidth={2} />
            <span className="text-xs font-medium text-slate-600">
              Student Success Stories
            </span>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Hear From Students Who Used NEET Predictor
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-slate-600"
          >
            See how students used rank analysis, cutoff insights, and
            counselling data to make better college decisions.
          </motion.p>
        </div>

        {/* Auto-sliding video carousel — nearly full viewport width */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
          className="mt-14 overflow-hidden"
        >
          <motion.div style={{ x }} className="flex gap-6">
            {loopedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
                onPlay={setActiveVideo}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Reserved spacing — written reviews will be added directly below the videos */}
      <div className="h-20 sm:h-24 lg:h-28" aria-hidden="true" />

      {/* Video modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm transition-colors duration-200 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>

              <div className="aspect-video w-full">
                <iframe
                  key={activeVideo.youtubeId}
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?rel=0`}
                  title={`${activeVideo.name}'s testimonial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
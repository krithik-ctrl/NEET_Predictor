"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const STATES = [
  { name: "Karnataka", count: "180+" },
  { name: "Tamil Nadu", count: "210+" },
  { name: "Maharashtra", count: "250+" },
  { name: "Telangana", count: "130+" },
  { name: "Andhra Pradesh", count: "140+" },
  { name: "Kerala", count: "90+" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function StateDiscoverySection() {
  const scrollRef = useRef(null);

  const scrollByCard = (direction) => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * 304, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background: dot grid + soft blue-indigo gradient blobs, subtle float */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgb(100_116_139_/_0.12)_1px,_transparent_1px)] [background-size:30px_30px] opacity-30" />
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-32 top-0 h-[340px] w-[340px] rounded-full bg-blue-500/10 blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute -right-32 bottom-0 h-[320px] w-[320px] rounded-full bg-indigo-500/10 blur-[100px]"
        />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-sm"
            >
              <Compass className="h-3.5 w-3.5 text-blue-600" strokeWidth={2} />
              <span className="text-xs font-medium text-slate-600">
                Explore by State
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
              Discover Medical Colleges, State by State
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
              className="mt-4 text-base leading-relaxed text-slate-600"
            >
              Browse colleges and prediction opportunities across India&apos;s
              top NEET counselling states.
            </motion.p>
          </div>

          {/* Carousel controls */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll to previous states"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-100"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Scroll to next states"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-100"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          ref={scrollRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-12 flex gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
        >
          {STATES.map(({ name, count }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="group w-72 shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-xl"
            >
              {/* State image placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                {/* TODO: Replace with real state image, e.g. <Image src={`/states/${name}.jpg`} alt={name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" /> */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 transition-transform duration-300 group-hover:scale-105">
                  <MapPin className="h-10 w-10" strokeWidth={1.5} />
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold text-slate-900">{name}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {count} Medical Colleges
                </p>

                <Link
                  href={`/predictor?state=${encodeURIComponent(name)}`}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-lg bg-blue-600/10 px-3 py-2 text-xs font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-700"
                >
                  Predict for {name}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
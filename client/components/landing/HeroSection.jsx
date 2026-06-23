"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  Database,
  Crown,
  UserRound,
} from "lucide-react";
import Image from "next/image";
const MotionLink = motion.create(Link);

const TRUST_POINTS = ["Updated for 2026 counselling"];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  const imageRef = useRef(null);

  // Subtle mouse-follow tilt for the student visual
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 0.5 });
  const rotateX = useTransform(springY, [-30, 30], [3, -3]);
  const rotateY = useTransform(springX, [-30, 30], [-3, 3]);
  const translateX = useTransform(springX, [-30, 30], [-5, 5]);
  const translateY = useTransform(springY, [-30, 30], [-5, 5]);

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    mouseX.set(Math.max(-30, Math.min(30, x / 8)));
    mouseY.set(Math.max(-30, Math.min(30, y / 8)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background: faint geometric pattern + soft blue-indigo accents, slow fade-in */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgb(100_116_139_/_0.12)_1px,_transparent_1px)] [background-size:32px_32px] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white" />
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-[-180px] h-[440px] w-[440px] rounded-full bg-blue-500/10 blur-[110px]"
        />
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-[-140px] top-16 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[110px]"
        />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left column — primary conversion path */}
          <div className="flex flex-col">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-2"
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
                <Database className="h-3.5 w-3.5 text-blue-600" strokeWidth={2} />
                <span className="text-xs font-medium text-slate-600">
                  2026 Cutoff Database Updated
                </span>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/90 px-3.5 py-1.5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
                <Crown className="h-3.5 w-3.5 text-amber-500" strokeWidth={2} />
                <span className="text-xs font-medium text-amber-700">
                  Free 2 Predictions · Premium Unlimited
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="mt-8 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.6rem] lg:leading-[1.06]"
            >
              Find the{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                right college
              </span>
              ,
              <br />
              before your rank does.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="mt-6 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              Enter your rank and category to see every MBBS and BDS college
              within reach, ranked by admission probability using verified
              counselling data from previous years.
            </motion.p>

            {/* Primary conversion path */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MotionLink
                href="/predictor"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-shadow duration-200 hover:shadow-xl hover:shadow-indigo-600/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:shadow-md"
              >
                Predict My College
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </MotionLink>

              <MotionLink
                href="/register"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-colors duration-200 hover:border-indigo-200 hover:bg-white hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:bg-slate-50"
              >
                <PlayCircle className="h-4 w-4" strokeWidth={2} />
                Watch Demo
              </MotionLink>
            </motion.div>

            {/* Friction-reducing trust point */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5"
            >
              {TRUST_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-500"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
                  {point}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right column — student visual with subtle mouse-follow tilt */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative mx-auto w-full max-w-md [perspective:1200px] lg:max-w-none"
          >
            {/* Abstract shapes behind the student — layered depth, soft gradient only, no data widgets */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-0 -z-10"
            >
              {/* Soft radial glow, centered */}
              <div className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgb(99_102_241_/_0.14),_transparent_65%)]" />

              {/* Large blurred blue-indigo gradient blob */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 mx-auto h-[92%] w-[92%] translate-y-6 rounded-[3rem] bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-blue-600/15 blur-3xl"
              />

              {/* Secondary smaller blob for layered depth */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -right-6 bottom-0 h-[42%] w-[42%] rounded-full bg-indigo-500/15 blur-2xl"
              />

              {/* Geometric outline shapes */}
              <motion.div
                animate={{ rotate: [0, 4, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] border border-blue-200/50"
              />
              <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-200/40" />
              <motion.div
                animate={{ rotate: [0, -6, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute -right-4 top-10 h-12 w-12 rotate-12 rounded-lg border border-blue-300/40"
              />

              {/* Dotted pattern grid, top-left corner */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 -top-8 h-24 w-24 bg-[radial-gradient(circle,_rgb(99_102_241_/_0.45)_1.5px,_transparent_1.5px)] [background-size:14px_14px] opacity-60"
              />

              {/* Thin abstract curved line accent, top-left */}
              <motion.svg
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                viewBox="0 0 64 64"
                fill="none"
                className="absolute -left-6 top-1/4 h-14 w-14 text-blue-400/40"
              >
                <path
                  d="M8 12 C8 28, 8 28, 24 28"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M18 22 C18 36, 18 36, 34 36"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* Thin abstract curved line accent, bottom-right */}
              <motion.svg
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                viewBox="0 0 64 64"
                fill="none"
                className="absolute -right-5 bottom-16 h-12 w-12 text-indigo-400/35"
              >
                <path
                  d="M56 52 C56 38, 56 38, 40 38"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.svg>
            </motion.div>

            <motion.div
  ref={imageRef}
  style={{ rotateX, rotateY, x: translateX, y: translateY }}
  whileHover={{ scale: 1.01 }}
  transition={{ duration: 0.15, ease: "easeOut" }}
  className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-slate-200/70 shadow-2xl shadow-indigo-900/10"
>
  <Image
    src="/indianStd.webp"
    alt="Medical student"
    fill
    priority
    sizes="(max-width: 1024px) 100vw, 50vw"
    className="object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
</motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Tag, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

const MotionLink = motion(Link);

const FREE_FEATURES = [
  "Basic College Predictor",
  "State-wise Predictions",
  "Basic Cutoff Information",
  "Limited Predictions",
  "College Database Access",
];

const PREMIUM_FEATURES = [
  "Unlimited Predictions",
  "Detailed College Analysis",
  "Advanced Filters",
  "College Comparison",
  "Save & Shortlist Colleges",
  "Premium Cutoff Insights",
  "Priority Support",
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background: soft blue-indigo gradients + subtle dot grid */}
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
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 shadow-sm"
          >
            <Tag className="h-3.5 w-3.5 text-blue-600" strokeWidth={2} />
            <span className="text-xs font-medium text-slate-600">
              Simple Pricing
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
            Choose the Right Plan for Your NEET Journey
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-slate-600"
          >
            Everything you need to make informed college decisions.
          </motion.p>
        </div>

        {/* Pricing cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-1 items-center gap-8 sm:grid-cols-2"
        >
          {/* Free plan */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-slate-900">Free Plan</h3>
            <p className="mt-1 text-sm text-slate-500">
              Get started with the essentials.
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight text-slate-900">
                ₹0
              </span>
              <span className="text-sm font-medium text-slate-500">/ forever</span>
            </div>

            <ul className="mt-7 flex flex-1 flex-col gap-3">
              {FREE_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                    strokeWidth={2}
                  />
                  <span className="text-sm text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-blue-200 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-slate-100"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Premium plan */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="relative flex h-full flex-col rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 shadow-xl shadow-blue-600/25 transition-shadow duration-200 hover:shadow-2xl hover:shadow-indigo-600/30 lg:-translate-y-2 lg:p-10"
          >
            {/* Most Popular badge */}
            <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Most Popular
            </span>

            <h3 className="text-lg font-semibold text-white">Premium Plan</h3>
            <p className="mt-1 text-sm text-blue-100">
              Full access for serious aspirants.
            </p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight text-white">
                ₹499
              </span>
              <span className="text-sm font-medium text-blue-100">/ month</span>
            </div>

            <ul className="mt-7 flex flex-1 flex-col gap-3">
              {PREMIUM_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-white"
                    strokeWidth={2}
                  />
                  <span className="text-sm text-blue-50">{feature}</span>
                </li>
              ))}
            </ul>

            <MotionLink
              href="/subscription"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-md transition-colors duration-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-blue-100"
            >
              Go Premium
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </MotionLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
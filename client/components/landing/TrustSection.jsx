"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Building2,
  CalendarCheck,
  Landmark,
  History,
  MapPin,
  Filter,
  Lock,
} from "lucide-react";

const TRUST_CARDS = [
  {
    value: "50,000+",
    label: "Predictions Generated",
    icon: Target,
  },
  {
    value: "1000+",
    label: "Medical Colleges",
    icon: Building2,
  },
  {
    value: "2026",
    label: "Updated Cutoff Data",
    icon: CalendarCheck,
  },
  {
    value: "Government & Private",
    label: "College Coverage",
    icon: Landmark,
  },
];

const TRUST_ROW = [
  { label: "Historical Data Analysis", icon: History },
  { label: "State Wise Predictions", icon: MapPin },
  { label: "Category Wise Filtering", icon: Filter },
  { label: "Secure User Accounts", icon: Lock },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function TrustSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24 lg:py-28">
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
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" strokeWidth={2} />
            <span className="text-xs font-medium text-slate-600">
              Trusted by NEET Aspirants Across India
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
            Data-Driven College Predictions You Can Trust
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-slate-600"
          >
            Every prediction is built on verified historical cutoff records,
            category-wise reservation rules, state quota patterns, and your
            own college preferences — not guesswork.
          </motion.p>
        </div>

        {/* Trust cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TRUST_CARDS.map(({ value, label, icon: Icon }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10">
                <Icon className="h-5 w-5 text-blue-600" strokeWidth={2} />
              </div>
              <p className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-slate-200 pt-10"
        >
          {TRUST_ROW.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-blue-600" strokeWidth={2} />
              <span className="text-sm font-medium text-slate-600">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
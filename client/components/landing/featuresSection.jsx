"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  BrainCircuit,
  MapPin,
  ClipboardList,
  Bookmark,
  Lightbulb,
  FileText,
} from "lucide-react";

const FEATURES = [
  {
    title: "AI College Prediction",
    description:
      "Get ranked college predictions powered by machine learning models trained on years of NEET counselling outcomes.",
    icon: BrainCircuit,
  },
  {
    title: "State-wise Analysis",
    description:
      "Compare admission chances across state quotas and counselling boards to find where you stand the best chance.",
    icon: MapPin,
  },
  {
    title: "Choice Filling Support",
    description:
      "Build a smarter choice list with guided recommendations based on your rank, category, and college preferences.",
    icon: ClipboardList,
  },
  {
    title: "Saved Colleges",
    description:
      "Bookmark colleges you're tracking and revisit them anytime as new cutoff data and rounds are released.",
    icon: Bookmark,
  },
  {
    title: "Counselling Insights",
    description:
      "Understand round-wise trends, seat matrix shifts, and category-wise movement from previous counselling years.",
    icon: Lightbulb,
  },
  {
    title: "Premium Reports",
    description:
      "Unlock detailed PDF reports with personalised college shortlists, probability breakdowns, and admission strategy.",
    icon: FileText,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* Background: soft blue accent gradients */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-32 top-0 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-indigo-500/10 blur-[100px]"
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
            <Sparkles className="h-3.5 w-3.5 text-blue-600" strokeWidth={2} />
            <span className="text-xs font-medium text-slate-600">
              Why Students Choose Us
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
            Why Students Choose NEET Predictor
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-slate-600"
          >
            Everything you need to plan your NEET counselling journey,
            backed by real data and built for serious aspirants.
          </motion.p>
        </div>

        {/* Feature cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10">
                <Icon className="h-5 w-5 text-blue-600" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-base font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
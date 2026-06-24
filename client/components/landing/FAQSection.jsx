"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "How are college predictions generated?",
    answer:
      "Predictions are built from historical cutoff records across previous counselling rounds, combined with your rank, category, and state quota rules to estimate realistic admission chances.",
  },
  {
    question: "Is the predictor free to use?",
    answer:
      "Yes. The Free plan gives you access to basic predictions and college data. Upgrading to Premium unlocks unlimited predictions and deeper insights.",
  },
  {
    question: "What benefits do Premium users get?",
    answer:
      "Premium includes unlimited predictions, detailed college analysis, advanced filters, side-by-side college comparison, saved shortlists, premium cutoff insights, and priority support.",
  },
  {
    question: "Which states are currently supported?",
    answer:
      "Karnataka, Tamil Nadu, Maharashtra, Telangana, Andhra Pradesh, and Kerala are supported today, with more states being added as counselling data becomes available.",
  },
  {
    question: "Can I compare multiple colleges?",
    answer:
      "Yes. You can compare colleges side by side on cutoffs, fees, and seat availability to make a more informed choice during counselling.",
  },
  {
    question: "Is counselling and cutoff data updated regularly?",
    answer:
      "Yes. Cutoff and seat matrix data is refreshed after every counselling round so your predictions reflect the latest available information.",
  },
  {
    question: "Can I save colleges for later?",
    answer:
      "Yes. You can bookmark colleges as you explore predictions and revisit your saved list anytime from your account.",
  },
  {
    question: "How do I upgrade to Premium?",
    answer:
      "Head to the subscription page, choose the Premium plan, and complete your payment. Premium features unlock immediately on your account.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 ${
        isOpen
          ? "border-blue-200 shadow-md"
          : "border-slate-200 hover:border-blue-200 hover:shadow-md"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="text-sm font-medium text-slate-900 sm:text-base">
          {faq.question}
        </span>

        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600/10">
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="minus"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <Minus className="h-3.5 w-3.5 text-blue-600" strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <Plus className="h-3.5 w-3.5 text-blue-600" strokeWidth={2.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-6">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-slate-50 to-slate-100 py-20 sm:py-24 lg:py-28">
      {/* Background: subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgb(99_102_241_/_0.12),_transparent_70%)]" />
      </div>

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
            <HelpCircle className="h-3.5 w-3.5 text-blue-600" strokeWidth={2} />
            <span className="text-xs font-medium text-slate-600">
              Frequently Asked Questions
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
            Everything You Need to Know
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            className="mt-4 text-base leading-relaxed text-slate-600"
          >
            Find answers to common questions about predictions, plans,
            colleges, and counselling support.
          </motion.p>
        </div>

        {/* FAQ accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
          className="mx-auto mt-12 flex max-w-3xl flex-col gap-4"
        >
          {FAQS.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
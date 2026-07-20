// gst.util.js — new small helper file
export const GST_RATE = 0.18; // 18%

export const calculateGstAmount = (baseAmount) => {
  const gstAmount = Math.round(baseAmount * GST_RATE);
  const totalAmount = baseAmount + gstAmount;
  return { baseAmount, gstAmount, totalAmount };
};
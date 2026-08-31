import Razorpay from "razorpay";

// Runs in "demo mode" whenever Razorpay keys are unset — create-order still
// returns a well-formed (but fake) order so the checkout UI works end-to-end
// in this environment. Drop real keys into .env to take live payments.
export const isRazorpayLive = Boolean(
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET,
);

export const razorpay = isRazorpayLive
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })
  : null;

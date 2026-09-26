import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// POST /api/payment/create-order
// Generates a mock or real Razorpay order for online confirmation deposit
export async function POST(req: NextRequest) {
  try {
    const { amount, bookingId, customerName, phone } = await req.json();

    if (!amount || !bookingId) {
      return NextResponse.json({ error: 'amount and bookingId required' }, { status: 400 });
    }

    // In a live integration, use Razorpay SDK instance:
    // const order = await razorpay.orders.create({ amount: amount * 100, currency: "INR", receipt: bookingId });
    const orderId = 'order_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);

    return NextResponse.json({
      success: true,
      orderId,
      amount,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mbcabs_demo',
      bookingId,
      customerName,
      phone
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Payment initiation failed' }, { status: 500 });
  }
}

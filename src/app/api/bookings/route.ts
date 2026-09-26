import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getBookings,
  insertBooking,
  updateBookingStatusInDb,
  checkBookingAvailability,
  rateLimitIp,
  getSettings
} from '@/lib/serverDb';
import { requireAdmin, getClientIp } from '@/lib/auth';
import { BookingRecord } from '@/lib/data';
import { generateOwnerWhatsAppAlertUrl } from '@/lib/utils';

// Zod schema for server-side booking validation
const BookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z
    .string()
    .regex(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$|^[0-9]{10,13}$/, 'Invalid Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  travelDate: z.string().min(1, 'Travel date is required'),
  passengers: z.number().int().min(1).max(20).default(2),
  packageSlug: z.string().min(1),
  packageName: z.string().min(1),
  vehicleType: z.enum(['Sedan', 'SUV']),
  pickupLocation: z.string().min(2),
  dropLocation: z.string().min(2),
  stayRequired: z.boolean().default(false),
  specialRequests: z.string().optional().default(''),
  calculatedPrice: z.number().nonnegative(),
  pricingMode: z.enum(['OFF_SEASON', 'SEASON']).default('OFF_SEASON'),
  honeypot: z.string().optional() // Bot trap: must be empty
});

// GET /api/bookings - Admin only: list bookings
export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.authenticated) return auth.response!;

  const bookings = await getBookings();
  return NextResponse.json(bookings);
}

// POST /api/bookings - Public with rate limiting, zod validation, bot honeypot, and capacity checks
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // 1. IP Rate Limiting (5 requests per 60 seconds)
    const rateCheck = await rateLimitIp(`booking_${ip}`, 5, '60 s');
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many booking requests. Please wait a moment or call our driver desk directly.' },
        { status: 429 }
      );
    }

    const rawBody = await req.json();

    // 2. Honeypot Bot Trap
    if (rawBody.honeypot && rawBody.honeypot.trim() !== '') {
      // Quietly reject bots without alerting them
      return NextResponse.json({ success: true, id: 'BK-BOT-REJECTED' });
    }

    // 3. Server-side Zod Validation
    const validation = BookingSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 4. Double-Booking / Capacity Check
    const availability = await checkBookingAvailability(data.travelDate, data.vehicleType, data.packageSlug);
    if (!availability.available) {
      return NextResponse.json(
        {
          error: availability.message || 'Vehicle unavailable for selected date',
          capacityExceeded: true
        },
        { status: 409 }
      );
    }

    // 5. Generate secure UUID-like booking ID
    const bookingId =
      'BK-' +
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).substring(2, 6).toUpperCase();

    const newBooking: BookingRecord = {
      id: bookingId,
      customerName: data.customerName.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || '',
      travelDate: data.travelDate,
      passengers: data.passengers,
      packageSlug: data.packageSlug,
      packageName: data.packageName,
      vehicleType: data.vehicleType,
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropLocation,
      stayRequired: data.stayRequired,
      specialRequests: data.specialRequests,
      calculatedPrice: data.calculatedPrice,
      pricingMode: data.pricingMode,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };

    await insertBooking(newBooking);

    // Retrieve settings to find Murugan's phone number
    const settings = await getSettings();
    const ownerPhone = settings.phone1 || '+919942472778';
    const ownerAlertUrl = generateOwnerWhatsAppAlertUrl(ownerPhone, newBooking);

    // Send confirmation log and alert payload
    try {
      console.log(`[BOOKING CREATED] ID: ${bookingId}, Customer: ${newBooking.customerName}, Phone: ${newBooking.phone}, Date: ${newBooking.travelDate}`);
      console.log(`[MURUGAN WHATSAPP ALERT]: ${ownerAlertUrl}`);
    } catch (e) {
      // Do not block response on notification error
    }

    return NextResponse.json({
      success: true,
      booking: newBooking,
      ownerAlertUrl
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to process booking' }, { status: 500 });
  }
}

// PATCH /api/bookings - Admin only: update status
export async function PATCH(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.authenticated) return auth.response!;

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
    }

    const success = await updateBookingStatusInDb(id, status);
    if (!success) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id, status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Update failed' }, { status: 500 });
  }
}

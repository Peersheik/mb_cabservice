export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined) return 'Contact for Rates';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const generateWhatsAppBookingUrl = (params: {
  phone: string;
  packageName?: string;
  vehicleType?: string;
  travelDate?: string;
  passengers?: number;
  pickup?: string;
  drop?: string;
  stayRequired?: boolean;
  customerName?: string;
}): string => {
  const cleanPhone = params.phone.replace(/[^0-9]/g, '');
  const message = `Hi MB Cabs Holidays,

I would like to enquire about a Kodaikanal trip with MB Cabs:

*Package:* ${params.packageName || 'Custom Itinerary'}
*Vehicle Choice:* ${params.vehicleType || 'Sedan / SUV'}
*Travel Date:* ${params.travelDate || 'Flexible'}
*Passengers:* ${params.passengers || 2} Pax
*Pickup Location:* ${params.pickup || 'Kodaikanal Bus Stand / Hotel'}
*Drop Location:* ${params.drop || 'Kodaikanal Lake / Hotel'}
${params.stayRequired ? '*Stay/Cottage Booking:* Yes, please provide options\n' : ''}
${params.customerName ? `*Name:* ${params.customerName}\n` : ''}
Please share driver availability and confirm booking details. Thank you!`;

  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
};

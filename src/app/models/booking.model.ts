export interface BookingDTO {
  id: number;
  userId: string;
  productId: number;
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  startDate: string;
  endDate: string;
  numberOfPersons: number;
  price: number;
  currency: string;
  status: string;
}

"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "../_lib/actions";

interface Booking {
  id: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: string;
  guests: { fullName: string; email: string };
  cabins: any;
}

interface BookingRowProps {
  booking: Booking[];
}

function ReservationList({ bookings }: { bookings: BookingRowProps }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings: any, bookingId) => {
      return curBookings.filter((booking: Booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking: Booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISearchForm } from "../models/ISearchForm";
import { createBookingAPI } from "../services/restaurantService";

interface HandleBookingProps {
  formData: ISearchForm;
  setAvailableTimes: React.Dispatch<React.SetStateAction<string[]>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleBooking: (result: string) => void;
  bookingResult: string;
  isFullyBooked: boolean;
}

const HandleBooking: React.FC<HandleBookingProps> = ({
  formData,
  handleInputChange,
  handleBooking,
  bookingResult,
  isFullyBooked,
}) => {
  const navigate = useNavigate();
  const [redirectId, setRedirectId] = useState<string | null>(null);

  const checkBooking = async () => {
    if (
      !formData.customer.name ||
      !formData.customer.lastname ||
      !formData.customer.email ||
      !formData.customer.phone ||
      !formData.date ||
      !formData.time
    ) {
      alert(
        "Hey! You need to fill in all the fields to be able to book a table!"
      );
      return;
    }
    try {
      const createResponse = await createBookingAPI(formData);
      if (createResponse && createResponse.insertedId) {
        setRedirectId(createResponse.insertedId);
        handleBooking("Booking successful!");
      } else {
        handleBooking(
          "An error occurred during the booking. Please try again."
        );
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      handleBooking("An error occurred during the booking. Please try again.");
    }
  };

  useEffect(() => {
    if (redirectId) {
      navigate(
        `/bookingconfirmation?bookingId=${redirectId}&name=${formData.customer.name} ${formData.customer.lastname}&date=${formData.date}&time=${formData.time}`
      );
    }
  }, [
    redirectId,
    navigate,
    formData.customer.name,
    formData.customer.lastname,
    formData.date,
    formData.time,
  ]);

  return (
    <>
      <input
        type="text"
        name="customer.name"
        placeholder="First name"
        value={formData.customer.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="customer.lastname"
        placeholder="Last name"
        value={formData.customer.lastname}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="customer.email"
        placeholder="Email"
        value={formData.customer.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="customer.phone"
        placeholder="Phone number"
        value={formData.customer.phone}
        onChange={handleInputChange}
      />
      {bookingResult && <div>{bookingResult}</div>}{" "}
      <button type="button" onClick={checkBooking} disabled={isFullyBooked}>
        Reserve a table
      </button>
    </>
  );
};

export default HandleBooking;

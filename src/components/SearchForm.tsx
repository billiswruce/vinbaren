import React, { useCallback, useEffect, useState } from "react";
import "./../styles/_searchform.scss";
import { ISearchForm } from "../models/ISearchForm";
import HandleBooking from "./HandleBooking";
import Modal from "./modal/Modal";
import { fetchBookingAPI } from "../services/restaurantService";
import PrivacyPolicy from "./modal/PrivacyPolicy";

const SearchForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ISearchForm>({
    restaurantId: "65ca1c36da99d8d7087f3513",
    name: "",
    lastname: "",
    date: "",
    time: "18:00",
    numberOfGuests: 1,
    customer: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
  });
  const [isFullyBooked, setIsFullyBooked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const checkAvailableTables = useCallback(async () => {
    try {
      const bookings = await fetchBookingAPI(formData.restaurantId);

      const matchingBookings = bookings.filter(
        (booking: { date: string; time: string }) => {
          return (
            booking.date === formData.date && booking.time === formData.time
          );
        }
      );

      const totalTables = 15;
      const availableTables = totalTables - matchingBookings.length;

      if (availableTables > 0) {
        setAvailabilityMessage(`${availableTables} available tables left.`);
        setIsFullyBooked(false);
      } else {
        setAvailabilityMessage(
          "Sorry, it's fully booked! Please choose another time or day."
        );
        setIsFullyBooked(true);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setAvailabilityMessage("Could not retrieve booking information.");
    }
  }, [formData.date, formData.time, formData.restaurantId]);

  useEffect(() => {
    if (formData.date) {
      checkAvailableTables();
    }
  }, [formData.date, formData.time, checkAvailableTables]);

  useEffect(() => {
    if (showAlert) {
      alert("Sorry, fully booked!");
      setShowAlert(false);
    }
  }, [showAlert]);

  const [availableTimes, setAvailableTimes] = useState<string[]>([
    "18:00",
    "21:00",
  ]);
  const [bookingResult, setBookingResult] = useState<string>("");
  const [availabilityMessage, setAvailabilityMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const updateFormData = (name: string, value: string) => {
    if (name.startsWith("customer.")) {
      const [, field] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        customer: { ...prevData.customer, [field]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleBooking = (result: string) => {
    setBookingResult(result);
  };

  return (
    <>
      {" "}
      {availabilityMessage && (
        <p className="availableMessage">{availabilityMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Number of guests:
          <select
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleInputChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </label>
        <label>
          Preferred date:
          <br />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </label>
        {availableTimes.length > 0 && (
          <label>
            Seating time:
            <br />
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        )}
      </form>
      <form>
        <HandleBooking
          formData={formData}
          setAvailableTimes={setAvailableTimes}
          handleInputChange={handleInputChange}
          handleBooking={handleBooking}
          bookingResult={""}
          isFullyBooked={isFullyBooked}
        />
        {bookingResult && <p>{bookingResult}</p>}
      </form>
      <p>
        By clicking 'Reserve a table' you agree to our terms of service. <br />
        You can read more by clicking{" "}
        <a id="modalknapp" onClick={() => setIsModalOpen(true)}>
          here
        </a>
        .
      </p>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PrivacyPolicy />
      </Modal>
    </>
  );
};

export default SearchForm;

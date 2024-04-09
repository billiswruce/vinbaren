import { useState, useEffect } from "react";
import axios from "axios";
import "../models/IBookingData";
import "../models/ICustomerData";
import { IUpdateBooking } from "../models/IUpdateBooking";
import { IBookingData } from "../models/IBookingData";
import { ICustomerData } from "../models/ICustomerData";

export const BookingList = () => {
  const apiUrl = "https://school-restaurant-api.azurewebsites.net";
  const restaurantId = "65ca1c36da99d8d7087f3513";

  const [bookingDetails, setBookingDetails] = useState<
    { booking: IBookingData; customer: ICustomerData }[]
  >([]);

  const [editing, setEditing] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get<IBookingData[]>(
        `${apiUrl}/booking/restaurant/${restaurantId}`
      );

      const detailsData = await Promise.all(
        response.data.map(async (booking) => {
          const customerResponse = await axios.get<ICustomerData[]>(
            `${apiUrl}/customer/${booking.customerId}`
          );
          const customer = customerResponse.data[0];
          return { booking, customer };
        })
      );
      setBookingDetails(detailsData);
    };

    fetchBookings();
  }, [apiUrl, restaurantId]);

  const handleDeleteBooking = async (id: string) => {
    try {
      console.log(`Attempting to delete booking with ID: ${id}`);
      await axios.delete(`${apiUrl}/booking/delete/${id}`);
      // Uppdatera state-variabeln efter att bokningen har tagits bort
      setBookingDetails((prevDetails) =>
        prevDetails.filter((details) => details.booking._id !== id)
      );
    } catch (error) {
      console.error("Error deleting booking", error);
    }
  };

  const [updatedData, setUpdatedData] = useState<IUpdateBooking>({
    id: "",
    restaurantId: "65ca1c36da99d8d7087f3513",
    date: "",
    time: "",
    numberOfGuests: 1,
    customerId: "",
  });

  async function handleEditBooking(customerId: string, bookingId: string) {
    console.log(customerId, bookingId);
    console.log({
      id: bookingId,
      restaurantId: restaurantId,
      date: "",
      time: "",
      numberOfGuests: 4,
      customerId: customerId,
    });

    try {
      console.log(`Attempting to edit booking with ID: ${bookingId}`);
      await axios.put(`${apiUrl}/booking/update/${bookingId}`, {
        id: bookingId,
        restaurantId: restaurantId,
        date: updatedData.date,
        time: updatedData.time,
        numberOfGuests: updatedData.numberOfGuests,
        customerId: customerId,
      });
      // Uppdatera state-variabeln efter att bokningen har tagits bort
      setBookingDetails((prevDetails) =>
        prevDetails.filter((details) => details.booking._id !== bookingId)
      );

      // Uppdatera state-variabeln efter att bokningen har tagits bort
      setBookingDetails((prevDetails) =>
        prevDetails.filter((details) => details.booking._id !== bookingId)
      );
      // setEditing("");
    } catch (error) {
      console.error("Error deleting booking", error);
    }
  }

  const [bookingInEdit, setBookingInEdit] = useState<IBookingData | null>(null);

  return (
    <div>
      <h1>Bokningar</h1>
      <hr />
      {bookingDetails.map(({ booking, customer }) => (
        <div key={booking._id}>
          {bookingInEdit?._id !== booking._id ? (
            <>
              <input value={booking.date} disabled={editing !== booking._id} />
              <input value={booking.time} disabled={editing !== booking._id} />
              <input
                value={`Antal gäster: ${booking.numberOfGuests}`}
                disabled={editing !== booking._id}
              />
              <div>
                <input value={booking._id} disabled={true} />
                <input
                  value={`Namn: ${customer.name} ${customer.lastname}`}
                  disabled={editing !== booking._id}
                />
                <input
                  value={`Email: ${customer.email}`}
                  disabled={editing !== booking._id}
                />
                <input
                  value={`Telefon: ${customer.phone}`}
                  disabled={editing !== booking._id}
                />

                {editing === booking._id ? (
                  <button
                    onClick={() =>
                      handleEditBooking(customer._id, booking._id)
                    }>
                    Spara ändringar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditing(booking._id);
                      setBookingInEdit(booking);
                    }}>
                    Redigera
                  </button>
                )}
                <button onClick={() => handleDeleteBooking(booking._id)}>
                  Ta bort
                </button>
              </div>
              <hr />
            </>
          ) : (
            // <form>
            <>
              <h2>Redigera bokning</h2>
              <div>
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  defaultValue={bookingInEdit.date}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      date: e.currentTarget.value,
                    })
                  }
                />

                <label htmlFor="time">Time</label>
                <input
                  id="time"
                  defaultValue={bookingInEdit.time}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      time: e.currentTarget.value,
                    })
                  }
                />

                <label htmlFor="numberOfGuests">Number of Guests</label>
                <select
                  id="numberOfGuests"
                  defaultValue={bookingInEdit.numberOfGuests}
                  onChange={(e) =>
                    setUpdatedData({
                      ...updatedData,
                      numberOfGuests: parseInt(e.currentTarget.value),
                    })
                  }>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>

                <label htmlFor="bookingId">Booking ID</label>
                <input
                  id="bookingId"
                  defaultValue={bookingInEdit._id}
                  disabled={true}
                />

                <label htmlFor="Name">Name</label>
                <input
                  id="Name"
                  defaultValue={customer.name + customer.lastname}
                />

                <label htmlFor="email">Email</label>
                <input id="email" defaultValue={customer.email} />

                <label htmlFor="phone">Phone</label>
                <input id="phone" defaultValue={customer.phone} />

                {editing === booking._id ? (
                  <button
                    onClick={() => {
                      setUpdatedData({ ...updatedData, id: booking._id });
                      setUpdatedData({
                        ...updatedData,
                        customerId: booking.customerId,
                      });

                      handleEditBooking(customer._id, booking._id);
                    }}>
                    Spara ändringar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditing(booking._id);
                      setBookingInEdit(booking);
                    }}>
                    Redigera
                  </button>
                )}
                <button onClick={() => handleDeleteBooking(booking._id)}>
                  Ta bort
                </button>
              </div>
            </>
            // </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingList;

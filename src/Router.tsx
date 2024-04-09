import { createBrowserRouter } from "react-router-dom";
import { Booking } from "./Pages/Booking";
import { Contact } from "./Pages/Contact";
import { Home } from "./Pages/Home";
import { NotFound } from "./Pages/NotFound";
import { Layout } from "./Pages/Layout";
import { BookingConfirmation } from "./Pages/BookingConfirmation";
import { BookingList } from "./Pages/BookingList";
import { Menu } from "./Pages/Menu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/admin",
        element: <BookingList />,
      },
      {
        path: "/bookingconfirmation",
        element: <BookingConfirmation />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
    ],
  },
]);

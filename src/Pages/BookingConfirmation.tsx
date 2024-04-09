import { useEffect, useState } from "react";
import bottleAndGrapes from "./../assets/bottleandgrapes.png";
import Confetti from "react-confetti";
import { useLocation } from "react-router-dom";

export const BookingConfirmation = () => {
  const [isConfettiRunning, setCofettiRunning] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const date = queryParams.get("date");
  const time = queryParams.get("time");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCofettiRunning(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div>
        {isConfettiRunning && <Confetti run={true} />}
        <h2>Thank you for your booking {name}!</h2>
        <br />
        <h3>
          Your booking is confirmed, and we'll see you at {time} on {date}.
        </h3>
        <br />
        <img src={bottleAndGrapes} alt="Bottle and Grapes" id="bottle" />
        <h4 className="cancellation">
          If you are unable to make it, or need to make any changes to your{" "}
          <br />
          reservation, please call or email us, and we will take care of it.{" "}
          <br /> <br />
          08-123 456 78 <br />
          Vinbaren@vin.nu <br /> <br />
          Changes or cancellations must be made at least 8 <br /> hours before
          the reservation.
        </h4>
        <br />
      </div>
    </>
  );
};

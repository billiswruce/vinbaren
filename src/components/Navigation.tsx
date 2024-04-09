import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/Booking"}>Booking</NavLink>
        </li>
        <li>
          <NavLink to={"/Menu"}>Menu</NavLink>
        </li>
        <li>
          <NavLink to={"/Contact"}>Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

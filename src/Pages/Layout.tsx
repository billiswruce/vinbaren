import "./../styles/main.scss";
import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import logo from "../assets/logo.png";
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <>
      <header>
        <h1>Vinbaren</h1>
        <img src={logo} alt="logo" className="loggan" />
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

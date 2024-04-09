import facebook from "./../assets/facebook.png";
import instagram from "./../assets/instagram.png";
import twitter from "./../assets/twitter.png";
import cheese from "./../assets/cheese.png";

export const Footer = () => {
  return (
    <footer>
      <div className="info">
        <p id="links">Site Links</p>
        <p>
          <a href="/booking">Book a table</a>
        </p>
        <p>
          <a href="/contact">Contact</a>
        </p>
        <p>
          <a href="/menu">Menu</a>
        </p>
      </div>
      <div className="cheese">
        <img src={cheese} alt="Cheese" id="cheese" />
      </div>
      <div>
        <p id="friends">Let's be friends.</p>
        <div className="socials">
          <a href="https://www.facebook.com/">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/">
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="https://www.twitter.com/">
            <img src={twitter} alt="Twitter" />
          </a>
        </div>
      </div>
    </footer>
  );
};

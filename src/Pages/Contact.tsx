import "./../styles/_contact.scss";
import winebottle from "./../assets/winebottle.png";
export const Contact = () => {
  return (
    <>
      <div className="contactpage">
        <div>
          <h2>find us</h2>
          <p>
            <a href="tel:+46552345678">08-123 456 78</a>
          </p>
          <p>
            <a href="mailto:Vinbaren@vin.nu">Vinbaren@vin.nu</a>
          </p>
          <p>
            Vinbaren
            <br /> Vinvägen 1<br /> 123 45 Vinland
          </p>
          <br />
          <p>
            Opening hours:
            <br /> Mon-Fri: 17:00 - late <br /> Sat: 15:00 - late
            <br /> Sun: 15:00 - late
          </p>
        </div>
        <div>
          <img src={winebottle} alt="Winebottle" id="winebottle" />
        </div>
      </div>
    </>
  );
};

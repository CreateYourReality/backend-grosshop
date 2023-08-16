import "./HeaderNav.css";
import BackBtn from "../BackBtn/BackBtn";

const HeaderNav = () => {
  return (
    <>
      <header className="headerNav-section">
        <section className="backBtn-box">
          <BackBtn />
        </section>
        <section className="location-name">
          <h2>I bims, a Header nav</h2>
        </section>
      </header>
    </>
  );
};

export default HeaderNav;

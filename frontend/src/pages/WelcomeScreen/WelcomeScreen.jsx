import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/WelcomeScreen/WelcomeScreen.css";
import checkmark from "../../assets/img/checkmark.svg";

const WelcomeScreen = () => {
  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      nav("/signin");
    }, 3500);
  });

  return (
    <section className="welcome-grosShop">
      <div className="welcome-contentWrapper">
        <article className="welcome-svgBox">
          <img src={checkmark} alt="checkmark" />
        </article>
        <article className="welcome-textBox">
          <h1>Welcome Grosshop</h1>
          <h2>Successfully create your grosshop account</h2>
        </article>
      </div>
    </section>
  );
};

export default WelcomeScreen;

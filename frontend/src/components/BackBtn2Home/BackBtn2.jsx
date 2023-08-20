import "../BackBtn2Home/BackBtn2.css";
import btn from "../../assets/img/backBtn.svg";
import { useNavigate } from "react-router-dom";

const BackBtn2 = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/home");
  };

  return (
    <section className="backBtn2-section" onClick={navigateHome}>
      <img src={btn} alt="back-button" />
    </section>
  );
};

export default BackBtn2;

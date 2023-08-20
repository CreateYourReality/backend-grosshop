import "../BackBtn3OneBack/BackBtn3.css";
import btn from "../../assets/img/backBtn.svg";
import { useNavigate } from "react-router-dom";

const BackBtn3 = () => {
  const navigate = useNavigate();
  const navigateOneBack = () => {
    navigate(-1);
  };

  return (
    <section className="backBtn3-section" onClick={navigateOneBack}>
      <img src={btn} alt="back-button" />
    </section>
  );
};

export default BackBtn3;

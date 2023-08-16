import "../BackBtn/BackBtn.css";
import btn from "../../assets/img/backBtn.svg";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <section className="backBtn-section" onClick={navigateBack}>
      <img src={btn} alt="back-button" />
    </section>
  );
};

export default BackBtn;

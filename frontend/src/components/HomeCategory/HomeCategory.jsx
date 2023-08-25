import { categoryContext } from "../../context/Context";
import "./HomeCategory.css";
import { useContext } from "react";

import veggetableImg from "../../assets/img/catVegetable.svg";
import meatImg from "../../assets/img/catMeat.svg";
import animalImg from "../../assets/img/catFruits.svg";
import moreImg from "../../assets/img/catMore.svg";

import { Link } from "react-router-dom";

const HomeCategory = () => {
  const { setCategoryFilter } = useContext(categoryContext);

  return (
    <>
      <section className="home-category-section">
        <Link to="/productlist">
          <img
            onClick={() => setCategoryFilter("Vegetable")}
            src={veggetableImg}
            alt="vegetable"
          />
        </Link>
        <Link to="/productlist">
          <img
            onClick={() => setCategoryFilter("Meat")}
            src={meatImg}
            alt="meat"
          />
        </Link>
        <Link to="/productlist">
          <img
            onClick={() => setCategoryFilter("Animal")}
            src={animalImg}
            alt="animal"
          />
        </Link>
        <Link to="/productlist">
          <img
            onClick={() => setCategoryFilter("All")}
            src={moreImg}
            alt="more"
          />
        </Link>
      </section>
    </>
  );
};

export default HomeCategory;

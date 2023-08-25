import "./Filter.css";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import SelectSort from "../../components/SelectSort/SelectSort";
import SelectCategory from "../../components/SelectCategory/SelectCategory";
import SelectPriceRange from "../../components/SelectPriceRange/SelectPriceRange";
import {
  categoryContext,
  dataContext,
  priceContext,
  sortContext,
} from "../../context/Context";
import { useContext } from "react";
const Filter = () => {
  const { categoryFilter, setCategoryFilter } = useContext(categoryContext);
  const { priceFilter, setPriceFilter } = useContext(priceContext);
  const { sortBy, setSortBy } = useContext(sortContext);
  const { data, setData } = useContext(dataContext);

  //TODO REMOVE SORTBY FEHLT, SORT UNSORTED HINZUFÜGEN?

  //TODO KLICKE ICH AUF FILTER, WIRD DIE SORTIERUNG ZURÜCK GESETZT

  const removeAllFilter = () => {
    setCategoryFilter("All");
    setPriceFilter({ min: 0, max: Infinity });
    setSortBy("abc");
  };
  return (
    <>
      <main>
        <HeaderNav />
        <section className="clearAll-section">
          <button className="remove-filter-btn" onClick={removeAllFilter}>
            All clear
          </button>
        </section>
        <section className="filter-section">
          <h2>Sort by</h2>
          <SelectSort sortArray={data} setSortArray={setData} />
          <h2>Price</h2>
          <SelectPriceRange />
          <h2>Category</h2>
          <SelectCategory />
        </section>
      </main>
    </>
  );
};

export default Filter;

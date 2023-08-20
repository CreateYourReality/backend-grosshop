import "./Filter.css";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import SelectSort from "../../components/SelectSort/SelectSort"
import SelectCategory from "../../components/SelectCategory/SelectCategory"
import SelectPriceRange from "../../components/SelectPriceRange/SelectPriceRange"
import { categoryContext,dataContext,priceContext } from "../../context/Context";
import { useContext } from "react";
const Filter = () => {
  const {categoryFilter,setCategoryFilter} = useContext(categoryContext)
    const {priceFilter,setPriceFilter} = useContext(priceContext)
    const {data,setData} = useContext(dataContext)

    //TODO REMOVE SORTBY FEHLT, SORT UNSORTED HINZUFÜGEN?

    //TODO KLICKE ICH AUF FILTER, WIRD DIE SORTIERUNG ZURÜCK GESETZT

    const removeAllFilter = () => {
        setCategoryFilter("All");
        setPriceFilter({min:0,max:Infinity})
    }
    return ( 
        <>
            <main>
            <HeaderNav />
                <h2>Filter Page</h2>
                <section>
                    <SelectCategory/>
                    <SelectSort sortArray={data} setSortArray={setData}/>
                    <SelectPriceRange/>
                </section>
                <button onClick={removeAllFilter}>REMOVE ALL FILTER</button>
            </main>
        </>
     );
}
 
export default Filter;

import "./Filter.css";

import SelectSort from "../../components/SelectSort/SelectSort"
import SelectCategory from "../../components/SelectCategory/SelectCategory"
import SelectPriceRange from "../../components/SelectPriceRange/SelectPriceRange"
import { categoryContext,priceContext } from "../../context/Context";
import { useContext } from "react";

const Filter = () => {
    const {categoryFilter,setCategoryFilter} = useContext(categoryContext)
    const {priceFilter,setPriceFilter} = useContext(priceContext)

    //TODO REMOVE SORTBY FEHLT, SORT UNSORTED HINZUFÜGEN?

    const removeAllFilter = () => {
        setCategoryFilter("All");
        setPriceFilter({min:0,max:Infinity})
    }
    
    return ( 
        <>
            <main>
                <h2>Filter Page</h2>
                <section>
                    <SelectCategory/>
                    <SelectSort/>
                    <SelectPriceRange/>
                </section>
                <button onClick={removeAllFilter}>REMOVE ALL FILTER</button>

            </main>
        </>
     );
}
 
export default Filter;
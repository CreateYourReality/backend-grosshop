import { priceContext } from "../../context/Context";
import "./SelectPriceRange.css"
import { useContext, useState } from "react";
const SelectPriceRange = () => {

    const [priceRange, setPriceRange] = useState({min:0,max:9999})
    const {priceFilter,setPriceFilter} = useContext(priceContext)

    const handleMinPrice = (event) => {
        setPriceFilter({min:event.target.value,max:9999})
    }

    return (
        <>
        <section className="price-range-section">
            <p>{priceFilter.min}</p>
            <input step={1} onChange={handleMinPrice} type="Range" min={priceRange.min} max={priceRange.max}/>
            <p>{}</p>
        </section>
        </>
     );
}
 
export default SelectPriceRange;
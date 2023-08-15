import { priceContext } from "../../context/Context";
import "./SelectPriceRange.css"
import { useContext, useState } from "react";
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';

const SelectPriceRange = () => {
    const [priceRange, setPriceRange] = useState({min:0,max:999})
    const {priceFilter,setPriceFilter} = useContext(priceContext)

    const handleSliderChange = (values) => {
        setPriceFilter({min:values[0],max:values[1]});
  };

    return (
        <>
        <section className="price-range-section">
            <p>{priceFilter.min}</p>
            <Slider
                range
                min={priceRange.min}
                max={priceRange.max}
                value={[priceFilter.min, priceFilter.max]}
                onChange={handleSliderChange} //auf on apply ändern
                allowCross={false}
            />
            <p>{priceFilter.max}</p>
        </section>
        </>
     );
}
 
export default SelectPriceRange;
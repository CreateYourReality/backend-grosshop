import { useContext, useEffect, useState } from "react";
import "./SelectSort.css"
import { dataContext } from "../../context/Context";

const SelectSort = () => {
    const {data, setData} = useContext(dataContext)
    const [sortBy, setSortBy] = useState("abc")

    const sortAZ = (a, b) => a.productName.localeCompare(b.productName);
    const sortZA = (a, b) => b.productName.localeCompare(a.productName);
    const sortPriceLow = (a, b) => a.price - b.price;
    const sortPriceHigh = (a, b) => b.price - a.price;
    const sortRatingLow = (a, b) => a.rating - b.rating;
    const sortRatingHigh = (a, b) => b.rating - a.rating;

    const sortME = (sortType) => {
        let sortedArray = [...data];
        sortedArray = [...sortedArray].sort(getSortType(sortType));
        
      /*  filterArray.forEach(filter => {
            newArray = newArray.filter(filter);
        });*/
        setData(sortedArray);
    }

    const getSortType = (sortType) => {
        switch(sortType){
            case "abc": return sortAZ;break;
            case "cba": return sortZA;break;
            case "$": return sortPriceLow;break;
            case "$$$": return sortPriceHigh;break;
            case "***": return sortRatingHigh;break;
            case "*": return sortRatingLow;break;
            default : return;break;
        }
    }

    const changeSortBy = (event) => {
        setSortBy(event.target.value)
    }

    useEffect(() => {
        sortME(sortBy);
    },[sortBy])

    return ( 
        <>
            <select onChange={()=>changeSortBy(event)} name="select-sort" id="select-sort">
                <option value="abc">Name</option>
                <option value="cba">Name reverse</option>
                <option value="$">Preis : low</option>
                <option value="$$$">Preis : high</option>
                <option value="*">Bewertungen : low</option>
                <option value="***">Bewertungen : high</option>
            </select>
        </>
     );
}
 
export default SelectSort;
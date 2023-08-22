import { useContext, useEffect, useState } from "react";
import "./SelectSort.css"
import { sortContext } from "../../context/Context";

const SelectSort = ({sortArray,setSortArray}) => {
 //   const {data, setData} = useContext(dataContext)
 const {sortBy, setSortBy} = useContext(sortContext)
    
    const sortAZ = (a, b) => a.productName.localeCompare(b.productName);
    const sortZA = (a, b) => b.productName.localeCompare(a.productName);
    const sortPriceLow = (a, b) => a.price - b.price;
    const sortPriceHigh = (a, b) => b.price - a.price;
    const sortRatingLow = (a, b) => a.rating - b.rating;
    const sortRatingHigh = (a, b) => b.rating - a.rating;

    const sortME = (sortType) => {
        let sortedArray = [...sortArray];
        sortedArray = [...sortedArray].sort(getSortType(sortType));
        setSortArray(sortedArray);
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
        console.log(event.target.value);
        setSortBy(event.target.value)
    }

    const changeSortByBtns = (value) => {
        setSortBy(value)
    }

    useEffect(() => {
        sortME(sortBy);
    },[sortBy])

    return ( 
        <>
            <select value={sortBy} onChange={()=>changeSortBy(event)} name="select-sort" id="select-sort">
                <option value="abc">Name</option>
                <option value="cba">Name reverse</option>
                <option value="$">Preis : low</option>
                <option value="$$$">Preis : high</option>
                <option value="*">Bewertungen : low</option>
                <option value="***">Bewertungen : high</option>
            </select>

            <div className="sortBy-btns">
                <a onClick={()=>changeSortByBtns("abc")} >Name</a>
                <a onClick={()=>changeSortByBtns("cba")} >Name reverse</a>
                <a onClick={()=>changeSortByBtns("$")} >Preis : low</a>
                <a onClick={()=>changeSortByBtns("$$$")} >Preis : high</a>
                <a onClick={()=>changeSortByBtns("*")}> Bewertungen : low</a>
                <a onClick={()=>changeSortByBtns("***")} >Bewertungen : high</a>
            </div>
            
        </>
     );
}
 
export default SelectSort;
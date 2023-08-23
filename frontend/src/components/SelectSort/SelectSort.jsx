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
            case "zyx": return sortZA;break;
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

    const changeSortByBtns = (value) => {
        setSortBy(value)
    }

    useEffect(() => {
        sortME(sortBy);
    },[sortBy])

    return ( 
        <>
            <select value={sortBy} onChange={()=>changeSortBy(event)} name="select-sort" id="select-sort">
                <option value="abc">ABC</option>
                <option value="zyx">ZYX</option>
                <option value="$">LOW</option>
                <option value="$$$">HIGH</option>
                <option value="*">LOW</option>
                <option value="***">HIGH</option>
            </select>

            <div className="sortBy-btns">
                <a className={`filter-btn ${sortBy=="abc"?"active-filter":""}`} onClick={()=>changeSortByBtns("abc")} >ABC</a>
                <a className={`filter-btn ${sortBy=="zyx"?"active-filter":""}`} onClick={()=>changeSortByBtns("zyx")} >ZYX</a>
                <a className={`filter-btn ${sortBy=="$"?"active-filter":""}`} onClick={()=>changeSortByBtns("$")} >LOW</a>
                <a className={`filter-btn ${sortBy=="$$$"?"active-filter":""}`} onClick={()=>changeSortByBtns("$$$")} >HIGH</a>
                <a className={`filter-btn ${sortBy=="*"?"active-filter":""}`} onClick={()=>changeSortByBtns("*")}>WORST</a>
                <a className={`filter-btn ${sortBy=="***"?"active-filter":""}`} onClick={()=>changeSortByBtns("***")} >BEST</a>
            </div>
            
        </>
     );
}
 
export default SelectSort;
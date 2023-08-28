import { useContext, useEffect, useState } from "react";
import "./SelectSort.css"
import { dataContext, sortContext } from "../../context/Context";
import { useLocation } from "react-router-dom";
import { sortFavsContext, sortCartContext } from "../../context/Context";
import SelectSortType from "./SelectSortType/SelectSortType";

const SelectSort = ({sortArray,setSortArray}) => {
 //   const {data, setData} = useContext(dataContext)
 const {sortBy, setSortBy} = useContext(sortContext)
 const {sortByFavs,setSortByFavs} = useContext(sortFavsContext)
 const location = useLocation();
 const {data} = useContext(dataContext)
 const {sortByCart, setSortByCart} = useContext(sortCartContext)
    
    const sortAZ = (a, b) => a.productName.localeCompare(b.productName);

    const sortAZalt = (aId, bId) => {
        const aIndex = data.findIndex(fav => fav._id === aId._id);
        const bIndex = data.findIndex(fav => fav._id === bId._id); 
        const aProduct = data[aIndex];
        const bProduct = data[bIndex]; 
        
        if (aProduct && bProduct) {
            return aProduct.productName.localeCompare(bProduct.productName);
        }
    };

    const sortZA = (a, b) => b.productName.localeCompare(a.productName);

    const sortZAalt = (aId, bId) => {
        const aIndex = data.findIndex(fav => fav._id === aId._id);
        const bIndex = data.findIndex(fav => fav._id === bId._id); 
        const aProduct = data[aIndex];
        const bProduct = data[bIndex];  
        if (aProduct && bProduct) {
            return bProduct.productName.localeCompare(aProduct.productName);
        }
    };

    const sortPriceLow = (a, b) => a.price - b.price;

    const sortPriceLowalt = (aId, bId) => {
        const aIndex = data.findIndex(fav => fav._id === aId._id);
        const bIndex = data.findIndex(fav => fav._id === bId._id); 
        const aProduct = data[aIndex];
        const bProduct = data[bIndex];  
        if (aProduct && bProduct) {
            return aProduct.price - bProduct.price;
        }
    };

    const sortPriceHigh = (a, b) => b.price - a.price;

    const sortPriceHighalt = (aId, bId) => {
        const aIndex = data.findIndex(fav => fav._id === aId._id);
        const bIndex = data.findIndex(fav => fav._id === bId._id); 
        const aProduct = data[aIndex];
        const bProduct = data[bIndex]; 
        if (aProduct && bProduct) {
            return bProduct.price - aProduct.price;
        }
    };

    const sortRatingLow = (a, b) => a.rating - b.rating;

    const sortRatingLowalt = (aId, bId) => {
        const aIndex = data.findIndex(fav => fav._id === aId._id);
        const bIndex = data.findIndex(fav => fav._id === bId._id); 
        const aProduct = data[aIndex];
        const bProduct = data[bIndex]; 
        if (aProduct && bProduct) {
            return aProduct.rating - bProduct.rating;
        }
    };

    const sortRatingHigh = (a, b) => b.rating - a.rating;

    const sortRatingHighalt = (aId, bId) => {
        const aIndex = data.findIndex(fav => fav._id === aId._id);
        const bIndex = data.findIndex(fav => fav._id === bId._id); 
        const aProduct = data[aIndex];
        const bProduct = data[bIndex];  
        if (aProduct && bProduct) {
            return bProduct.rating - aProduct.rating;
        }
    };

    const sortME = (sortType) => {
        let sortedArray = [...sortArray];
        sortedArray = [...sortedArray].sort(getSortType(sortType));
        setSortArray(sortedArray);
    }

    const sortMEalt = (sortType) => {
        const matchingItems = data.filter(item =>
            sortArray.some(sortItem => sortItem.id == item._id)
        );
    
        let sortedArray = matchingItems.map(item => {
            const correspondingSortItem = sortArray.find(sortItem => sortItem.id == item._id);
            return { ...item, id: correspondingSortItem.id, amount: correspondingSortItem.amount };
        });
    
        sortedArray.sort(getSortType(sortType));
        
        setSortArray(sortedArray);
    };
    const mySortArray = ["Abc", "Zyx", "Low", "High", "Best", "Worst"]
    const getSortType = (sortType) => {
        if(location.pathname=="/filter"){

        switch(sortType){
            case "Abc": return sortAZ;break;
            case "Zxy": return sortZA;break;
            case "Low": return sortPriceLow;break;
            case "High": return sortPriceHigh;break;
            case "Best": return sortRatingHigh;break;
            case "Worst": return sortRatingLow;break;
            default : return;break;
        }
    } else {
        switch(sortType){
            case "Abc": return sortAZalt;break;
            case "Zxy": return sortZAalt;break;
            case "Low": return sortPriceLowalt;break;
            case "High": return sortPriceHighalt;break;
            case "Best": return sortRatingHighalt;break;
            case "Worst": return sortRatingLowalt;break;
            default : return;break;
        }
    }
    }

    const changeSortBy = (event) => {
        location.pathname=="/favorites"?
            setSortByFavs(event.target.value)
            :location.pathname=="/shoppingcart"?
                setSortByCart(event.target.value)
                :setSortBy(event.target.value)
    }

    const changeSortByBtns = (value) => {
        setSortBy(value)
    }

    useEffect(() => {
        location.pathname=="/filter"?    
            sortME(sortBy)
            :location.pathname=="/shoppingcart"?
                sortMEalt(sortByCart)
                :sortMEalt(sortByFavs)
    },[sortBy,sortByFavs, sortByCart])


    return ( 
        <>
        {location.pathname == "/filter"?

         <div className="sortBy-btns">
                <a className={`filter-btn ${sortBy=="Abc"?"active-filter":""}`} onClick={()=>changeSortByBtns("Abc")} >Abc</a>
                <a className={`filter-btn ${sortBy=="Zxy"?"active-filter":""}`} onClick={()=>changeSortByBtns("Zxy")} >Zxy</a>
                <a className={`filter-btn ${sortBy=="Low"?"active-filter":""}`} onClick={()=>changeSortByBtns("Low")} >Low</a>
                <a className={`filter-btn ${sortBy=="High"?"active-filter":""}`} onClick={()=>changeSortByBtns("High")} >High</a>
                <a className={`filter-btn ${sortBy=="Worst"?"active-filter":""}`} onClick={()=>changeSortByBtns("Worst")}>Worst</a>
                <a className={`filter-btn ${sortBy=="Best"?"active-filter":""}`} onClick={()=>changeSortByBtns("Best")} >Best</a>
            </div>
            :location.pathname=="/shoppingcart"?
            <SelectSortType mySortArray={mySortArray} sortBy={sortByCart} setSortBy={setSortByCart}/>:
            <SelectSortType mySortArray={mySortArray} sortBy={sortByFavs} setSortBy={setSortByFavs}/>
/*             <select value={location.pathname=="/favorites"?sortByFavs:location.pathname=="/shoppingcart"?sortByCart:sortBy} onChange={()=>changeSortBy(event)} name="select-sort" id="select-sort">
                <option value="abc">ABC</option>
                <option value="zyx">ZYX</option>
                <option value="$">LOW</option>
                <option value="$$$">HIGH</option>
                <option value="*">WORST</option>
                <option value="***">BEST</option>
            </select>
            </> */
            }
        </>
     );
}
 
export default SelectSort;
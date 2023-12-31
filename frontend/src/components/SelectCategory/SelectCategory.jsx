import "./SelectCategory.css"
import { useContext, useEffect, useState } from "react"
import { categoryContext } from "../../context/Context"

const SelectCategory = () => {
    const {categoryFilter, setCategoryFilter} = useContext(categoryContext)

    const categoryList = ["All","Meat","Fruits","Vegetables","Seafood","Bread","MilkEgg"]

    const selectCategory = (event) => {
        setCategoryFilter(event.target.text == "Milk & Egg"?"MilkEgg":event.target.text)
    }

    useEffect(() => {
    },[categoryFilter])

    return (  
        <>
            <section className={`category-section`}>
                {categoryList?.map((category,index) => {
                   return <a className={`${location.pathname == "/filter"?"filter-btn":""} ${category==categoryFilter?
                    location.pathname == "/filter"?
                        "active-filter"
                        :"active"
                    : null}`} onClick={selectCategory} key={index}>{category=="MilkEgg"?"Milk & Egg":category}</a>
                })}
            </section>
        </>
    );
}
 
export default SelectCategory;
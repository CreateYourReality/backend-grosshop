import "./SelectCategory.css"
import { useContext, useEffect, useState } from "react"
import { categoryContext } from "../../context/Context"

const SelectCategory = () => {
    const {categoryFilter, setCategoryFilter} = useContext(categoryContext)

    const categoryList = ["All","Meat","Animal","Vegetable","Legume","Drupe","Herbs"]

    const selectCategory = (event) => {
        setCategoryFilter(event.target.text)
    }

    useEffect(() => {
    },[categoryFilter])

    return (  
        <>
            <section className="category-section">
                {categoryList?.map((category,index) => {
                   return <a onClick={selectCategory} key={index} href="#">{category}</a>
                })}
            </section>
        </>
    );
}
 
export default SelectCategory;
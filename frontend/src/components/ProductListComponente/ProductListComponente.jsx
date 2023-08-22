import "./ProductListComponente.css"
import { useContext, useEffect, useState } from "react";
import { categoryContext, dataContext,priceContext } from "../../context/Context";
import ProductCard from "../ProductCard/ProductCard";

import deals from "../../assets/img/deals.png"


const ProductListComponente = () => {
    const {data} = useContext(dataContext)
    const {categoryFilter} = useContext(categoryContext)
    const {priceFilter} = useContext(priceContext)
    const [filteredData,setFilteredData] = useState(data)

    useEffect(() => {
        let newFilteredData = data;
        if(categoryFilter != "All"){
            const filteredByCategory =  newFilteredData.filter(filtered => filtered.category == categoryFilter)
            newFilteredData = filteredByCategory;
        }
            const filteredByPrice = newFilteredData.filter(filtered => 
                filtered.price >= priceFilter.min && 
                filtered.price <= priceFilter.max
            )

            newFilteredData = filteredByPrice
            setFilteredData(newFilteredData)
        
    },[data,categoryFilter,priceFilter])


    return ( 
        <>
            {location.pathname == "/home"?<h2 className="groceryDeal">Today Grocery Deals</h2>:""}
            <section className="product-list deal-list">
    {data ? (
        data.length > 0 ? (
            <>
                {data
                    .filter(product => product.price > 0) //TODO isDeal
                    .slice(0, 6)
                    .map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                <img className="deals-img" src={deals} alt="deals img" />
            </>
        ) : (
            <p>No products with deals tag found.</p>
        )
    ) : (
        <p>Fetching data...</p>
    )}
</section>
            <section className="product-list">
              {data? 
                filteredData.map((product,index) => {
                    return(
                        <ProductCard key={index} product={product}/>
                    )
                })
                : <p>fetch data...</p>
            }
            </section>
        </>
     );
}
 
export default ProductListComponente;
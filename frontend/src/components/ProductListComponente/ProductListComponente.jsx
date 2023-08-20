import "./ProductListComponente.css"
import { useContext, useEffect, useState } from "react";
import { categoryContext, dataContext,priceContext } from "../../context/Context";
import ProductCard from "../ProductCard/ProductCard";




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
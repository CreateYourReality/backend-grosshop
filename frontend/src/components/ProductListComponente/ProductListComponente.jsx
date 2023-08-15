import "./ProductListComponente.css"
import { useContext, useEffect, useState } from "react";
import { categoryContext, dataContext } from "../../context/Context";
import SelectSort from "../SelectSort/SelectSort";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import SelectCategory from "../SelectCategory/SelectCategory";

const ProductListComponente = () => {
    const {data} = useContext(dataContext)
    const {categoryFilter} = useContext(categoryContext)
    const {priceFilter} = useContext(priceContext)
    const [filteredData,setFilteredData] = useState(data)

    useEffect(() => {
        if(categoryFilter == "All")
            setFilteredData(data)
        else{
            const filteredByCategory =  data.filter(filtered => filtered.category == categoryFilter)
            setFilteredData(filteredByCategory)
        }
    },[data,categoryFilter])


    return ( 
        <>
            <SelectCategory/>
            <SelectSort/>
            <section className="product-list">
              {data? 
                filteredData.map((product,index) => {
                    return(
                        <Link key={index} to={"/detailproduct/"+product._id}>
                            <ProductCard product={product}/>
                        </Link>
                    )
                })
                : <p>fetch data...</p>
            }
            </section>
        </>
     );
}
 
export default ProductListComponente;
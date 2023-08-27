import "./ProductListComponente.css"
import { useContext, useEffect, useState } from "react";
import { categoryContext, dataContext,favoritesContext,priceContext } from "../../context/Context";
import ProductCard from "../ProductCard/ProductCard";

import deals from "../../assets/img/deals.png"
import deals2 from "../../assets/img/deals2.png"
import { UserContext } from "../../context/UserContext";
import { searchContext } from "../../context/Context";


const ProductListComponente = () => {
    const {data} = useContext(dataContext)
    const {categoryFilter} = useContext(categoryContext)
    const {priceFilter} = useContext(priceContext)
    const [filteredData,setFilteredData] = useState(data)
    const {user, refetch} = useContext(UserContext)
    const {setFavorites} = useContext(favoritesContext)
    const {searchfield, setSearchfield} = useContext(searchContext)

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

    useEffect(()=>{
        refetch()
        if (user) {
          setFavorites(user.favProducts)
        }
      },[]) 

    return ( 
        <>
            {location.pathname == "/home" ?<h2 className="groceryDeal">Today Grocery Deals</h2>:""}
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
                {location.pathname == "/home" ?
                    <img className="deals-img" src={deals} alt="deals img" />
                    :<img className="deals-img" src={deals2} alt="deals2 img" />
                }
            </>
        ) : (
            <p>No products with deals tag found.</p>
        )
    ) : (
        <p>Fetching data...</p>
    )}
</section>


{location.pathname == "/home" ?<h2 className="groceryDeal">Today Grocery Member Deals</h2>:""}
            <section className="product-list deal-list">
    {data && location.pathname == "/home"? (
        data.length > 0 ? (
            <>
                {data
                    .filter(product => product.price > 0) //TODO isMemberDeal
                    .slice(0, 3)
                    .map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
            </>
        ) : (
            <p>No products with member deals tag found.</p>
        )
    ) : (
        location.pathname == "/home"?<p>Fetching data...</p>:""
    )}
</section>

            <section className="product-list">
              {data && location.pathname == "/productlist"? 
             //   filteredData.filter(filtered => filtered.prodctName.includes(searchfield)).map((product,index) => {
              //      return(
              //          <ProductCard key={index} product={product}/>
             //       )
           //     })
           filteredData
           .filter(filtered => filtered.productName.toLowerCase().includes(searchfield))
           .map((product, index) => (
               <ProductCard key={index} product={product} />
           ))
               : <p>fetch data...</p>

    
           }
            </section>
        </>
     );
}
 
export default ProductListComponente;
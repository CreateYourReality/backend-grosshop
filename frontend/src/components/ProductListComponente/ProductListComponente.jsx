import "./ProductListComponente.css"
import { useContext, useEffect } from "react";
import { dataContext } from "../../context/Context";
import SelectSort from "../SelectSort/SelectSort";
import { Link } from "react-router-dom";

const ProductListComponente = () => {
    const {data} = useContext(dataContext)

    useEffect(() => {
        console.log(data);
    },[data])


    return ( 
        <>
            <SelectSort/>
            <section className="product-list">
              {data? 
                data.map((product,index) => {
                    return(
                        <Link key={index} to={"/detailproduct/"+product._id}>
                        <article className="product-article">
                            <h3>{product.productName}</h3>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                        </article>
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
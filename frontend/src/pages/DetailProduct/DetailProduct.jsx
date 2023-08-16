import { useContext } from "react";
import "./DetailProduct.css"
import { dataContext } from "../../context/Context";
import { useLocation } from "react-router-dom";
const DetailProduct = () => {
    const {data} = useContext(dataContext)
    const location = useLocation();
    const pathProductID = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

    const findProductById = () => {
        return data.find(product => product._id === pathProductID);
    };

    const product = findProductById();

    return ( 
        <>        
            <main>
                <h2>DETAIL PRODUCT PAGE</h2>
                <section className="detailProduct-section">
                    {product?
                        <>
                            <p className="detailProduct-price">${product.price}</p>
                            <p className="detailProduct-name">{product.productName}</p>
                            <p className="detailProduct-rating">*{product.rating}</p> 
                            <div className="detailProduct-div">
                                
                            </div>
                        </>
                    : null} 
                </section>
            </main>
        </>
     );
}
 
export default DetailProduct;
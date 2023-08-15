import "./ProductCard.css"
const ProductCard = ({product}) => {
    return ( 
        <>
         <article className="product-article">
            <h3>{product.productName}</h3>
            <p>{product.price}$</p>
            <p>{product.rating}*</p>
          </article>
        </>
     );
}
 
export default ProductCard;
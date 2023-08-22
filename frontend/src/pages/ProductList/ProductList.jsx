import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ProductListComponente from "../../components/ProductListComponente/ProductListComponente";
import SelectCategory from "../../components/SelectCategory/SelectCategory";
import "./ProductList.css";
const ProductList = () => {
  return (
    <>
      <main>
        <HeaderNav />
        <h2>Product List Page</h2>
        <SelectCategory/>
        <ProductListComponente/>
      </main>x
        <FooterNav/>
    </>
  );
};

export default ProductList;

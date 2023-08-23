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
        <SelectCategory/>
        <ProductListComponente/>
      </main>
        <FooterNav/>
    </>
  );
};

export default ProductList;

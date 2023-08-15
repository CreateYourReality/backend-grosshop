import "./Home.css"
import { Link } from "react-router-dom";

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ProductListComponente from "../../components/ProductListComponente/ProductListComponente";

const Home = () => {
    return ( 
        <>
            <HeaderNav/>
            <main>
            <h2>Home Page</h2>
              <ProductListComponente/>
                <Link to="/productlist">Productlist</Link>
                <Link to="/detailproduct/1">Detailproduct ID 1</Link>
            </main>
            <FooterNav/>
        </>
     );
}
 
export default Home;
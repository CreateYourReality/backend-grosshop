import "./Home.css"
import { Link } from "react-router-dom";

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { useContext } from "react";
import { dataContext } from "../../context/Context";

const Home = () => {
    const {data} = useContext(dataContext)
    return ( 
        <>
            <HeaderNav/>
            <main>
                {data.data? 
                data.data.map((product,index) => {
                    return(
                        <article key={index}>
                            <h3>{product.productName}</h3>
                        </article>
                    )
                })
                : <p>fetch data...</p>
            }
                <h2>Home Page</h2>
                <Link to="/productlist">Productlist</Link>
                <Link to="/detailproduct/1">Detailproduct ID 1</Link>
            </main>
            <FooterNav/>
        </>
     );
}
 
export default Home;
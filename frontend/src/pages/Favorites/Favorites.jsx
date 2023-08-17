import "./Favorites.css"

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { dataContext, favoritesContext } from "../../context/Context";
import { useContext } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

const Favorites = () => {
    const {favorites, setFavorites} = useContext(favoritesContext)
    const {data} = useContext(dataContext)

    const findFavoriteById = (favID) => {
        return data.find(favoriteItem => favoriteItem._id === favID);
    };

    return ( 
        <>
            <HeaderNav/>
            <main>
                <h2>Favorites Page</h2>
                <section className="favorites-section">
                {favorites? 
                    favorites.length != 0 ? (
                    <>
                        {favorites.map((fav,index) => (
                                <article key={index}>
                                    {<ProductCard setFavorites={setFavorites} product={findFavoriteById(fav.id)}/>}
                                </article>
                            )
                        )}
                        <button>ADD TO CART</button>
                        </>
                        )

                        : (
                            <>
                                <h3>NO FAVORITES IMG</h3>
                                <button>Continue Shopping</button>
                            </>
                        )
                    : <p>loading favorites...</p>
                }
                </section>
            </main>
            <FooterNav/>
        </> 
    );
}
 
export default Favorites;
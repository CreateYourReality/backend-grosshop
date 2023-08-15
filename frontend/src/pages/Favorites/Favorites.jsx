import "./Favorites.css"

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { favoritesContext } from "../../context/Context";
import { useContext } from "react";

const Favorites = () => {
    const {favorites, setFavorites} = useContext(favoritesContext)
    return ( 
        <>
            <HeaderNav/>
            <main>
                <h2>Favorites Page</h2>
                <section className="favorites-section">
                {favorites? (
                    favorites.length != 0 ? (
                        favorites.map((fav,index) => {
                            <article key={index}>
                                <h2>{fav}</h2>
                            </article>
                        })) : <h3>NO FAVORITES IMG</h3>
                    ) : <p>loading favorites...</p>
                }
                </section>
            </main>
            <FooterNav/>
        </> 
    );
}
 
export default Favorites;
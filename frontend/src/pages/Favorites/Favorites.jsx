import "./Favorites.css"

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import { dataContext, favoritesContext } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

const Favorites = () => {
    const {data} = useContext(dataContext)
    const {favorites, setFavorites} = useContext(favoritesContext)
    const [selectedFavs, setSelectedFavs] = useState([])

    const findFavoriteById = (favID) => {
        return data.find(favoriteItem => favoriteItem._id === favID);
    };

    //TODO GEHT,ABER CHECKBOX IS DANACH FALSCH
    const deleteSelectedFavs = () => {
        let updatedFavorites = [...favorites];
        selectedFavs.forEach(id => {
            updatedFavorites = updatedFavorites.filter(fav => fav.id !== id);
        });
        setFavorites(updatedFavorites);
        setSelectedFavs([])
    }

    useEffect(()=>{
    },[selectedFavs])

    return ( 
        <>
            <HeaderNav/>
            <main>
                <h2>Favorites Page</h2>
                <section className="favorites-section">
                        <a onClick={deleteSelectedFavs}>DELETE</a>
                    {favorites? 
                        favorites.length != 0 ? (
                            <>
                                {favorites.map((fav,index) => (
                                    <article key={index}>
                                        {<ProductCard setSelectedFavs={setSelectedFavs} setFavorites={setFavorites} product={findFavoriteById(fav.id)}/>}
                                    </article> 
                                    )
                                )}
                                <button>ADD TO CART</button>
                            </>
                            ) : (
                            <>
                                <h3>NO FAVORITES IMG</h3>
                                <button>Continue Shopping</button>
                            </>
                        ) : <p>loading favorites...</p>
                    }
                </section>
            </main>
            <FooterNav/>
        </> 
    );
}
 
export default Favorites;
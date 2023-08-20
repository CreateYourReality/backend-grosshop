import "./SplashScreen.css"
import logo from "../../assets/img/Logo.svg";
import { loadingContext,dataContext } from "../../context/Context";
import { useContext } from "react";
import  axios from "axios"
import { useEffect } from "react";

const SplashScreen = () => {
    const { setLoading } = useContext(loadingContext);
    const { setData } = useContext(dataContext);

    useEffect(() => {
        const fetchData = async () => {
            const newData = await axios.get("/api/products")
            setData(newData.data)
        }

        fetchData();
	}, []);

    const DeactivateLoading = () => {
		setTimeout(stopLoading, 4100);
	};

	const stopLoading = () => {
		setLoading(false);
	};

	DeactivateLoading();

    
    return ( 
        <>
        <section className="loading-section">
            <article className="logo-container">
                <img src={logo} alt="logo" />
                <div className="custom-loader"></div>
            </article>
        </section>
        </>
     );
}
 
export default SplashScreen;
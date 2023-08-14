import "./SplashScreen.css"

import { loadingContext,dataContext } from "../../context/Context";
import { useContext } from "react";
import  axios from "axios"
import { useEffect } from "react";

const SplashScreen = () => {
    const { setLoading } = useContext(loadingContext);
    const { setData } = useContext(dataContext);

    useEffect(() => {
        const fetchData = async () => {
            const newData = await axios.get("http://localhost:3001/api/products")
            setData(newData)
        }

        fetchData();
	}, []);

    const DeactivateLoading = () => {
		setTimeout(stopLoading, 2500);
	};

	const stopLoading = () => {
		setLoading(false);
	};

	DeactivateLoading();

    
    return ( 
        <>
            <main>
                <h2>SPLASH SCREEN PAGE</h2>
            </main>
        </>
     );
}
 
export default SplashScreen;
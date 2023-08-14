import "./Welcome.css"
import { Link } from "react-router-dom";
const Welcome = () => {
    return ( 
        <>
            <main>
                <h2>Welcome Page</h2>
                <Link to="/home">Wach as Guest</Link>
                <Link to="/signup">Sign up</Link>
            </main>
        </>
     );
}
 
export default Welcome;
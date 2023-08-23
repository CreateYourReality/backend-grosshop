import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";

import "./Resetpassword.css"
import RequestReset from "../../components/Resetpassword/RequestReset/RequestReset";
import ConfirmReset from "../../components/Resetpassword/ConfirmReset/ConfirmReset";


const Resetpassword = () => {
    const [params] = useSearchParams();
  
    const id = params.get("id")
    const token = params.get("token")

    const isRequest = !token && !id
    
    return isRequest ? ( 
        <RequestReset />
     ) : (<ConfirmReset id={id} token={token}/>);
}
 
export default Resetpassword;
import { useContext } from "react";
import { PageCtx } from "../../context/PageContext";

function Logout(){

    const {logoutHandler : logout}= useContext(PageCtx)

    function logoutHandler(){
        logout();
    }

    return(
        <>
            <button onClick={logoutHandler}>Logout</button>
        </>
    )
}
export default Logout;
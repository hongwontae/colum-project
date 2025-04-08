import { useContext } from "react";
import { PageCtx } from "../../context/PageContext";

function Logout(){

    const {setUserInfo}= useContext(PageCtx)

    async function logoutHandler(){
        const response  = await fetch('http://localhost:3000/user/logout', {
            method : 'POST',
            credentials : 'include'
        });
        console.log(await response.json());
        setUserInfo(null);
    }

    return(
        <>
            <button onClick={logoutHandler}>Logout</button>
        </>
    )
}
export default Logout;
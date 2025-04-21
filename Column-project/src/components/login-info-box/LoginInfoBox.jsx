import { userStore } from "../../zustand-store/user-store";

function LoginInfoBox(){


    const userInfo = userStore(state=>state.userState)

    return(
        <>
        {userInfo?.role ? <>
        
        <div className="absolute right-4 top-1/2 text-[1.1rem] text-white border-[1px] rounded-lg p-2 font-bold">
            <p>Email : {userInfo?.email} - </p>
            <p>Role : {userInfo?.role}</p>
        </div>
        
        </> : null};
        </>
    )   
}

export default LoginInfoBox;
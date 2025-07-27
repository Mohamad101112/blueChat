import { useState } from "react";

export function NavBar(props){
    const {setIsAuthenticating} = props;
    return(
        <div className="navContainer">
            <div className="nav">
                <h1>BlueChat</h1>
                <button 
                className="loginCta"
                onClick={() => { setIsAuthenticating(true)}}
                >Login/SignUp</button>
            </div>
        </div>
    ) 
}
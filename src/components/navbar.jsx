import { useState } from "react";

export function NavBar(props){
    const {setPage} = props;
    return(
        <div className="navContainer">
            <div className="nav">
                <h1>BlueChat</h1>
                <button 
                className="loginCta"
                onClick={() => { setPage("login")}}
                >Login/SignUp</button>
            </div>
        </div>
    ) 
}
import { sendPasswordResetEmail } from "firebase/auth";
import {useState} from "react";
import { auth } from "../firebase";


export function ResetForm1() {
  const [isLoading,setIsLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [error,setError] = useState("");
  const [isEmailSent,setIsEmailSent] = useState(false);


  async function handleSubmit() {
    setError("");

    if(!email.includes('@')){
        return;
    }

    if(isLoading){
        return;
    }


    try {
        await sendPasswordResetEmail(auth,email);
        setIsEmailSent(true);
    } catch (error) {
        setError(error);
    }
  }

    return(
    <div className="loginSection">

         {isEmailSent ?  
    <p  className="emailSentMsg">
      Password reset email sent!
      Please check your inbox before logging in or re-sign up.
    </p>:(<>

    <div className="loginCard">
        <h1>Reset password</h1>

        <h4>Please use an email you already signed up with</h4>

        <p>{error}</p>

      <input 
      type="email"
      name=""
      id="email"
      className="email"
      placeholder="Enter email address"
      onChange={(e)=>{setEmail(e.target.value)}}
      />

      <button 
      className="submit"
      onClick={handleSubmit}
      >
        {isLoading ? 'loading...':'Submit'}
      </button>
    </div>
      </>
    )}
    </div>
      )
    
}
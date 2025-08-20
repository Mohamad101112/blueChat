import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import {useState} from "react";
import { auth } from "../firebase";



export function LoginWithEmailCard({setPage,setIsLoggedIn,setStopLogin}) {
  const [isRegistration,setIsRegistration] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [isEmailSent,setIsEmailSent] = useState(false);

  // here we are going to handle login and signup and sending vertification
  
  
  async function handleAuthenticate() {
    setStopLogin(true);
    setError("")
    if(!email.includes('@')){
      return;
    }

    if(password.length < 6) {
      return;
    }
    
   if(isRegistration) {
     try {
          setIsLoading(true);
          const userCredential = await createUserWithEmailAndPassword(auth,email,password);
          await sendEmailVerification(userCredential.user);
          await auth.signOut();
          setIsEmailSent(true);

        } catch (error) {

          console.log(error)
          if (error.message === "Firebase: Error (auth/email-already-in-use)."){
            
            try {
              setStopLogin(true);
            const existingUserCredential = await signInWithEmailAndPassword(auth, email, password);
            
            if (!existingUserCredential.user.emailVerified) {
              await sendEmailVerification(existingUserCredential.user);
              setIsEmailSent(true);
            }else{
              setError(error.message)
              console.log('hi',error.message)
            }
            
            await auth.signOut();
          } catch (innerError) {
            setError(innerError.message);
          }
          }
          else{
            setError(error.message)
          }

            
          } finally{
            setIsLoading(false)
            console.log('finally runs')
            return;
          }
          }else{ 
            try {
          
              setIsLoading(true)
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
          
            if (!userCredential.user.emailVerified) {
                await auth.signOut();
                setError(`Please verify your email before logging in. Note:
      if you cant find the verification email or its expired ,
      you can re-send it by signing up again with your email and original password 
      you used / if you cant remember the password,reset your password and re-sign up to get the verification link.`);
            return
          }
            setIsLoggedIn(true);


        } catch (error) {
          setError(error.message);      
        } finally{
          setIsLoading(false);
          return;
        }
      }
  }


 
  return(
    <div className="loginSection">
    {isEmailSent ?  
    <p  className="emailSentMsg">
      Verification email sent!
      Please check your inbox before logging in.
    </p>:(
      <>

    <div className="backContainer">
        <button 
        className="back"
        onClick={()=>{setPage("Home")}}
        >
          Back
        </button>
      </div>

    <div className="loginCard">
    <h1>{isRegistration? 'Sign Up':'Login'}</h1>

        <div className="error">{error === 'Firebase: Error (auth/invalid-credential).' ? (
          <div>
            <p>{error}</p>

          <button 
          onClick={()=>{
            window.location.href = '/?page=reset-password'
          }}
          className="switchLoginSignup">Forgot Password?</button>
          </div>

        ): error}</div>


      <input 
      type="email"
      name=""
      id="email"
      className="email"
      placeholder="Enter email address"
      onChange={(e)=>{setEmail(e.target.value)}}
      />

      <input 
      type="password" 
      name="" 
      id="" 
      className="password"
      placeholder="Enter Password" 
      onChange={(e)=>{setPassword(e.target.value)}}
      />

      <button 
      className="submit"
      onClick={handleAuthenticate}
      >
        {isLoading ? 'loading...': isRegistration ? 'Sign Up':'Login'}
      </button>

      <p>already have an account? 
        <button 
        className="switchLoginSignup"
        onClick={()=>{setIsRegistration(!isRegistration)}}
        >
          {!isRegistration? 'Sign Up':'Login'}
        </button>
        </p>

        {!isRegistration &&  (<div>
          <hr />
          <button 
          onClick={()=>{
            window.location.href = '/?page=reset-password'
          }}
          className="switchLoginSignup">Forgot Password?</button>
        </div>)
        }

    </div>
  </> ) }
      
    </div>
  )
}

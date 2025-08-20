import { useEffect, useState } from 'react'
import { LoginCard } from './components/login'
import { NavBar } from './components/navbar';
import { Hero } from './components/Header';
import {LoginWithEmailCard} from './components/loginEmail'
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Chat } from './components/chat';
import { ResetForm1 } from './pages/reset-password';

// import { MagicCardDemo } from './components/loginEmail';




function App() {
  const [page , setPage] =  useState("Home");
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [stopLogin,setStopLogin] = useState(false);
  const [isUserNameSet , setIsUserNameSet] = useState(false);
  

  const url = new URL(window.location.href);
  let pages = url.searchParams.get('page');
  // let x = url.searchParams.get('x');

  console.log(window.location.href);

  

// here onAuthStateChanged will update global states

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if(user && user.emailVerified && !stopLogin) {
      setIsLoggedIn(true);
      // Don't sign out here - user should stay logged in
    }
  });
  
  return () => unsubscribe(); // Cleanup listener
}, [stopLogin]);


  if(pages === 'reset-password'){
    return(
      <ResetForm1 />
        )
  }

  return (
    (isLoggedIn ? 
      <Chat 
      setIsLoggedIn={setIsLoggedIn}
      isUserNameSet={isUserNameSet}
      setIsUserNameSet={setIsUserNameSet}
      />
      :
      (page != "Home" ? 
        
          // <MagicCardDemo >hello</MagicCardDemo>
        <LoginWithEmailCard 
        setPage={setPage}
        setIsLoggedIn={setIsLoggedIn}
        setStopLogin={setStopLogin}/>
        :
        <>
          <NavBar setPage={setPage} />
          <Hero setPage={setPage} />
        </>
      )
     )
    
    )
}

export default App

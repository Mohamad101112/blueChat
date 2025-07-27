import { useState } from 'react'
import { LoginCard } from './components/login'
import { NavBar } from './components/navbar';
import { Hero } from './components/Header';



function App() {
  const [isAuthenticating , setIsAuthenticating] =  useState(false);
  const [isLoggedIn , setIsLoggedIn] = useState(false);


  return (
    (isLoggedIn ? 
      <Chat />
      :
      (isAuthenticating ? 
        <LoginCard setIsAuthenticating={setIsAuthenticating}/>
        :
        <>
          <NavBar setIsAuthenticating={setIsAuthenticating} />
          <Hero setIsAuthenticating={setIsAuthenticating} />
        </>
      )
     )
    
    )
}

export default App

import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase"
import { useEffect, useState } from "react";



export function Chat({setIsLoggedIn,isUserNameSet,setIsUserNameSet}) {
    const [userName,setUserName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState("")


  useEffect(() => {
        async function checkUserName() {
            if (!auth.currentUser) return;

            const docRef = doc(db, "userNames", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                console.log("not found");
                setIsUserNameSet(true);
            }else{
                setUserName(docSnap.data().name);
            }
            setLoading(false);
        }

        checkUserName();
    }, []);

    //here i want a function that submits the username that the user 
    //set in the field 


    async function checkUserNameAvailability() {
        // get the collection
        const userNamesRef = collection(db , "userNames");

        // create a query against the collection
        const q = query(userNamesRef , where("name" , "==" , userName));

        console.log(q);

        const querySnapshot = await getDocs(q);

        if(querySnapshot.empty) {
            console.log('its not taken')
            return true
        }else{
            setError("UserName already taken")
            return false
        }
        // querySnapshot.forEach((doc) => {
        // // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        
        // });

        // console.log(querySnapshot)
    }

    async function submitUserName() {
        setError("");

        const docRef = doc(db, "userNames", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        setLoading(true);

        const isAvailable = await checkUserNameAvailability(userName);
        if(isAvailable){
            await setDoc(docRef, { name: userName });
            setIsUserNameSet(false)
        }
        setLoading(false)

    }

    console.log(userName)
    
    if(loading) {return <p>Loading...</p>}

    return(
        isUserNameSet ? (
        <>
        <p>{error}</p>
            <p>enter username</p>
            <input 
            type="text" 
            name="" id=""
            onChange={(e) => {setUserName(e.target.value)}}
            />
            <button 
            className="submit"
            onClick={submitUserName}>submit</button>
        </>
        ):(
            <>
        <div className="header">
        <img className="pfp" src={`https://api.dicebear.com/6.x/initials/svg?seed=${userName}`} alt="" />

         <button 
        className="logout"
        onClick={()=>{
            auth.signOut()
            setIsLoggedIn(false)
        }

        
        }
        >signOut</button>
         </div>


        <div className="content">

         <div className="sidebar">
         </div>

         <div className="messages"></div>

        </div>
        </>
        )
        

    )
}
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
const AuthContext=createContext()
export  function AuthContextProvider({children})
{
    
    const [user,setUser]=useState({})

    async function signup(email,password)
    {
      
         try{
              await createUserWithEmailAndPassword(auth,email,password)
              await setDoc(doc(db,'users',email),{
                savedShows:[]
            })
            }catch(error)
            {
                setError(err.message);
                console.log(error);
                
            }
        
    }
    async function login(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            console.error("Login error: ", err.message);
        }
    }
    async function logOut() {
        try {
            await signOut(auth);
        } catch (err) {
            setError(err.message);
            console.error("Logout error: ", err.message);
        }
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return()=>{
            unsubscribe()
        }
    })

    return(
        <AuthContext.Provider value={{signup,login,logOut,user}}>
            {children }
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}
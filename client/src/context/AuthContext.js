import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut 
} from 'firebase/auth'
import {auth} from '../utils/firebase'

const UserContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    // const registerUserToMongo = async(uid, email) => {
    //     await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
    //       method: "POST",
    //       body: JSON.stringify({
    //         uid,
    //         email,
    //       }),
    //       headers:{
    //         "Content-type": "application/json",
    //       },
    //     })
    //       .then(() => {
    //         console.log("User created successfully!");
    //       })
    //       .catch((err) => {
    //         console.log(err.message);
    //       })
    //   }
      
    //   const createUser = async (
    //     email,
    //     password,
    //   ) => {
    //     try {
    //       const response = await createUserWithEmailAndPassword(
    //         auth,
    //         email,
    //         password,
    //       );
    //       const user = response.user;
    //       await registerUserToMongo(user.uid, email);
    //       console.log('Sign-up successful');
    //     } catch(error){
    //       console.log(error);
    //       alert(error.message);
    //     }
    //   }
      
    //   const signIn = async(email, password) => {
    //     try{
    //       await signInWithEmailAndPassword(auth, email, password);
    //     } catch(error){
    //       console.log(error);
    //       alert(error.message);
    //     }
    //   }

    const logout = () => {
        return signOut(auth);
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    

    return (
        <UserContext.Provider value={{createUser, user, logout, signIn}}>
            {!loading && children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}
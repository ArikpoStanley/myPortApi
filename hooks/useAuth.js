import { onAuthStateChanged } from "firebase/auth";
import React, {useEffect, useState} from "react";
import {auth} from "../../firebase"

export default function useAuth(){
    const [user, setUser] = useState()
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, user=>{
            console.log(user);
            if(user){
                setUser(user)
            }
            else{
                setUser(null)
            }
        })

        return unsub
    }, [])

    return { user }
}
import React, { useState, useEffect, useContext } from "react";
import styles from "./Chats.module.css";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import axios from "axios";
import { auth } from "../firebase";
import Navber from "./Navber";

import  {AuthContext}  from "../context/AuthContextProvider";

const Chats = () => {
    const [loading,setLoading] = useState(true)
    const user = useContext(AuthContext)
  const history = useHistory();

  useEffect(()=>{
    if(!user){
        history.push("/")
        return
    }
    axios.get("https://api.chatengine.io/users/me",{
        headers:{
            "project-id":"87ec4867-163f-4149-85be-28090afc2763",
            "user-name": user.email,
            "user-secret": user.uid,
        }
    })
    .then(()=>{
        setLoading(false)
    })
    .catch(()=>{
        let formdata = new FormData()
        formdata.append("email",user.email)
        formdata.append("username",user.email)
        formdata.append("secret",user.uid)
        getFile(user.photoURL)
        .then(avatar=>{
            formdata.append("avatar",avatar,avatar.name)
            axios.post("https://api.chatengine.io/users/",formdata,{
                headers:{
                    "private-key":"4c6875ac-7405-46fa-b01a-0e18475d1743"
                }
            })
            .then(()=>setLoading(false))
             .catch(error=>console.log(error))
        })
       
        
    })
  },[user,history])

  const getFile = async url =>{
      const response = await fetch(url)
      const data = await response.blob()
      return new File([data],"userPhoto.jpg",{type:"image/jpeg"})
  }

  const logoutHandler = async () => {
    await auth.signOut();
    history.push("/");
  };

  if(!user || loading) return "Loading..."
  return (
    <div className={styles.container}>
      <Navber logoutHandler={logoutHandler} />
      <ChatEngine
        height="calc(100vh - 50px)"
        projectID="87ec4867-163f-4149-85be-28090afc2763"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;

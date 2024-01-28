"use client";

import { BookrideEle } from "@/components/component/BookrideEle";
import {Rideinfopage} from "@/components/component/Rideinfopage";
import HomeContext from "@/context/HomeContext";
import { useContext } from "react";

export default function RegisterPage() {
  const { ridedetails, setridedetails } = useContext(HomeContext);
  
  const login = localStorage.getItem("authToken");
  console.log(login);

  return (
    <>
      {login === null ? (
        <div>
            <Login />
        </div>
      ) : (
        <>
          {!ridedetails?<> <BookrideEle /></>:<><Rideinfopage/></>}
        </>
      )}
     
    </>
  );
}

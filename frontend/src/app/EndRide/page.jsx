"use client";
import Image from "next/image";
import {CreateUser} from "@/components/component/Createuser"
import { useContext, useEffect, useState } from "react";
import { AvailableDrivers } from "@/components/component/available-drivers";
import {BookrideEle} from "../../components/component/BookrideEle"
import { Feedback1 } from "@/components/component/feedback1";
import HomeContext from "@/context/HomeContext";


export default function BookRide() {
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
          {ridedetails?<> <Feedback1 /></>:<><BookrideEle/></>}
        </>
      )}
     
    </>
  );
}


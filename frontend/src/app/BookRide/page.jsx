"use client";
import Image from "next/image";
import {CreateUser} from "@/components/component/Createuser"
import { useEffect, useState } from "react";
import { AvailableDrivers } from "@/components/component/available-drivers";
import {BookrideEle} from "../../components/component/BookrideEle"
import { Login } from "@/components/component/Login";

export default function BookRide() {
  const login = localStorage.getItem("authToken");
  console.log(login);

  return (
    <>
      {login !== null ? (
        <div>
          <BookrideEle />
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
      
    </>
  );
}


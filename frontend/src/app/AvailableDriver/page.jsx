"use client";
import Image from "next/image";
import {CreateUser} from "@/components/component/Createuser"
import { useEffect, useState } from "react";
import { AvailableDrivers } from "@/components/component/available-drivers";
import { Login } from "@/components/component/Login";


export default function DriverList() {
  const login = localStorage.getItem("authToken");
  console.log(login);

  return (
    <>
      {login !== null ? (
        <div>
          <AvailableDrivers />
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  );
}


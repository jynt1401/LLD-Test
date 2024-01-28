"use client";

import Image from "next/image";
import { Login } from "@/components/component/Login";
import { useContext, useEffect, useState } from "react";
import HomeContext from "@/context/HomeContext";
import { Workspace } from "../components/component/Workspace";
import { BookrideEle } from "@/components/component/BookrideEle";
import { Dashboard2 } from "@/components/component/dashboard2";


export default function Home() {

  const {auth, isadmin} = useContext(HomeContext);

  return (
    <>
      {auth ? (
        <div>
          {isadmin?<><Dashboard2/></>:<><Workspace /></>}
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </>
  );
}

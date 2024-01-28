"use client";
import React, { createContext, useState } from "react";

const HomeContext = createContext("");

export const HomeProvider = ({ children }) => {
  const [auth, setauth] = useState();
  const [ridedetails, setridedetails] = useState();
  const [isadmin, setisadmin] = useState(false);

  const ContextData = {auth, setauth, ridedetails, setridedetails,isadmin,setisadmin};

  return (
    <HomeContext.Provider value={ContextData}>{children}</HomeContext.Provider>
  );
};
export default HomeContext;

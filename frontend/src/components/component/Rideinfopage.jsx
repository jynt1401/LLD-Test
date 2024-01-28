import HomeContext from "@/context/HomeContext";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { BookrideEle } from "./BookrideEle";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useRouter } from "next/navigation";


export function Rideinfopage() {
  const { ridedetails, setridedetails } = useContext(HomeContext);
  console.log(ridedetails);
  const router = useRouter();
  const tkn=localStorage.getItem("authToken");


  const [link, setlink] = useState("");
  const [copied, setcopied] = useState(false);
  const shareride = async () => {
    const body = {
      id: ridedetails._id,
    };
    const response = await fetch("http://localhost:3001/shareRide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": tkn,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setlink(data.link);
      console.log(link);
    } else {
      alert("Link not generated");
    }
  };

  const endride=()=>{
    console.log("ride ends")
    router.push("http://localhost:3000/EndRide", { scroll: false })
  }

  return (
    <>
      {ridedetails ? (
        <>
          <div className="flex flex-col h-screen  max-w-[60%] mx-auto">
          <h1 className="text-center font-bold text-[30px] py-12">Ride Dashboard</h1>
            <main className="flex-1 overflow-auto p-6 md:p-10">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold">Ride Information</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Rider:{ridedetails.rider_first_name}
                      {ridedetails.rider_last_name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Driver:{ridedetails.driver_first_name}
                      {ridedetails.driver_last_name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Driver's email:{ridedetails.driver_email}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Start Date: {ridedetails.start_date}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      End Date: Ride is not completed
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      PickUp location:{ridedetails.PickUp}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      DropOff location:{ridedetails.DropAt}
                    </p>
                  </div>
                  <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold">Current Location</h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      Latitude: 37.4219983
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Longitude: -122.084
                    </p>
                    {link ? (
                      <>
                       {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                        <div className="mt-4">
                          
                          <CopyToClipboard  className="w-full text-[10px]"
                            variant="outline" text={link}>
                             <Button
                            className="w-full"
                            variant="outline"
                            onClick={()=>{
                              
                              setcopied(true)
                              console.log("copied")
                              }}
                          >
                           {link}
                          </Button>
                          </CopyToClipboard>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mt-4">
                          <Button
                            className="w-full"
                            variant="outline"
                            onClick={shareride}
                          >
                            Share Ride
                          </Button>
                        </div>
                      </>
                    )}
                    <div className="mt-4">
                      <Button className="w-full" variant="outline" onClick={endride}>
                        End Ride
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          )
        </>
      ) : (
        <>
          <BookrideEle />
        </>
      )}
    </>
  );
}

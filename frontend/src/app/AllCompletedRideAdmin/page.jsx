/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3vQhLYgKw0i
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function getAllOngoing() {
  const tkn = localStorage.getItem("authToken");

  const [completed, setcompleted] = useState([]);


  const getAllCompletedRides = async () => {
    const response = await fetch("http://localhost:3001/getCompletedRides", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: tkn,
      },
    });
    const data = await response.text();
    const leyy = JSON.parse(data);
    console.log(leyy);
    if (leyy.success) {
        setcompleted(leyy.data);
    } else {
      alert("unable to fetch");
    }
  };
  useEffect(() => {
    getAllCompletedRides();
  }, []);

  console.log(completed);

  return (
    <main className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">All Completed Rides</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <>
          {completed.map((value, key) => {
            return (
              <>
                <Card>
                  <CardHeader>
                    <Avatar>
                      <AvatarImage
                        alt="Rider 2"
                        src="/placeholder-avatar.jpg"
                      />
                      <AvatarFallback>R{key+1}</AvatarFallback>
                    </Avatar>
                    <CardTitle>Ride {key+1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                     Rider: {value.rider_first_name} {value.rider_last_name}
                    </p>
                    <p>
                     Rider's email: {value.rider_email} 
                    </p>
                    <p>
                     Driver: {value.driver_first_name} {value.driver_last_name}
                    </p>
                    <p>
                     Driver's email: {value.driver_email} 
                    </p>
                    <p>
                     Pickup: {value.PickUp} 
                    </p>
                    <p>
                     DropAt: {value.DropAt} 
                    </p>
                    <p>
                     Start At : {value.start_date} 
                    </p>
                    <p>
                     End At : {value.start_date} 
                    </p>
                   
                  </CardContent>
                </Card>
              </>
            );
          })}
        </>

       
      </div>
    </main>
  );
}

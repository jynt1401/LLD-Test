/**
 * v0 by Vercel.
 * @see https://v0.dev/t/3vQhLYgKw0i
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Allrideradmin() {
  const tkn = localStorage.getItem("authToken");

  const [Allrider, setAllrider] = useState([]);
  const getAllrider = async () => {
    const response = await fetch("http://localhost:3001/getUsers", {
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
      setAllrider(leyy.data);
    } else {
      alert("unable to fetch");
    }
  };
  useEffect(() => {
    getAllrider();
  }, []);

  console.log(Allrider);

  return (
    <main className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">All Riders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <>
          {Allrider.map((value, key) => {
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
                    <CardTitle>Rider {key+1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      {value.first_name} {value.last_name}
                    </p>
                    <p>
                      {value.email} 
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

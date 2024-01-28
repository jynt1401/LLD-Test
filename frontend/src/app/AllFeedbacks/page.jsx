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

  const [feedback, setfeedback] = useState([]);



  const getAllgetAllfeedbacks = async () => {
    const response = await fetch("http://localhost:3001/getAllfeedbacks", {
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
      setfeedback(leyy.data);
    } else {
      alert("unable to fetch");
    }
  };
  useEffect(() => {
    getAllgetAllfeedbacks();
  }, []);

  console.log(feedback);

  return (
    <main className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">All Feedbacks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <>
          {feedback.map((value, key) => {
            return (
              <>
                <Card>
                  <CardHeader>
                    <Avatar>
                      <AvatarImage
                        alt="Rider 2"
                        src="/placeholder-avatar.jpg"
                      />
                      <AvatarFallback>F{key+1}</AvatarFallback>
                    </Avatar>
                    <CardTitle>Feedback {key+1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                     RideID: {value.RideID}
                    </p>
                    <p>
                     RiderID: {value.RiderID}
                    </p>
                    <p>
                    Feedback: 
                    </p>
                    <p>
                    {value.Feedback}
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

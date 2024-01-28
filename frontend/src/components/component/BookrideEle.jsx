"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardContent, Card } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomeContext from '@/context/HomeContext';
// import { useNavigate } from "react-router-dom";

export function BookrideEle() {
  const { ridedetails, setridedetails } = useContext(HomeContext);
  const { auth, setauth } = useContext(HomeContext);
  const tkn=localStorage.getItem("authToken");
  // const navigate = useNavigate();
  // const [ridedetails, setridedetails] = useState(null);

  const [Ride_info, setRide_info] = useState({});
  const [Open, setOpen] = useState(false);
  const [list, setlist] = useState([]);

  const router = useRouter();

  const getDriver = async () => {
    const response = await fetch("http://localhost:3001/availableDriver", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": tkn,
      },
    });
    const data = await response.text();
    const leyy = JSON.parse(data);
    setlist(leyy.data);
  };
  useEffect(() => {
    getDriver();
  }, []);

  const onchange = (e) => {
    setRide_info({ ...Ride_info, [e.target.name]: e.target.value });
  };

  const eventHandler = async () => {
    if (
      Object.keys(Ride_info).length === 2 &&
      Ride_info.pickup !== "" &&
      Ride_info.dropoff !== ""
    ) {
      setOpen(true);
    } else {
      alert("select location properly");
    }
  };
  useEffect(() => {
    console.log(Ride_info);
  }, [Ride_info]);

  const bookride = async (e) => {
    console.log("***********************");
    const body = {
      Pick_up_loc: Ride_info.pickup,
      drop_loc: Ride_info.dropoff,
      Token: localStorage.authToken,
      driver_id: e.target.name,
      shared: false,
      Start_date: new Date(),
      End_date: null,
    };
    const response = await fetch("http://localhost:3001/bookRide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": tkn,
      },
      body: JSON.stringify(body),
    });
    const leyy = await response.json();
    console.log(leyy.data);
    console.log(leyy.data);
    setridedetails(leyy.data)
    router.push("http://localhost:3000/RideInfo", { scroll: false });
  };

  useEffect(() => {
    if (ridedetails) router.push("http://localhost:3000/RideInfo", { scroll: false });
    console.log(ridedetails);
  }, []);

  const eventHandlerLogout = () => {
    console.log("loggedout");
    console.log(auth)
    localStorage.removeItem("authToken");
    localStorage.removeItem("admin");
    setauth()
    console.log(auth)
    router.push('http://localhost:3000', { scroll: false })
  };

  return (
    <div className="mx-auto w-[500px] min-h-screen space-y-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Book a Ride</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your pickup and drop-off locations
        </p>
      </div>
      <div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup">Pickup Location</Label>
            <Input
              id="pickup"
              placeholder="Enter pickup location"
              required
              name="pickup"
              value={Ride_info.pickup}
              onChange={onchange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dropoff">Drop-off Location</Label>
            <Input
              id="dropoff"
              placeholder="Enter drop-off location"
              required
              name="dropoff"
              value={Ride_info.dropoff}
              onChange={onchange}
            />
          </div>
          <Button className="w-full" onClick={eventHandler}>
            Find Drivers
          </Button>
          <button className="w-full bg-[#FF0000] rounded-md p-2 font-medium" onClick={eventHandlerLogout}>
            Log Out
          </button>
        </div>
        <Separator className="my-8" />
        {Open && list.length ? (
          <>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Available Drivers</h2>
              <div className="grid gap-4">
                {list.map((value, key) => {
                  return (
                    <Card>
                      <CardContent className="p-4 flex items-center gap-6">
                        <Avatar className="w-10 h-10 border">
                          <AvatarImage
                            alt="Driver 1"
                            src="/placeholder-user.jpg"
                          />
                          <AvatarFallback>D{key + 1}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 font-semibold max-w-[16rem]">
                          {value.first_name} {value.last_name}
                          <p>{(key + 46) % 3} miles away</p>
                        </div>

                        <Button
                          className="w-full max-w-[120px]"
                          onClick={bookride}
                          name={value.id}
                        >
                          Book Ride
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            <h3>No Driver Available</h3>
          </>
        )}
      </div>
    </div>
  );
}

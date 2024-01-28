const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const cors = require("cors");

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//---------------mongoose connection----------------//

const uri =
  "mongodb+srv://jayantbelwanshi1401:8458923788@cluster0.vqantbd.mongodb.net/RideDataBase?retryWrites=true&w=majority";
const PORT = 3001;

const connection = mongoose
  .createConnection(uri)
  .on("open", () => {
    console.log("mongo connected");
  })
  .on("error", () => {
    console.log("mongo error");
  });

//---------------mongoose connection----------------//

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "*",
    credentials: true,
  })
);

let User = connection.collection("User");
let Driver = connection.collection("Driver");
let Admin = connection.collection("Admin");
let Rider = connection.collection("Rider");
let Rides = connection.collection("Rides");
let Feedback = connection.collection("Feedback");

app.get("/", (req, res) => {
  res.json({ 1: "hellogjh" });
});
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});

const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";

const userRoleCheck = async (requestToken, requiredRole) => {
  const decryptedToken = await jwtDecode(requestToken);
  if (decryptedToken.user.role === requiredRole) {
    return true;
  }
  return false;
};

//------------------------FOR REGISTRATION-----------------//

app.post("/authcreateUser", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const securepassword = await bcrypt.hash(req.body.password, 10);
  let available = false;
  if (req.body.role === "driver") {
    available = true;
  }
  const dataCheck = await User.find({ email: req.body.email });
  const dataArrayCheck = await dataCheck.toArray();
  if (dataArrayCheck.length === 0) {
    await User.insertOne({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: securepassword,
      role: req.body.role,
      is_available: available,
    }).then(console.log("user created"));

    if (req.body.role === "driver") {
      let DriverData = await User.find({ email: req.body.email });
      DriverData = await DriverData.toArray();
      await Driver.insertOne({
        id: DriverData[0]._id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: securepassword,
        role: req.body.role,
        is_available: available,
      }).then(console.log("user set as driver"));
    }

    if (req.body.role === "admin") {
      let AdminData = await User.find({ email: req.body.email });
      AdminData = await AdminData.toArray();
      await Admin.insertOne({
        id: AdminData[0]._id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: securepassword,
        role: req.body.role,
        is_available: available,
      }).then(console.log("user set as admin"));
    }
    if (req.body.role === "rider") {
      let RiderData = await User.find({ email: req.body.email });
      RiderData = await RiderData.toArray();
      await Rider.insertOne({
        id: RiderData[0]._id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: securepassword,
        role: req.body.role,
        is_available: available,
      }).then(console.log("user set as Rider"));
    }

    const dataCh = await User.find({ email: req.body.email });
    const data = await dataCh.toArray();
    const datatosend = {
      user: {
        id: data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
      },
    };
    const authToken = jwt.sign(datatosend, jwtSecret);
    res.json({ success: true, userexist: false, authToken: authToken });
  } else {
    console.log("already a user");
    res.json("already a user");
  }
});

app.post("/authloginUser", async (req, res) => {
  // const securepassword = await bcrypt.hash(req.body.password, salt);
  const dataCheck = await User.find({ email: req.body.email });
  const dataArrayCheck = await dataCheck.toArray();
  // console.log(securepassword,dataArrayCheck[0].password);
  if (dataArrayCheck.length === 0) {
    res.json("user not found");
  } else {
    console.log(
      await bcrypt.compare(req.body.password, dataArrayCheck[0].password)
    );
    if (await bcrypt.compare(req.body.password, dataArrayCheck[0].password)) {
      console.log("user found");
      const datatosend = {
        user: {
          id: dataArrayCheck[0]._id,
          first_name: dataArrayCheck[0].first_name,
          last_name: dataArrayCheck[0].last_name,
          email: dataArrayCheck[0].email,
          role: dataArrayCheck[0].role,
        },
      };
      const authToken = jwt.sign(datatosend, jwtSecret);
      res.json({
        success: true,
        userexist: false,
        authToken: authToken,
        role: dataArrayCheck[0].role,
      });
    } else {
      res.json("password incorrect");
    }
  }
});

//**************************************** ADMIN SECTION *********************************************** */

//-------See all Riders------//

app.get("/getUsers", async (req, res) => {
  if(await userRoleCheck(req.headers.token, "admin")===false){
    res.json({ success: false});
  }
  else{

    try {
      const data = await Rider.find({});
    const dataArray = await data.toArray();
    console.log(dataArray, "done");
    res.json({ success: true, data: dataArray });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.json({ success: false,});
  }
  }
});

//-------See all Drivers------//

app.get("/getDrivers", async (req, res) => {
  if(await userRoleCheck(req.headers.token, "admin")===false){
    res.json({ success: false});
  }
  else{

    try {
      const data = await Driver.find({});
    const dataArray = await data.toArray();
    console.log(dataArray, "done");
    res.json({ success: true, data: dataArray });

  } catch (error) {
    console.error("Error retrieving data:", error);
    res.json({ success: false,});
  }
}
});

//-------See Ongoing Rides----//
app.get("/getOngoingRides", async (req, res) => {
  if(await userRoleCheck(req.headers.token, "admin")===false){
    res.json({ success: false});
  }
  else{

    try {
      const data = await Rides.find({ Ride_End: false });
      const dataArray = await data.toArray();
      res.json({ success: true, data: dataArray });

    } catch (error) {
      console.error("Error retrieving data:", error);
      res.json({ success: false,});
    }
}
});

//-------See Completed Rides----//
app.get("/getCompletedRides", async (req, res) => {
  if(await userRoleCheck(req.headers.token, "admin")===false){
    res.json({ success: false});
  }
  else{

    try
    {
      const data = await Rides.find({ Ride_End: true });
    const dataArray = await data.toArray();
    res.json({ success: true, data: dataArray });

    } catch (error) {
      console.error("Error retrieving data:", error);
      res.json({ success: false,});
    }
  }
});

//-------See All Rides----//
app.get("/getAllRides", async (req, res) => {
  if(await userRoleCheck(req.headers.token, "admin")===false){
    res.json({ success: false});
  }
  else{

    try {
      const data = await Rides.find({});
    const dataArray = await data.toArray();
    res.json({ success: true, data: dataArray });

  } catch (error) {
    console.error("Error retrieving data:", error);
    res.json({ success: false,});
  }
}
});

//-------See All Feedbacks----//
app.get("/getAllfeedbacks", async (req, res) => {
  if(await userRoleCheck(req.headers.token, "admin")===false){
    res.json({ success: false});
  }
  else{

    try {
      const data = await Feedback.find({});
    const dataArray = await data.toArray();
    res.json({ success: true, data: dataArray });

  } catch (error) {
    console.error("Error retrieving data:", error);
    res.json({ success: false,});
  }
  }
});

//**************************************** Traveler SECTION *********************************************** */

//-------See Available Driver------//

app.get("/availableDriver", async (req, res) => {
  
  if(await userRoleCheck(req.headers.token, "rider")===false){
    res.json({ success: false});
  }
  else{

    try {
      const data = await Driver.find({ is_available: true });
    const dataArray = await data.toArray();
    if (dataArray.length === 0) {
      console.log("not found");
      res.json({ success: false });
    } else {
      console.log(" found");
      
      res.json({ success: true, userexist: false, data: dataArray });
    }
  } catch (error) {
    console.log("not found");

    res.json({ success: false });
  }
}
});

//-------Book Ride------//

app.post("/bookRide", async (req, res) => {
  if(await userRoleCheck(req.headers.token, "rider")===false){
    res.json({ success: false});
  }
  else{

    try {
      const data = await Driver.find({ is_available: true });
      const dataArray = await data.toArray();
    if (dataArray.length === 0) {
      res.json({ msg: "No driver available" });
    } else {
      const authToken = req.body.Token;
      const data = jwt.verify(authToken, jwtSecret);

      let riderID = data.user.id;
      let driverID = req.body.driver_id;
      riderID = new ObjectId(riderID);
      driverID = new ObjectId(driverID);
      let riderData = await Rider.findOne({ id: riderID });
      let driverData = await Driver.findOne({ id: driverID });
      console.log(req.body.Pick_up_loc, req.body.drop_loc);
      const r_f_Name = riderData.first_name;
      const r_l_Name = riderData.last_name;
      const r_email = riderData.email;
      const d_f_Name = driverData.first_name;
      const d_l_Name = driverData.last_name;
      const d_email = driverData.email;
      const date = new Date(req.body.Start_date);
      
      try {
        let rideData = await Rides.insertOne({
          rider_id: riderID,
          rider_first_name: r_f_Name,
          rider_last_name: r_l_Name,
          rider_email: r_email,
          driver_id: driverID,
          driver_first_name: d_f_Name,
          driver_last_name: d_l_Name,
          driver_email: d_email,
          start_date: date,
          End_date: req.body.End_date,
          PickUp: req.body.Pick_up_loc,
          current_loc: "*****",
          driver_loc: "*****",
          DropAt: req.body.drop_loc,
          shared_trip: req.body.shared,
          Ride_End: false,
        }).then(console.log("Ride Booked"));
        console.log(rideData.insertedId);
        const data = await Rides.findOne({ _id: rideData.insertedId });
        res.json({ success: true, userexist: false, data: data, a: true });
      } catch (errr) {
        res.json({ success: false });
      }
    }
  } catch (error) {
    console.error("Error in bookng a cab:", error);
    res.json({ success: false });
  }
}
});

//-------Share Ride------//

app.post("/shareRide", async (req, res) => {
  if(await userRoleCheck(req.headers.token, "rider")===false){
    res.json({ success: false});
  }
  else{

    let rideID = req.body.id;
    rideID = new ObjectId(rideID);
    const port = "http://localhost:3001";
  const link = `${port}/sharedRideInfo/${rideID}`;
  try {
    await Rides.updateOne(
      { _id: rideID },
      {
        $set: {
          shared_trip: true,
          Link: link,
        },
      }
      ).then(console.log("updated ride info"));
      res.json({ success: true, link: link });
    } catch (error) {
    res.json({ success: false });
  }
}
});

//-------Shared Ride information----//

app.get("/sharedRideInfo/:rideID", async (req, res) => {
  try {
    let id = req.params.rideID;
    id = new ObjectId(id);
    let sharedInfo = await Rides.findOne({ _id: id });
    if (sharedInfo.shared_trip === true) {
      //   res.json(`
      //   <html>
      //     <body>
      //       <h1>Ride Information</h1>
      //       <p> Rider Name: ${sharedInfo.rider_first_name} ${sharedInfo.rider_last_name}</P>
      //       <p>  Driver Name: ${sharedInfo.driver_first_name} ${sharedInfo.driver_last_name}</P>
      //       <p>  Start At: ${sharedInfo.start_date}</P>
      //       <p> Pick up location:  ${sharedInfo.PickUp}</P>
      //       <p> Drop at  location:  ${sharedInfo.DropAt}</P>
      //       <p> Current  location:  ${sharedInfo.current_loc}</P>
      //     </body>
      //   </html>
      // `);
      res.send({
        Rider_Name: sharedInfo.rider_first_name + sharedInfo.rider_last_name,
        Driver_Name: sharedInfo.driver_first_name + sharedInfo.driver_last_name,
        Start_At: sharedInfo.start_date,
        Pick_up_location: sharedInfo.PickUp,
        Drop_at_location: sharedInfo.DropAt,
        Current_location: sharedInfo.current_loc,
      });
    } else {
      res.json(`
    <html>
      <body>
        <h3>Invalid Link</h3>
        
      </body>
    </html>
  `);
    }
  } catch (error) {
    res.json({ "error to fetch details": error });
  }
});

//-------Ride complete----//
app.post("/rideCompletes", async (req, res) => {
  if(await userRoleCheck(req.headers.token, "rider")===false){
    res.json({ success: false});
  }
  else{

    let id = req.body.id;
    id = new ObjectId(id);
  let date = new Date();
  try {
    await Rides.updateOne(
      { _id: id },
      {
        $set: {
          shared_trip: false,
          Ride_End: true,
          Link: null,
          End_date: date,
        },
      }
    );

    let RideInfo = await Rides.findOne({ _id: id });
    await Feedback.insertOne({
      RideID: id,
      RideID: req.body.id,
      RiderID: RideInfo.rider_id,
      DriverID: RideInfo.driver_id,
      Feedback: req.body.feedBack,
    });

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
}
});

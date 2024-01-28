# Ride-Share Web Application

This web application provides a platform for users to book rides, track them in real-time, and share ride details with companions. Additionally, it offers an admin section to manage users, drivers, and view ride statistics and feedback.

## Features

### User Section:

1. **Driver Availability:**
   - Users can view a list of available drivers.


2. **Ride Booking:**
   - Users can input pickup and drop-off locations.
   - Available drivers matching the criteria are displayed.
   - Users can book a ride with their preferred driver.

3. **Generate Ride Link:**
   - Users can generate a unique link to share ride details with companions.
   - The link includes essential ride information such as driver details, cab number, and real-time location.

4. **Feedback Submission:**
   - Users can provide feedback on completed rides, including comments on the driver and overall experience.

### Admin Section:

1. **User and Driver Management:**
   - Admins have access to a dashboard displaying all active users and drivers.

2. **Ride Statistics:**
   - Admins can view comprehensive details of completed and ongoing rides.
   - Information includes user details, driver information, and ride status.

3. **Feedback Management:**
   - Admins can access feedback submitted by users for analysis.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jynt1401/Ride-Sharing.git

2. Run Client:

   ```bash
   cd frontend
   npm run dev

3. Run Server:

   ```bash
   cd Backend
   nodemon index.js



// Import required modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Set up nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ismailmakamel225@gmail.com', // Your email address
    pass: 'Ismail12345<>',  // Your email password
  }
});

// Booking API endpoint
app.post('/send-booking', (req, res) => {
  const { fullName, place, phoneNumber, email, bookingDate, numberOfPeople, specialRequests } = req.body;

  // Create email content
  const mailOptions = {
    from: 'ismailmakamel225@gmail.com',
    to: 'ismailmakamel12@gmailcom', // Email address to receive bookings
    subject: 'New Booking Received',
    text: `
      New booking received:
      Full Name: ${fullName}
      Place: ${place}
      Phone Number: ${phoneNumber}
      Email: ${email}
      Booking Date: ${bookingDate}
      Number of People: ${numberOfPeople}
      Special Requests: ${specialRequests || 'None'}
    `
  };

  // Send email using nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error sending booking email' });
    }
    res.status(200).json({ message: 'Booking email sent successfully', info });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

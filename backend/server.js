const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'myHardcodedSecret123';
const Razorpay = require('razorpay');
const axios = require('axios');
const http = require("http");
require('dotenv').config();
const { Server } = require("socket.io");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  'mongodb+srv://naresh:Naresh260@cluster0.fivu5nz.mongodb.net/caregiverDB?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection failed:', err));

// ---------------------- Schemas and Models ---------------------- //

// Caregiver Schema
const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  specialty: String,
  location: String,
  experience: String,
  rating: String,
  tags: [String],
  languages: String,
  availability: String,
  imageUrl: String,
});

const User = mongoose.model('User', UserSchema);


// care-giver login schema
const caregiverLoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Model name should match the collection purpose clearly
const CaregiverLogin = mongoose.model('CaregiverLogin', caregiverLoginSchema);



// Exam Center Schema
const ExamCenterSchema = new mongoose.Schema({
  centerName: String,
  location: String,
  contactEmail: String,
  contactPhone: String,
  accessibleFacilities: [String],
  caregiverTrusted: Boolean,
  capacity: Number,
  examTypes: [String],
  imageUrl: String
});

const ExamCenter = mongoose.model('ExamCenter', ExamCenterSchema);

// Sign-Up User Schema
const SignupUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const SignupUser = mongoose.model('SignupUser', SignupUserSchema);


// Booking Service-schema

const bookingSchema = new mongoose.Schema({
  caregiver: {
    name: String,
    specialty: String,
    location: String,
    imageUrl: String,
  },
  name: String,
  email: String,
  phone: String,
  service: String,
  date: String,
  location: String,
  duration: Number,
  requirements: String,
  paymentDetails: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);





// ---------------------- Caregivers Routes ---------------------- //

// POST - Single or Multiple Caregivers
app.post('/caregivers', async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const caregivers = await User.insertMany(data);
      return res.status(201).send({ message: 'Multiple users saved successfully', caregivers });
    }

    const caregiver = new User(data);
    await caregiver.save();
    res.status(201).send({ message: 'Single user saved successfully', caregiver });

  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// GET - All Caregivers
app.get('/caregivers', async (req, res) => {
  try {
    const caregivers = await User.find({});
    res.status(200).json(caregivers);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// -------caregiverLogin Routes------------//


app.post('/caregivers-login', async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const caregivers = await CaregiverLogin.insertMany(data);
      return res.status(201).send({ message: 'Multiple caregivers saved successfully', caregivers });
    }

    const caregiver = new CaregiverLogin(data);
    await caregiver.save();
    res.status(201).send({ message: 'Single caregiver saved successfully', caregiver });

  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});






// ---------------------- Exam Center Routes ---------------------- //

// POST - Single or Multiple Exam Centers
app.post('/examcenters', async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const centers = await ExamCenter.insertMany(data);
      return res.status(201).send({ message: 'Multiple exam centers saved successfully', centers });
    }

    const center = new ExamCenter(data);
    await center.save();
    res.status(201).send({ message: 'Single exam center saved successfully', center });

  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});


// GET - All Exam Centers
app.get('/examcenters', async (req, res) => {
  try {
    const centers = await ExamCenter.find({});
    res.status(200).json(centers);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


// ---------------------- SignUP Routes ---------------------- //
// POST - Sign Up a new user
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Optional: check if the email already exists
    const existingUser = await SignupUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = new SignupUser({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User signed up successfully', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - All Signed-Up Users
app.get('/signup', async (req, res) => {
  try {
    const users = await SignupUser.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST - Sign In existing user
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await SignupUser.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ userId: existingUser._id, email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // ✅ Send token in response
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint to create a Razorpay order
app.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100, // amount in paisa (₹500 = 50000)
    currency: currency || 'INR',
    receipt: 'receipt_order_' + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(201).json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create Razorpay order', details: err });
  }
});

// payMent sucessfull page
app.get('/get-order/:orderId', async (req, res) => {
  const { orderId } = req.params;

  const key_id = 'rzp_test_scLzHIiiBAqpNQ';
  const key_secret = 'YddyNzdiWwJ1JasQduGWTm1Ht';

  try {
    const response = await axios.get(`https://api.razorpay.com/v1/orders/${orderId}`, {
      auth: {
        username: key_id,
        password: key_secret
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || 'Failed to fetch order data' });
  }
});


//Booking Service API

app.post("/bookings", async (req, res) => {
  try {
    const { caregiver, formData, paymentDetails } = req.body;
    const booking = new Booking({
      caregiver,
      ...formData,
      paymentDetails,
      createdAt: new Date(),
    });
    await booking.save();
    res.status(200).json({ message: "Booking saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save booking" });
  }
});


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });


io.on("connection", (socket) => {
  console.log("A user connected");

  // 🟢 Mock caregiver location emitter every 5 seconds
  const interval = setInterval(() => {
    const caregiverLocation = {
      lat: 20.5937 + Math.random() * 0.01,
      lng: 78.9629 + Math.random() * 0.01
    };
    socket.emit("location-update", caregiverLocation);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("User disconnected");
    clearInterval(interval); // cleanup on disconnect
  });
});











// ---------------------- Start Server ---------------------- //
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

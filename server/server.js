const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("Connected to MongoDB")
})

// User Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    default: "",
  },
  isAgency: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model("User", userSchema)

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Helper Functions
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12)
}

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

// Routes
app.get("/", (req, res) => {
  res.json({ message: "PopX API Server is running!" })
})

// Register Route
app.post("/api/auth/register", async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password, companyName, isAgency } = req.body

    if (!fullName || !phoneNumber || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = new User({
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
      companyName: companyName || "",
      isAgency: isAgency === "yes",
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id.toString())

    res.json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        isAgency: user.isAgency,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Login Route
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Generate token
    const token = generateToken(user._id.toString())

    res.json({
      success: true,
      token,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        isAgency: user.isAgency,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Verify Token Route
app.get("/api/auth/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "No token provided" })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return res.status(401).json({ error: "User not found" })
    }

    res.json({
      success: true,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        companyName: user.companyName,
        isAgency: user.isAgency,
      },
    })
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

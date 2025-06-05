# PopX Mobile App

A mobile-first React application with Express.js backend and MongoDB database.

## Setup Instructions

1. **Install dependencies for both client and server:**
   \`\`\`bash
   npm run install-deps
   \`\`\`

2. **Set up environment variables:**
   Create a `.env` file in the `server` directory:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/popx
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   \`\`\`

3. **Start MongoDB:**
   Make sure MongoDB is running on your system.

4. **Run the application:**
   \`\`\`bash
   npm run dev
   \`\`\`

   This will start both the Express server (port 5000) and React client (port 3000).

## Features

- **User Registration & Authentication**
- **MongoDB Database Integration**
- **JWT Token-based Authentication**
- **Responsive Mobile-First Design**
- **Styled Components for Pixel-Perfect UI**
- **Real-time User Data Display**

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

## Technologies Used

- **Frontend:** React.js, Styled Components, Axios
- **Backend:** Express.js, Node.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcryptjs

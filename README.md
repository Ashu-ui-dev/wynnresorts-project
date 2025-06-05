Wynn Resort Registration 

A complete registration app built with **React (TypeScript)** for the frontend and **Express.js** for the backend. This app allows users to fill in a registration form, select an OTP delivery method (email or mobile), receive a simulated 4-digit OTP via alert, and verify it.


## 🔧 Tech Stack

### Frontend:
- React (TypeScript)
- React Router
- Context API
- SCSS Modules

### Backend:
- Node.js (Express)
- In-memory storage (no database required)
- CORS-enabled for frontend integration

### Development Tools:
- `concurrently` to run frontend and backend simultaneously
- `npm` for dependency management

---

🛠️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/Ashu-ui-dev/wynnresorts-project/.git
cd wynnresorts-project

2️⃣ Install Dependencies

npm install

3️⃣ Start the Development Server

npm start

This will run the frontend app on http://localhost:3001.

And will run the backend app on http://localhost:4000.

---

Project Structure

📦 wynnresorts-project
 ├── 📂 backend                 # Express server for form submission & OTP APIs
 │    └── 📜 server.js          # Main backend server file
 ├── 📂 src                     # React frontend codebase
 │    ├── 📂 assets             # Static assets (images, icons, etc.)
 │    ├── 📂 components         # Reusable UI components
 │    ├── 📂 context            # Context API for global user state
 │    ├── 📂 pages              # Register form, OTP selection & OTP input pages
 │    ├── 📂 services           # API services & form validators
 │    ├── 📂 styles             # Global SCSS and responsive mixins
 │    ├── 📜 App.tsx           # Main app component
 │    ├── 📜 index.tsx         # React entry point
 │    └── 📜 react-app-env.d.ts # TypeScript env declarations
 ├── 📜 package.json           # Scripts to run both frontend and backend
 ├── 📜 tsconfig.json          # TypeScript configuration
 ├── 📜 README.md              # Project documentation
 └── 📜 .gitignore             # Ignored files & folders

---

 🔗 API Endpoints

Example CURL Commands:

✅ Submit form

curl -X POST http://localhost:4000/submit-form \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Ashu","lastName":"Rana","email":"test@example.com","phoneNumber":"123456789","gender":"male","country":"UAE","termsAccepted":true}'

✅ Generate OTP

curl -X POST http://localhost:4000/generate-otp \
  -H "Content-Type: application/json" \
  -d '{"communicationStream": "test@example.com", "medium": 1}'

✅ Verify OTP

curl -X POST http://localhost:4000/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"communicationStream": "test@example.com", "otp": "1234"}'



## 🚀 Features

✅ Step-based registration form  
✅ Field validation (email, phone, names, etc.)  
✅ OTP delivery medium selection (email or mobile)  
✅ 4-digit OTP generation  
✅ OTP alert for simulation (no SMS/email service)  
✅ State management using React Context  
✅ Form and OTP logic handled by a local Express server  
✅ Responsive layout with mobile/tablet/desktop mixins

---

📜 License
This project is open for personal or educational use only. No commercial license is applied yet.

🤝 Contributing

Fork the repository

Create a new branch (git checkout -b feature-branch)

Commit changes (git commit -m 'Add new feature')

Push to branch (git push origin feature-branch)

Open a Pull Request

Wynn Resort Registration Form

This is a React-based Registration Form for Wynn Resort. The application includes:

Register Page: A form to collect user details.

OTP Medium Selection Page: Users choose whether to receive OTP via email or mobile.

Enter OTP Page: Users enter the received OTP to complete the registration.

🌐 Live Demo

Netlify Deployment (Add your Netlify URL here after deployment)

🚀 Tech Stack

React.js

React Router (for navigation)

Context API (for global state management)

MockAPI.io (for backend mocking)

Netlify (for deployment)


🛠️ Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/Ashu-ui-dev/wynnresorts-project/.git
cd wynnresorts-project

2️⃣ Install Dependencies

npm install

3️⃣ Start the Development Server

npm start

This will run the app on http://localhost:3000.

Project Structure

📂 src
 ├── 📂 components       # Reusable UI components
 ├── 📂 context          # Context API for global state
 ├── 📂 pages            # Register, OTP selection, and OTP entry pages
 ├── 📂 assets           # Images, styles, etc.
 ├── 📜 App.js           # Main app file
 ├── 📜 index.js         # React entry point
 └── 📜 routes.js        # App routing configuration


 🔗 API Endpoints

Register a User (POST)

https://67a77275203008941f67a4de.mockapi.io/asdfpi/formdata

Newsletter Signup

https://67a77275203008941f67a4de.mockapi.io/asdfpi/formdata


📌 Features

✅ User registration form with validation
✅ OTP medium selection (Email/Mobile)
✅ OTP verification with input handling
✅ Context API for state management
✅ Deployment-ready with Cloudflare, Netlify, Docker, and Vercel


🤝 Contributing

Fork the repository

Create a new branch (git checkout -b feature-branch)

Commit changes (git commit -m 'Add new feature')

Push to branch (git push origin feature-branch)

Open a Pull Request
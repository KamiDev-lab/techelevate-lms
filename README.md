Full-Stack LMS Project
Welcome to the full-stack Learning Management System (LMS) project! This application provides a platform for course creators to upload and manage courses, and for students to purchase and enroll in them. It includes a complete payment integration with Stripe and progress tracking for lectures.

✨ Features
Advanced User Authentication: Secure user registration and login with an email-based authentication flow.

Role-Based Access: Separate dashboards and functionalities for course creators and students.

Course Management: Creators can add, edit, and delete courses, including titles, descriptions, and thumbnails.

Lecture Management: Creators can upload video lectures for their courses.

Secure Payments: Full Stripe integration for handling course purchases securely.

Webhook Integration: A Stripe webhook endpoint to automatically update payment statuses and grant course access upon successful payment.

Course Progress Tracking: Students can track their progress through lectures and mark them as completed.

Dashboard: A personalized dashboard for students to view their enrolled courses and a separate one for creators to manage their content.

🛠️ Technologies Used
Backend
Node.js: JavaScript runtime environment.

Express.js: Web framework for building the API.

MongoDB: NoSQL database for data storage.

Mongoose: ODM (Object Data Modeling) library for MongoDB.

Stripe: For handling all payment-related transactions.

jsonwebtoken: For creating and verifying secure authentication tokens.

bcryptjs: For password hashing and security.

Multer: Middleware for handling multipart/form-data, primarily for file uploads.

Cloudinary: Middleware for file uploads.

dotenv: To manage environment variables.

Frontend
React: For building the user interface.

RTK (Redux Toolkit): For state management.

React Router DOM: For handling client-side routing.

Tailwind CSS: For styling the application.

RTK Query: For making API requests.

🚀 Installation
Follow these steps to get the project up and running on your local machine.

1. Clone the repository
git clone <repository-url>
cd <project-folder>

2. Install dependencies
Install both the backend and frontend dependencies.

# Install backend dependencies
npm install

# Navigate to the frontend directory and install dependencies
cd frontend
npm install

3. Environment Variables
Create a .env file in the root directory and add the following variables. These are crucial for the application to function correctly.

# Database
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# JWT Token
JWT_SECRET_KEY=<your_jwt_secret_key>
JWT_EXPIRE_TIME=1d

# Stripe
STRIPE_SECRET_KEY=<your_stripe_secret_key>
WEBHOOK_ENDPOINT_SECRET=<your_stripe_webhook_secret>

# Frontend URL
VITE_FRONTEND_URL=http://localhost:5173
LOCAL_FRONTEND_URL=http://localhost:5173

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

# Port
PORT=3000

4. Running the application
Run the backend and frontend servers in separate terminals.

# In the root directory, start the backend server
npm start

# In the frontend directory, start the development server
cd frontend
npm run dev

The application will be accessible at http://localhost:5173 and the API will be running on http://localhost:3000.

⚙️ Setting up Stripe Webhooks
The webhook is crucial for updating the payment status.

Get your webhook secret: Go to your Stripe Dashboard > Developers > Webhooks.

Add an endpoint:

Endpoint URL: When running locally, use a tool like ngrok or the Stripe CLI to expose your local server. For example: https://<your-ngrok-url>/api/webhook. For production, use your deployed server URL.

Events to send: Select checkout.session.completed.

Copy the secret: After saving, copy the generated webhook secret and paste it into your .env file as WEBHOOK_ENDPOINT_SECRET.

🌐 Live Demo
You can view a live demo of the project here:

Live URL:  https://techelevate-lms.vercel.app/

👥 Demo Credentials
You can log in and test the application with the following demo account.

Email: kami.webdev1@gmail.com

Password: Demo123
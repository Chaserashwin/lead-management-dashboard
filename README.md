# Lead Management Dashboard

A full-stack CRM application for managing sales leads with advanced search, filtering, sorting, and analytics capabilities.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)

## 🚀 Live Demo

- **Frontend:** [https://your-app.vercel.app](https://lead-management-dashboard-blond.vercel.app)
- **Backend API:** [https://your-backend.onrender.com](https://lead-management-dashboard-backend.onrender.com)

### Demo Credentials

```
Username: demo
Password: demo123
```

> **Note:** You can also create your own account using the Register button.

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Seeding Database](#-seeding-database)
- [Running the Application](#-running-the-application)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### Lead Management

- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ Advanced search across multiple fields (name, email, company)
- ✅ Filter by stage (New, Contacted, Qualified, Negotiation, Converted)
- ✅ Filter by source (Website, Email, Phone, Referral, Event, Social Media)
- ✅ Sort by date, value, or any field
- ✅ Pagination with customizable page size
- ✅ Detailed lead view modal

### Analytics Dashboard

- 📊 Total leads count
- 📊 Converted leads tracking
- 📊 Conversion rate percentage
- 📊 Total revenue value
- 📊 Lead distribution by stage
- 📊 Lead distribution by source

### Authentication & Security

- 🔐 User registration and login
- 🔐 JWT-based authentication
- 🔐 Password hashing with bcrypt
- 🔐 Protected API routes
- 🔐 Token expiration (7 days)

### UI/UX

- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🚀 Fast page loads with Vite
- 💡 Intuitive navigation
- ⚡ Real-time search and filtering

---

## 🛠️ Technology Stack

### Frontend

- **React 18.2.0** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing

### Deployment

- **Vercel** - Frontend hosting
- **Render/Railway** - Backend hosting
- **MongoDB Atlas** - Database hosting (free tier)

---

## 📁 Project Structure

```
lead-management-dashboard/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── leadController.js
│   │   └── analyticsController.js
│   ├── models/
│   │   ├── Lead.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── leads.js
│   │   └── analytics.js
│   ├── middleware/
│   │   └── auth.js
│   ├── scripts/
│   │   └── seedLeads.js
│   ├── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LeadsTable.jsx
│   │   │   └── Analytics.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.local
│   ├── .gitignore
│   └── package.json
├── README.md
└── .gitignore
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** (free) - [Sign up](https://www.mongodb.com/cloud/atlas)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/lead-management-dashboard.git
cd lead-management-dashboard
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
touch .env

# Start development server
npm run dev
```

The backend server will start at `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env.local file (see Environment Variables section)
touch .env.local

# Start development server
npm run dev
```

The frontend will start at `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend/` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lead_dashboard?retryWrites=true&w=majority

# JWT Secret (minimum 32 characters)
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_characters_long

# Server Port
PORT=5000

# Environment
NODE_ENV=development
```

#### How to Get MongoDB URI:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account (M0 Free Tier)
3. Create a new cluster
4. Create a database user with username and password
5. Add IP Address: `0.0.0.0/0` (allows access from anywhere)
6. Click "Connect" → "Connect your application"
7. Copy the connection string and replace `<password>` with your actual password

### Frontend (.env.local)

Create a `.env.local` file in the `frontend/` directory:

```env
# Backend API URL (for local development)
VITE_API_URL=http://localhost:5000/api
```

For production deployment, update this to your deployed backend URL:

```env
# Backend API URL (for production)
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## 🌱 Seeding Database

The application includes a script to populate your database with 500 sample leads for testing.

### Run the Seed Script

```bash
# Navigate to backend directory
cd backend

# Run seed script
npm run seed
```

**Output:**

```
MongoDB connected
500 leads seeded successfully
```

### Seed Data Includes:

- **500 leads** with realistic data
- Various stages: New, Contacted, Qualified, Negotiation, Converted
- Multiple sources: Website, Email, Phone, Referral, Event, Social Media
- Random values between ₹10,000 - ₹500,000
- Indian phone numbers format

> **Note:** Running the seed script will clear all existing leads and create fresh data.

---

## 🏃 Running the Application

### Development Mode

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

### Production Build

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm run preview
```

### Access the Application

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Health Check: `http://localhost:5000/health`

---

## 🌐 Deployment

### Deploy Backend to Render

1. **Push code to GitHub:**

   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/lead-backend.git
   git push -u origin main
   ```

2. **Deploy on Render:**

   - Go to [Render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** `lead-management-backend`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Add environment variables (see Environment Variables section)
   - Click "Create Web Service"

3. **Get your backend URL:**
   - Example: `https://lead-management-backend.onrender.com`

### Deploy Frontend to Vercel

1. **Push code to GitHub:**

   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/lead-frontend.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**

   - Go to [Vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add environment variable:
     - **Name:** `VITE_API_URL`
     - **Value:** `https://your-backend-url.onrender.com/api`
   - Click "Deploy"

3. **Get your frontend URL:**
   - Example: `https://lead-management.vercel.app`

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "demo",
  "password": "demo123"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "demo",
  "password": "demo123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "demo"
}
```

### Lead Endpoints

All lead endpoints require authentication header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get All Leads (with filters)

```http
GET /api/leads?search=john&stage=New&source=Website&page=1&limit=10&sortBy=createdAt&order=desc
```

**Query Parameters:**

- `search` - Search across name, email, company
- `stage` - Filter by stage (New, Contacted, Qualified, Negotiation, Converted)
- `source` - Filter by source
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)
- `sortBy` - Sort field (createdAt, value, firstName, etc.)
- `order` - Sort order (asc, desc)

#### Get Single Lead

```http
GET /api/leads/:id
```

#### Create Lead

```http
POST /api/leads
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+919876543210",
  "company": "Tech Corp",
  "stage": "New",
  "value": 50000,
  "source": "Website",
  "notes": "Interested in our services"
}
```

#### Update Lead

```http
PUT /api/leads/:id
Content-Type: application/json

{
  "stage": "Contacted",
  "notes": "Follow up scheduled"
}
```

#### Delete Lead

```http
DELETE /api/leads/:id
```

#### Get Lead Statistics

```http
GET /api/leads/stats
```

### Analytics Endpoints

#### Get Analytics Dashboard

```http
GET /api/analytics
```

**Response:**

```json
{
  "success": true,
  "totalLeads": 500,
  "convertedLeads": 85,
  "conversionRate": "17.00",
  "totalValue": 125000000,
  "avgValue": 250000,
  "stageDistribution": [...],
  "sourceDistribution": [...],
  "leadsLast7Days": 42,
  "highValueLeads": 23
}
```

#### Get Revenue Analytics

```http
GET /api/analytics/revenue
```

---

## 📸 Screenshots

### Login Page

![Login Page](/public/1.png)

### Leads Dashboard

![Leads Dashboard](/public/2.png)

### Analytics View

![Analytics](/public/3.png)

### Lead Details Modal

![Lead Details](/public/4.png)

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem:** "MongoDB connection failed"

**Solutions:**

- Verify your `MONGODB_URI` in `.env` file
- Check if IP address is whitelisted in MongoDB Atlas (use `0.0.0.0/0`)
- Ensure your password is URL-encoded (replace special characters)
- Check your internet connection

### CORS Errors

**Problem:** API requests blocked by CORS policy

**Solutions:**

- Ensure backend has CORS middleware enabled
- Verify `VITE_API_URL` in frontend `.env.local` is correct
- Check if backend is running on the correct port

### Token Expiration

**Problem:** "Invalid token" or "Token expired"

**Solutions:**

- Login again to get a new token
- Tokens expire after 7 days
- Clear browser localStorage and login again

### Build Failures

**Problem:** npm install or build fails

**Solutions:**

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 14 or higher
- Check for any missing dependencies in `package.json`

### Render Cold Starts

**Problem:** First API request takes 30+ seconds

**Solutions:**

- This is normal on Render's free tier
- The service "spins down" after inactivity
- Subsequent requests will be fast
- Consider upgrading to paid tier for always-on service

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Ashwin Jaiswal**

- GitHub: [@yourusername](https://github.com/Chaserashwin)
- LinkedIn: [Your Profile](https://www.linkedin.com/in/ashwin--jaiswal)

---

## 🙏 Acknowledgments

- MongoDB Atlas for free database hosting
- Vercel for frontend hosting
- Render for backend hosting
- Tailwind CSS for styling utilities

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on [GitHub Issues](https://github.com/yourusername/lead-management/issues)
3. Contact: your.email@example.com

---

## 🚀 Future Enhancements

- [ ] Email notifications for lead updates
- [ ] Export leads to CSV/Excel
- [ ] Advanced reporting and charts
- [ ] Lead assignment to team members
- [ ] Activity timeline for each lead
- [ ] Bulk operations (delete, update stage)
- [ ] Dark mode support
- [ ] Mobile app version

---

**Made with ❤️ for testing lead management**

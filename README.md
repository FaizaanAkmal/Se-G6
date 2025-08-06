# DevLink 🚀

A modern job platform connecting talented developers with innovative companies. DevLink streamlines the hiring process by providing powerful tools for both job seekers and recruiters.

## ✨ Features

### For Developers
- 🔍 **Smart Job Search** - Find relevant opportunities tailored to your skills
- 💼 **Profile Management** - Showcase your skills, experience, and portfolio
- 📝 **Easy Applications** - Apply to jobs with custom cover letters
- 🔖 **Job Bookmarks** - Save interesting positions for later
- 📊 **Application Tracking** - Monitor your application status and offers
- 🎯 **Job Recommendations** - Get personalized job suggestions

### For Companies
- 📋 **Job Posting** - Create detailed job listings with specific requirements
- 👥 **Applicant Management** - Review and manage candidate applications
- ✅ **Hiring Tools** - Shortlist, accept, or reject candidates efficiently
- 💌 **Offer Management** - Send job offers directly through the platform
- 📈 **Company Dashboard** - Track all your job postings and applications

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Material-UI Joy** for modern, accessible UI components
- **React Router** for seamless navigation
- **Axios** for API communication

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for secure user sessions
- **RESTful API** architecture

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd DevLink
   ```

2. **Set up the Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Set up the Backend**
   ```bash
   cd server
   npm init
   npm install express mongoose cors body-parser dotenv nodemon
   npm start
   ```
   Backend will run on `http://localhost:8000`

4. **Configure Environment**
   - Create a `.env` file in the server directory
   - Add your MongoDB connection string and other environment variables

## 📁 Project Structure

```
DevLink/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   └── assets/         # Images and icons
├── server/                 # Node.js backend
│   ├── controllers/        # Business logic
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   └── middlewares/       # Custom middleware
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for connecting great developers with amazing opportunities! 
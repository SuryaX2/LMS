# 📚 Library Management System (LMS)

![https://via.placeholder.com/800x200?text=Library+Management+System](https://media.licdn.com/dms/image/v2/D5612AQGkHpb-Z2B1CQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1693328158461?e=1731542400&v=beta&t=hk55vajzaxjKppxqJg-48MpSpLV0-ArdFX51Xio9J5w)

## 🌐 Live Demo
[**Experience LMS on Vercel**](https://lms-7phy.vercel.app/)

---

## 🚀 Project Overview
This Library Management System is a powerful, full-stack application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). It offers a comprehensive solution for modern library management, empowering administrators to efficiently manage books while providing users with a seamless experience for browsing, borrowing, and returning books.

> 🏆 **Hosted on Vercel**: Both frontend and backend are deployed on Vercel for optimal performance and reliability.

---

## ✨ Key Features

- 🔐 **User Authentication**: 
  - Secure sign-up, login, and logout functionality
- 👨‍💼 **Admin Dashboard**: 
  - Add, edit, and delete books
  - Manage book requests
- 👤 **User Dashboard**: 
  - Browse available books
  - Borrow and return books
- 📝 **Book Requests**: 
  - Users can request books
  - Admins can manage these requests
- ☁️ **Cloud Storage Integration**: 
  - Book images stored using Cloudinary
- 📱 **Responsive Design**: 
  - Built with Tailwind CSS for a modern, responsive UI

---

## 🏗️ Project Structure

```
.
├── Backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
└── Frontend/
    └── myapp/
        ├── public/
        └── src/
            ├── Components/
            └── Pages/
                └── Dashboards/
```

<details>
<summary>Click to view detailed structure</summary>

```
.
├── Backend/
│   ├── .gitignore
│   ├── db.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── vercel.json
│   ├── middleware/
│   │   ├── authToken.js
│   │   └── multer.middleware.js
│   ├── models/
│   │   ├── BookRequest.js
│   │   ├── Books.js
│   │   └── user.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── bookRequest.js
│   │   ├── bookRoutes.js
│   │   └── user.js
│   └── utils/
│       └── cloudinary.js
└── Frontend/
    └── myapp/
        ├── .gitignore
        ├── package-lock.json
        ├── package.json
        ├── README.md
        ├── tailwind.config.js
        ├── vercel.json
        ├── public/
        │   ├── favicon.ico
        │   └── index.html
        └── src/
            ├── App.js
            ├── index.css
            ├── index.js
            ├── Components/
            │   ├── AddBook.js
            │   ├── BookCardSlider.js
            │   ├── Carousel.js
            │   ├── Footer.js
            │   ├── Forgot.js
            │   ├── HowItWorks.js
            │   ├── Login.js
            │   ├── Navbar.js
            │   ├── Signup.js
            │   └── Testimonial.js
            └── Pages/
                ├── Home.js
                └── Dashboards/
                    ├── Admin-Dashboard.js
                    └── User-Dashboard.js
```
</details>

---

## 🛠️ Technologies Used

### Frontend
- ⚛️ **React.js**: Component-based JavaScript library for building user interfaces
- 🎨 **Tailwind CSS**: Utility-first CSS framework for styling
- 🚀 **Vercel**: Hosting platform for frontend deployment

### Backend
- 🟢 **Node.js**: JavaScript runtime for server-side programming
- 🚂 **Express.js**: Web framework for Node.js to handle API requests
- 🍃 **MongoDB**: NoSQL database for storing book and user data
- ☁️ **Cloudinary**: Cloud storage for book images

### Tools
- 🔗 **Mongoose**: ODM for MongoDB, used to define schemas and models
- 📁 **Multer**: Middleware for handling file uploads
- 🔑 **JWT (JSON Web Token)**: Used for authentication
- 🚀 **Vercel**: Platform used to deploy the backend and frontend

---

## 💻 Local Setup

### Prerequisites
- Node.js
- MongoDB
- Vercel CLI (optional for deployment)

### Backend Setup
1. Navigate to the Backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the Frontend/myapp folder:
   ```bash
   cd Frontend/myapp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

> 🌐 The app will run on `http://localhost:3000` for the frontend and `http://localhost:3001` for the backend (assuming the backend is configured to run on port 3001).

---

## 🚀 Deployment

Both the frontend and backend are deployed using Vercel. To deploy your own instance:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Navigate to your project directory and run:
   ```bash
   vercel
   ```
3. Follow the prompts to deploy your project.

> 📚 For more detailed instructions, refer to [Vercel's deployment documentation](https://vercel.com/docs).

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

---

## 📞 Contact

For any queries or support, please open an issue on this repository.

---

<p align="center">Made with ❤️ by Surya Sekhar Sharma (SuryaX2)</p>

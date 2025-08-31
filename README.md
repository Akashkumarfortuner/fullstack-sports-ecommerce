# FitFlex: Full-Stack Sports E-commerce Platform

A complete, modern e-commerce web application for sports apparel and gear, built from the ground up with a Node.js backend and a Next.js frontend.

---

## ✨ Features

### Frontend (Client-Side)
- **Modern UI/UX:** A professional and responsive design built with Next.js and Tailwind CSS.
- **Dynamic Product Pages:** Server-rendered pages for product catalogs and detailed views for fast loading and SEO.
- **Interactive Shopping Cart:** Client-side state management with React Context for a seamless cart experience.
- **User Authentication:** Complete login and registration flow with JWT-based session management.
- **Protected Routes:** User profile and checkout are only accessible to authenticated users.

### Backend (Server-Side)
- **RESTful API:** A complete API built with Node.js and Express for managing products, users, and orders.
- **Secure Authentication:** JWT-based authentication and secure password hashing with `bcrypt`.
- **PostgreSQL Database:** A robust and scalable database with a well-structured schema.
- **Transactional Order System:** Atomic SQL transactions ensure data integrity for all orders, preventing issues like overselling.
- **CORS Handling:** Securely allows the frontend to communicate with the API.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Core Concepts:** RESTful APIs, JWT Authentication, Password Hashing, State Management (React Context), Database Schema Design, Git

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js (v18 or later)
- npm
- PostgreSQL

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Akashkumarfortuner/fullstack-sports-ecommerce.git](https://github.com/Akashkumarfortuner/fullstack-sports-ecommerce.git)
    cd fullstack-sports-ecommerce
    ```

2.  **Setup the Backend (`sports-api`):**
    ```bash
    # Navigate to the backend folder
    cd sports-api

    # Install dependencies
    npm install

    # Create a .env file and add your database credentials
    # (See .env.example if it exists)
    
    # Run the database schema scripts in pgAdmin to create the tables
    
    # Start the backend server (runs on http://localhost:3001)
    npm run dev
    ```

3.  **Setup the Frontend (`sports-store-ui`):**
    *Open a new terminal for this step.*
    ```bash
    # Navigate to the frontend folder
    cd sports-store-ui

    # Install dependencies
    npm install

    # Start the frontend server (runs on http://localhost:3000)
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🔮 Future Improvements

- **Admin Dashboard:** A dedicated interface for managing products, orders, and users.
- **Payment Gateway Integration:** Integrate Stripe or Razorpay for real transactions.
- **Advanced Filtering & Search:** Implement functional search and filtering on product pages.

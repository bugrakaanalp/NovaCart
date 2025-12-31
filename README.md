# NovaCart - Full Stack E-Commerce Platform

NovaCart is a modern, full-stack e-commerce application designed to demonstrate robust API architecture and a dynamic, custom-styled user interface.

![Project Preview]
<img width="2879" height="1583" alt="image" src="https://github.com/user-attachments/assets/3dc0a265-0732-4e99-b39d-129f8736fa0b" />

<img width="2876" height="1581" alt="image" src="https://github.com/user-attachments/assets/4566ff43-cf4f-453a-a429-339781ab91f0" />

## 🚀 Technologies Used

### Backend
* **C# .NET 8**
* **ASP.NET Core Web API**
* **Entity Framework Core** (Code-First)
* **Swagger/OpenAPI** Documentation

<img width="2879" height="1184" alt="image" src="https://github.com/user-attachments/assets/806bf436-16ea-4941-9e0d-9fac20f50caf" />


### Frontend
* **TypeScript**
* **Vite**
* **Modern CSS3** (Custom "Neon/Glassmorphism" Design, No Frameworks)
* **State Management** (Custom Store Logic)

## ✨ Key Features

* **Product Management:** Dynamic product listing with client-side filtering and caching mechanism.
* **Shopping Cart:** Real-time cart management with local storage persistence.
* **Order System:** Complete checkout flow capturing customer details (Name, Address, Phone).
* **Admin Dashboard:**
    * View all customer orders.
    * Track logistics status (Preparation -> Shipped).
    * Countdown timer for shipping deadlines (7-day logic).
    * Update tracking numbers.
* **Responsive UI:** Fully responsive design with dark mode aesthetics and glassmorphism effects.

## 📦 How to Run

### 1. Clone the Repository
```bash
git clone [https://github.com/bugrakaanalp/NovaCart.git](https://github.com/bugrakaanalp/NovaCart.git)
````

### 2. Setup Backend
Navigate to the API folder and run the server. The database will be created automatically via DbInitializer.

````bash
cd server/NovaCart.API
dotnet run
````

Server will start at http://localhost:PORT

### 3. Setup Frontend
Open a new terminal, navigate to the client folder, install dependencies, and start the app.

````bash
cd client
npm install
npm run dev
````
Client will start at http://localhost:PORT

### 👨‍💻 Developer
Developed by Buğra Kaan ALP.

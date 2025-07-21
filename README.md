# Securelytix - Full Stack Application

Securelytix is a full-stack application featuring authentication, client and employee management, built with React.js for the frontend and Node.js + Express for the backend.

---

## 📂 Project Structure

```
securelytix/
├── backend/                # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── middleware/
│   ├── .env
│   └── server.js
│
├── frontend/               # React frontend with Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── .env
│
└── README.md
```

---

## 🚀 Technologies Used

### Frontend:
- React.js
- Tailwind CSS
- Axios
- React Router
- Formik + Yup

### Backend:
- Node.js
- Express.js
- MongoDB (via Mongoose)
- dotenv
- CORS
- Body-parser

---

## 🌐 Frontend Setup (`/frontend`)

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Environment Variables

Create a `.env` file in `/frontend`:

```
REACT_APP_BASE_URL=http://localhost:5000
```

> Change this to your backend deployed URL in production.

### 3. Run the frontend

```bash
npm start
```

### 4. Available Routes

| Path         | Description                  |
|--------------|------------------------------|
| `/signup`    | Signup page                  |
| `/login`     | Login page                   |
| `/dashboard` | Dashboard with user data     |

---

## 🧠 Backend Setup (`/backend`)

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in `/backend`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Start the backend

```bash
npm run dev
```

This uses `nodemon` for hot reloading.

### 4. API Endpoints

| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/api/clients`      | Fetch list of clients    |
| GET    | `/api/employees`    | Fetch list of employees  |
| POST   | `/api/auth/login`   | Login                    |
| POST   | `/api/auth/signup`  | Signup                   |

---

## 🧪 Testing & Usage

1. Navigate to `http://localhost:3000`.
2. Create an account via `/signup`.
3. Login via `/login`.
4. Use `/dashboard` to view client & employee selection cards.
5. All data is fetched from your Node API via Axios.

---

## 🎨 Theme

- Dark Mode UI with smooth transitions
- Glassmorphism cards on Dashboard
- Fully responsive on all devices

---

## 📦 Deployment Notes

- Use [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for React frontend.
- Use [Render](https://render.com), [Railway](https://railway.app), or [Heroku](https://heroku.com) for backend.
- Remember to replace `.env` values with production credentials.

---

## ✍️ Author

Made with ❤️ by [Your Name]

---

## 📄 License

This project is licensed under the MIT License.
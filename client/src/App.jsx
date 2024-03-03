import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import "./App.css";
import SingleEventPage from "./pages/SingleEventPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateEventPage from "./pages/EventsFormPage";
import { UserContextProvider } from "./Context/UserContext";
import EventsFormPage from "./pages/EventsFormPage";

axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = "https://invite-theta.vercel.app";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<SingleEventPage />} />
            <Route path="/create" element={<CreateEventPage />} />
            <Route path="/edit/:id" element={<EventsFormPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;

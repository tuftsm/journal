import axios from 'axios';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Workouts from "./pages/Workouts";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import Academics from "./pages/Academics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Personal" element={<Personal />} />
          <Route path="Workouts" element={<Workouts />} />
          <Route path="Academics" element={<Academics />} />
          <Route path="*" element={<Navigate to="/" />}  />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



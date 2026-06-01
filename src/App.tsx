import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPage from "./pages/AddPage";
import InvitationPage from "./pages/InvitaionPage";
import ListPage from "./pages/ListPage";
import MainPage from "./pages/MainPage";
import NowPlayingPage from "./pages/NowPlayingPage";
import LoginPage from "./pages/member/LoginPage";
import RegisterPage from "./pages/member/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/myMusic" element={<NowPlayingPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/invitation" element={<InvitationPage />} />
        <Route path="/member/register" element={<RegisterPage />} />
        <Route path="/member/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/favoritesContext";
import { ToastProvider } from "./context/toastContext";

import HomePage from "./pages/home";
import ExplorePage from "./pages/explore";
import DetailPage from "./pages/detail";
import FavoritesPage from "./pages/favorites";
import ContactPage from "./pages/contact";

import NotFoundPage from "./pages/notFound";

import Navbar from "./components/navbar";

function App() {
  return (
    <ToastProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explorar" element={<ExplorePage />} />
            <Route path="/pokemon/:id" element={<DetailPage />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </ToastProvider>
  );
}

export default App;

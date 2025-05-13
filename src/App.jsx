
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Routes>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

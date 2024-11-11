import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainCard from "./pages/MainCard";
import PreviewPage from "./pages/PreviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<MainCard />} />
          <Route path="/previewPage" element={<PreviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

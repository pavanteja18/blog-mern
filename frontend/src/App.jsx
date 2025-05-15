// App.jsx
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";

function App() {
  return (
    <Box minH={"100vh"}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;

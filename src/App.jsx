import DataForm from "./components/DataForm.jsx";
import { Route, Routes } from "react-router-dom";
import Add from "@/components/Add.jsx";
import Edit from "@/components/Edit.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DataForm />} />
      <Route path="/create" element={<Add />} />
      <Route path="/update/:id" element={<Edit />} />
    </Routes>
  );
}

export default App;

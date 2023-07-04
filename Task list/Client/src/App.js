import { Routes,  Route } from "react-router-dom";
import Task from "./Component/task";
import Name from "./Component/name";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Name />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </>
  );
}

export default App;

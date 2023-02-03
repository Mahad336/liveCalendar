import "./index.css";
import Calendar from "./pages/calendar/Calendar";
import NavBar from "./components/navbar/NavBar";
import Form from "./components/auth/form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/privateRoutes/PrivateRoutes";
import EventUpdate from "./pages/updateEvents/eventUpdate";
import CreateEvent from "./pages/createEvent/createEvent";
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/event" element={<CreateEvent />} />
              <Route path="/event/:id" element={<EventUpdate />} />
            </Route>
            <Route path="/" element={<Form />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

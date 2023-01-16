import "bootstrap/dist/css/bootstrap.min.css";
import "./calendarLogics/index.css";
import Calendar from "./calendarLogics/Calendar";
import NavBar from "./NavBar";
import Create from "./createEvent/Create";
import CreateAllDay from "./createEvent/CreateAllDay";
import Form from "./auth/form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AutoComplete from "./APIs/AutoComplete";
import EventUpdate from "./updateEvents/eventUpdate";
import AllDayEventUpdate from "./updateEvents/alldayEventUpdate";
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/create-event" element={<Create />} />
              <Route path="/create-all-day" element={<CreateAllDay />} />
              <Route path="/event-update/:id" element={<EventUpdate />} />
              <Route
                path="/allDayEvent-update/:id"
                element={<AllDayEventUpdate />}
              />
            </Route>
            <Route path="/" element={<Form />} />
            <Route path="/form" element={<Form />} />
            <Route path="/auto" element={<AutoComplete />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

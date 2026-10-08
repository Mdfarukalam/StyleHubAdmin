import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Page/Home";
import User from "./Page/User";
import Men from "./Page/Men";
import Women from "./Page/Women";
import Kids from "./Page/Kids";
import Dashboard from "./Page/Dashboard";
import Top_Product from "./Page/Top_Product";
import New_Arrivals from "./Page/New_Arrivals";
import Login from "./component/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
<Route path="/" element={<Login />} />

        {/* Admin Layout */}
        <Route path="/" element={<Home />}>
           <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<User />} />

          <Route path="men" element={<Men />} />

          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />
        <Route path="top-product" element={<Top_Product />} />
                <Route path="new-arrivals" element={<New_Arrivals />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
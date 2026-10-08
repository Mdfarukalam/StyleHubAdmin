import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Page/Home";
import User from "./Page/User";
import Men from "./Page/Men";
import Women from "./Page/Women";
import Kids from "./Page/Kids";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin Layout */}
        <Route path="/" element={<Home />}>

          <Route path="users" element={<User />} />

          <Route path="men" element={<Men />} />

          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
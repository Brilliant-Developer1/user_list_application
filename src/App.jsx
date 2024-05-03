import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './pages/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import UserDetailsCard from './components/userCards/UserDetailsCard';
import UserData from './components/userCards/UserData';

function App() {
  return (
    <Router>
      <div className="flex flex-col sm:flex-row ">
        <Sidebar />
        <div className="flex-1 ">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserData />} />
            <Route
              path="/userDetailsCard/:userId"
              element={<UserDetailsCard />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

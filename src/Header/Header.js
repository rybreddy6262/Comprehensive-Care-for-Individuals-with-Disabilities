import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ⬅️ import useNavigate
import { LogOut} from 'lucide-react';
import './Header.css';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate(); // ⬅️ create navigate function

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate('/'); // ⬅️ now works
  };

  return (
    <div className="header">
      {/* Desktop Navigation */}
      <nav className="nav-desktop">
        <Link to="/home" className="nav-item">Home <span className="nav-underline"></span></Link>
        <Link to="/dashboard" className="nav-item">Dashboard <span className="nav-underline"></span></Link>
        <Link to="/mybookings" className="nav-item">My Bookings <span className="nav-underline"></span></Link>
        <Link to="/caregivers" className="nav-item">Our CareGivers <span className="nav-underline"></span></Link>
        <Link to="/partners" className="nav-item">Exam Center Partners <span className="nav-underline"></span></Link>
      </nav>

      {/* Desktop Logout */}
      <div className="logout-section">
        <button onClick={onClickLogout} className="btn-logout">
          <LogOut className="icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;

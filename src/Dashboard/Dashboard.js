import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Video, 
  Clock, 
  Users, 
  MessageSquare, 
  BookOpen, 
  MapPin, 
  AlertCircle,
  RefreshCw,
  Phone,
  User
} from 'lucide-react';
import ZoomMeeting from '../ZoomMeeting/ZoomMeeting';
import './Dashboard.css';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showZoomMeeting, setShowZoomMeeting] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionsData, setSessionsData] = useState([
    {
      id: 1,
      title: 'Pre-program consultation',
      time: '3:00 PM',
      status: 'Pending',
      type: 'consultation',
      caregiver: {
        name: 'Sarah Johnson',
        specialty: 'Academic Support Specialist',
        imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    },
    {
      id: 2,
      title: 'Daily check-in call',
      time: '6:00 PM',
      status: 'Pending',
      type: 'checkin',
      caregiver: {
        name: 'Michael Davis',
        specialty: 'Care Coordinator',
        imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    },
    {
      id: 3,
      title: 'Post-program follow-up',
      time: '8:00 PM',
      status: 'Pending',
      type: 'followup',
      caregiver: {
        name: 'Emily Wilson',
        specialty: 'Follow-up Specialist',
        imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
      }
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const upcomingPrograms = [
    {
      id: 1,
      title: 'Mathematics Program',
      date: '2025-06-15',
      time: '10:00 AM',
      caregiver: 'Sarah Johnson',
      type: 'Academic Support'
    },
    {
      id: 2,
      title: 'Physics Program',
      date: '2025-06-18',
      time: '2:00 PM',
      caregiver: 'Michael Davis',
      type: 'Academic Support'
    }
  ];

  // Calculate dynamic stats
  const completedSessions = sessionsData.filter(session => session.status === 'Completed').length;
  const totalSessions = sessionsData.length;
  const pendingSessions = sessionsData.filter(session => session.status === 'Pending').length;

  const stats = {
    upcomingPrograms: upcomingPrograms.length,
    completedSessions: completedSessions,
    totalSessions: totalSessions,
    nextProgramDays: 5
  };

  const handleJoinZoom = (session) => {
    setSelectedSession(session);
    setShowZoomMeeting(true);
  };

  const handleZoomMeetingClose = () => {
    setShowZoomMeeting(false);
    setSelectedSession(null);
  };

  const handleSessionComplete = (sessionId) => {
    setSessionsData(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId 
          ? { ...session, status: 'Completed' }
          : session
      )
    );
    setShowZoomMeeting(false);
    setSelectedSession(null);
  };

  const handleSessionCancel = (sessionId) => {
    setSessionsData(prevSessions => 
      prevSessions.map(session => 
        session.id === sessionId 
          ? { ...session, status: 'Cancelled' }
          : session
      )
    );
  };

  return (
    <>
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your activity overview</p>
          </div>
          <div className="dashboard-actions">
            <button className="emergency-btn">
              <AlertCircle size={16} />
              Emergency Alert
            </button>
            <button className="switch-role-btn">
              <User size={16} />
              Switch Role
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-nav">
          <div className="nav-item active">
            <Calendar size={18} />
            Dashboard
          </div>
          <div className="nav-item">
            <Users size={18} />
            Caregivers
          </div>
          <div className="nav-item">
            <MapPin size={18} />
            Exam Centers
          </div>
          <div className="nav-item">
            <MessageSquare size={18} />
            Communication
          </div>
          <div className="nav-item">
            <BookOpen size={18} />
            My Bookings
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card upcoming-programs">
              <div className="stat-header">
                <h3>Upcoming Programs</h3>
                <Calendar size={20} />
              </div>
              <div className="stat-number">{stats.upcomingPrograms}</div>
              <div className="stat-subtitle">Next program in {stats.nextProgramDays} days</div>
            </div>

            <div className="stat-card todays-sessions">
              <div className="stat-header">
                <h3>Today's Zoom Sessions</h3>
                <RefreshCw size={20} />
              </div>
              <div className="stat-number">{stats.completedSessions}/{stats.totalSessions}</div>
              <div className="stat-subtitle">Sessions completed</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Upcoming Program Support */}
            <div className="content-card program-support">
              <div className="card-header">
                <h3>Upcoming Program Support</h3>
                <p>Your scheduled program assistance sessions</p>
              </div>
              
              <div className="programs-list">
                {upcomingPrograms.map((program) => (
                  <div key={program.id} className="program-item">
                    <div className="program-info">
                      <h4>{program.title}</h4>
                      <p className="program-date">{program.date} at {program.time}</p>
                      <p className="program-caregiver">Caregiver: {program.caregiver}</p>
                    </div>
                    <button className="contact-btn">
                      <MessageSquare size={16} />
                      Contact
                    </button>
                  </div>
                ))}
              </div>
              
              <button className="view-all-btn">View All Programs</button>
            </div>

            {/* Today's Zoom Sessions */}
            <div className="content-card zoom-sessions">
              <div className="card-header">
                <h3>Today's Zoom Sessions</h3>
                <p>Your video consultation schedule for today</p>
              </div>
              
              <div className="sessions-list">
                {sessionsData.map((session) => (
                  <div key={session.id} className="session-item">
                    <div className="session-icon">
                      {session.type === 'consultation' && <Video size={20} />}
                      {session.type === 'checkin' && <Phone size={20} />}
                      {session.type === 'followup' && <Clock size={20} />}
                    </div>
                    <div className="session-info">
                      <h4>{session.title}</h4>
                      <p className="session-time">{session.time}</p>
                    </div>
                    <div className="session-actions">
                      <div className={`session-status ${session.status.toLowerCase()}`}>
                        {session.status}
                      </div>
                      {session.status === 'Pending' && (
                        <div className="session-buttons">
                          <button 
                            className="join-zoom-btn"
                            onClick={() => handleJoinZoom(session)}
                          >
                            <Video size={14} />
                            Join
                          </button>
                          <button 
                            className="cancel-session-btn"
                            onClick={() => handleSessionCancel(session.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Meeting Modal */}
      {showZoomMeeting && selectedSession && (
        <ZoomMeeting 
          session={selectedSession}
          onClose={handleZoomMeetingClose}
          onComplete={() => handleSessionComplete(selectedSession.id)}
        />
      )}
    </>
  );
};

export default Dashboard;
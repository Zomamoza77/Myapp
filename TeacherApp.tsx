import React, { useState } from 'react';
import TeacherLogin from './TeacherLogin';
import TeacherDashboard from './TeacherDashboard';

const TeacherApp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <TeacherDashboard />
      ) : (
        <TeacherLogin onLogin={handleLogin} />
      )}
    </>
  );
};

export default TeacherApp;
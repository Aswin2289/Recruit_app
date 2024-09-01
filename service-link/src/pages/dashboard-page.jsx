import React from 'react';
import Header from '../components/header/header';
import Dashboard from '../components/dashboard';

function DashboardPage() {
  return (
    <>
      <Header />
      <div className="pt-20"> {/* Adjust padding based on header height */}
        <Dashboard />
      </div>
    </>
  );
}

export default DashboardPage;

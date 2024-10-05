import React from 'react';
import Header from '../components/header/header';
import DashboardCompany from '../components/dashboard-company';

function DashboardPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 mt-20">
        <DashboardCompany />
      </div>
    </div>
  );
}

export default DashboardPage;

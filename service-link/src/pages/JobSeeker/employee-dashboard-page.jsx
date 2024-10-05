import React from 'react'
import Header from '../../components/header/header';
import DashboardEmployee from '../../components/employee/dashboard-employee';

const EmployeeDashboardPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 mt-20">
        <DashboardEmployee />
      </div>
    </div>
  )
}

export default EmployeeDashboardPage;
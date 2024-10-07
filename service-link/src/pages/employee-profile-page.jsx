import React from 'react'
import Header from '../components/header/header'
import EmployeeProfile from '../components/employee-profile'

const EmployeeProfilePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 mt-20">
        <EmployeeProfile />
      </div>
    </div>
  )
}

export default EmployeeProfilePage
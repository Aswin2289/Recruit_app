import React from 'react'
import Header from '../../components/header/header'
import EmployeeDetailView from '../../components/employee/employee-detail-view'

const EmployeeDetailViewPage = () => {
  return (
    <div className="flex flex-col h-screen">
    <Header />
    <div className="flex-1 mt-20">
      <EmployeeDetailView />
    </div>
  </div>
  )
}

export default EmployeeDetailViewPage
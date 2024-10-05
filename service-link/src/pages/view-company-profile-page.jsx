import React from 'react'
import Header from '../components/header/header'
import ViewCompanyProfile from '../components/view-company-profile'

const ViewCompanyProfilePage = () => {
  return (
    <>
    <Header />
    <div className="pt-20"> {/* Adjust padding based on header height */}
      {/* <Dashboard /> */}
      <ViewCompanyProfile/>
    </div>
  </>
  )
}

export default ViewCompanyProfilePage
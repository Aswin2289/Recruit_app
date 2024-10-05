import React from 'react'
import Header from '../components/header/header'
import ViewCompanyWisePost from '../components/view-company-wise-post'

const ViewCompanyWisePostPage = () => {
  return (
    <>
    <Header />
    <div className="pt-20"> {/* Adjust padding based on header height */}
      {/* <Dashboard /> */}
      <ViewCompanyWisePost/>
    </div>
  </>
  )
}

export default ViewCompanyWisePostPage
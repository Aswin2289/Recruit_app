import React from 'react'
import Header from '../../components/header/header'
import ViewAllJobPost from '../../components/employee/view-all-job-post'

const ViewAllJobPostPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 mt-20">
        <ViewAllJobPost />
      </div>
    </div>
  )
}

export default ViewAllJobPostPage
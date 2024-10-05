import React from 'react'
import Header from '../components/header/header';
import JobDetails from '../components/job-details';

const JobDetailPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 mt-20">
        <JobDetails />
      </div>
    </div>
  )
}

export default JobDetailPage;
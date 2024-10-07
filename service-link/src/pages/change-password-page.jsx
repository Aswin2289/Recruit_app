import React from 'react'
import Header from '../components/header/header'
import ChangePassword from '../components/change-password'

const ChangePasswordPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 mt-20">
        <ChangePassword />
      </div>
    </div>
  )
}

export default ChangePasswordPage
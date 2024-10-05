
import React from 'react'
import Header from '../components/header/header';
import CreatePost from '../components/create-post';

const CreatePostPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 mt-20">
        <CreatePost />
      </div>
    </div>
  )
}

export default CreatePostPage;
import React from 'react'
import Stories from './Stories'
import Posts from './Posts'

function Feed() {
  return (
    <div>
        <div><Stories/></div>
        <div  className='d-flex flex-column justify-content-center'><Posts/></div>

    </div>
  )
}

export default Feed

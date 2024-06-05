import React from 'react'

const LikeButton = (props) => {
    const {href} = props
  return (
    <div className="fb-like" data-href={href} 
    data-width="" data-layout="" data-action="" data-size="" data-share="true"></div>
  )
}

export default LikeButton
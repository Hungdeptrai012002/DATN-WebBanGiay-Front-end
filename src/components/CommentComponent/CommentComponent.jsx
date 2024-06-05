import React from 'react'

const CommentComponent = (props) => {
    const {href, width} = props
  return (
    <div style={{margin: '-10px -12px 0', marginTop:'20px'}}>
      <div className="fb-comments" data-href={href} 
      data-width={width} data-numposts="5"></div>
    </div>
  )
}

export default CommentComponent
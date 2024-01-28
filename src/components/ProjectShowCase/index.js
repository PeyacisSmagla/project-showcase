import './index.css'
import React from 'react'

const ProjectShowCase = props => {
  const {details} = props
  const {imageUrl, name} = details
  return (
    <li className="list-ProjectShowCase">
      <img className="image-ProjectShowCase" src={imageUrl} alt={name} />
      <p className="para-ProjectShowCase">{name}</p>
    </li>
  )
}

export default ProjectShowCase

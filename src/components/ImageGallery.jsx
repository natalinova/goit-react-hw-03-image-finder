import React from 'react'

export default function ImageGallery(array, id, url) {

    const list = array.map((item) => {
        return <li key={id}>
                <img src={url} alt='' />
            </li>

    })
  return (
      <ul>{ list}</ul>
  )
}

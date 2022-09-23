import React from 'react';
import './styles.css'


export default function ImageGallery({ array, loadModal }) {
    console.log(array)
    const list = array.map(({id, previewURL, largeImageURL}) => {
        return <li className='ImageGalleryItem' key={id}>
          <img className='ImageGalleryItem-image' src={previewURL} alt='' onClick={loadModal} />
            </li>

    })
    console.log(list)
    return (
      <>
            <ul className='ImageGallery'>{list}</ul>  
           
      </>
      
  )
}

ImageGallery.defaultProps={array: []}
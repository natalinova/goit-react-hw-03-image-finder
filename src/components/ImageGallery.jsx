import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import './styles.css'


export default function ImageGallery({ array}) {
    console.log(array)
    const list = array.map(({id, previewURL, largeImageURL}) => {
      return <ImageGalleryItem
        id={id}
        previewURL={previewURL}
        largeImageURL={largeImageURL} />

    })
    
    return (
      <>
        <ul className='ImageGallery'>{list}</ul>       
      </> 
    )
}

ImageGallery.defaultProps={array: []}
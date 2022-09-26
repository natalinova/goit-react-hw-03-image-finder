import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import axios from 'axios';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';

const Search = async (page, query) => {
    const result = await axios.get(`https://pixabay.com/api/?key=29442705-65f5f0476d101e3a0092bd469&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`)
    const dataImage = result.data.hits;
    if (dataImage.length === 0) {
        return Promise.reject(new Error(` Not any images with key word ${query}`))
    }
    
        return dataImage
    }

export class App extends Component {
   state = {
        image:[],
        page:1,
        error: null,
     status: 'idle',
     query: ''
   }
  componentDidUpdate(prevProps, prevState) {
        const {page} = this.state
        const nextQuery = this.state.query
        if (page !== prevState.page) {
          this.fetchImage(page, nextQuery)
        }
  }

async fetchImage(page, query) {
       
        try {   
          this.setState({ status: 'pending' });
          const data = await Search(page, query);
         
            this.setState(({ image }) => { return { image: [...image, ...data] } });
            this.setState({ status: 'resolved' });
        }

        catch (error){
        
          this.setState({ error: `Not any images with key word ${query}`, status: 'rejected' });
  }
}

  LoadMore = () => {  
    this.setState(({ page }) => { return { page: page + 1 } })
  }
  
  handleFormSubmit = query => {
      this.setState({ query: query, image: [], page: 1 });
      const { page } = this.state;
    this.fetchImage(page, query)
  }
  render() {
     const { status, image, error } = this.state;
    return(
        <div>
        <SearchBar
          clearData={this.clearImage}
          onSubmit={this.handleFormSubmit} />
             {(status === 'idle') && <div className='IdleMessage'> Do you want to find  some images? </div>}

        {(status === 'pending') &&
          <>
          <ImageGallery
            array={image}
          />
            <Loader />
          </>
        }

        {(status === 'rejected') &&
          <div className='Error'>{error}</div>};
      
        {(status === 'resolved') &&
          <>
            <ImageGallery
               array={image}
            />
            <Button onClick={ this.LoadMore} />
          </>}    
      </div>
    )
  }
}
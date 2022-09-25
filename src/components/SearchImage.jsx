import axios from 'axios';
import React, { Component } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
// import Modal from './Modal';


const Search = async (page, query) => {
    const result = await axios.get(`https://pixabay.com/api/?key=29442705-65f5f0476d101e3a0092bd469&q=${query}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`)
    const dataImage = result.data.hits;
    if (dataImage.length === 0) {
        return Promise.reject(new Error(` Not any images with key word ${query}`))
    }
    
        return dataImage
    }

export default class SearchImage extends Component {
    state = {
        image:[],
        page:1,
        error: null,
        status: 'idle',

    }
    componentDidUpdate(prevProps, prevState) {
        const {page} = this.state
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query
        if (prevQuery !== nextQuery || page !== prevState.page) {
            this.fetchImage(page,nextQuery)
        }
       
    }

    async fetchImage() {
        const { page} = this.state;
        const { query } = this.props;
        

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
        
       this.setState(({page}) => {return {page: page + 1}})
       
    }

    
    render() {
        const { status, image, error } = this.state;
      if(status === 'idle')
            return
        <div className='IdleMessage'> Do you want to find  some images? </div>
        if (status === 'pending')
            return (
                <>
                    <ImageGallery
                        array={image}
                     />
                    <Loader />
                </>
            )
        
        if (status === 'rejected')
            return <div className='Error'>{ error}</div>
        if (status === 'resolved')
            return (
                <>
                    <ImageGallery
                        array={image}
                     />
                    <Button onClick={ this.LoadMore} />
        
                    
                </>
               
            )   
  }
}

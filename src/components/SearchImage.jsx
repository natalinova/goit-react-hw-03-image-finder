import axios from 'axios';
import React, { Component } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';


const Search = async (page, query) => {
    const result = await axios.get(`https://pixabay.com/api/?key=29442705-65f5f0476d101e3a0092bd469&q=${query}&image_type=photo&orientation=horizontal&page${page}&per_page=12`)
    const dataImage = result.data.hits;
        return dataImage
    }

export default class SearchImage extends Component {
    state = {
        image:[],
        page:1,
        error: null,
        status: 'idle',
        showModal: false,
        modalContent:''
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
    this.setState({ status: 'pending' })
    const data = await Search(page, query)
    try {   

        this.setState(({image}) => {return {image:[...image, ...data]}})
        console.log(data);
        console.log(this.state.image)
         this.setState({ status: 'resolved' })
    }
    catch (error){
        
        this.setState({ error:'ALL IS BED!', status: 'rejected' })
    }
}
    LoadMore = () => {

       this.setState(({page}) => {return {page: page + 1}})
       
    }
     toggleModal = () => {
       this.setState(({showModal}) => ({
           showModal: !showModal
       }))
     }
    
    render() {
        const {status, image, showModal, modalContent} = this.state
      if(status === 'idle')
      return  <div className='IdleMessage'> Do you want to find  some images? </div>
        if (status === 'pending')
            return <Loader/>
        if (status === 'rejected')
            return <div>Error</div>
        if (status === 'resolved')
            return (
                <>
                    <ImageGallery
                        array={image}
                        loadModal={this.toggleModal} />
                    <Button onClick={ this.LoadMore} />
                    {/* <button onClick={this.LoadMore}>Load more</button> */}

             {showModal && (<Modal OnClose={this.toggleModal}> 
                        <img src={modalContent} alt='' />
                   <button type="button" onClick={this.toggleModal}> Close modal</button>
                    </Modal>)}
                    
                </>
               
            )
                

        
     
    
  }
}

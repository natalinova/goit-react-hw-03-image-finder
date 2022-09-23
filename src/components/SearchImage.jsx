import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Loader from './Loader';

 const Search = (page, query) => {
     fetch(`https://pixabay.com/api/?key=29442705-65f5f0476d101e3a0092bd469&q=${query}&image_type=photo&orientation=horizontal&page${page}&per_page=12`)
         .then(response => {
             console.log(response)
             if (response) { return response.json() }
             return Promise.reject(new Error(`No any images with key word`))
         })
         .catch()
        // console.log(result)
    }

export default class SearchImage extends Component {
    state = {
        image:[],
        page:1,
        error: null,
        status:'idle'
    }
    componentDidUpdate(prevProps, prevState) {
        const {page} = this.state
        const prevQuery = prevProps.query;
        const nextQuery = this.props.query
        if (prevQuery !== nextQuery || page !== prevState.page) {
            this.fetchImage(page,nextQuery)
        }
        // if (prevQuery !== nextQuery) {
        //     this.setState({ status: 'pending' })
        //     fetch(`https://pixabay.com/api/?key=29442705-65f5f0476d101e3a0092bd469&q=${nextQuery}&image_type=photo&orientation=horizontal&page${this.state.page}&per_page=12`)
        //         .then(response => {
        //             if (response.ok) {
        //             return response.json()
        //             }
        //             return Promise.reject(new Error(`No any images with key word ${nextQuery}`))
        //         })
               
        //         .then(queryImage => {
        //             this.setState({ status: 'resolved' })
        //             //  тут потрібно додати деструктуризовані масиви, але спочатку їх витягнути
        //             this.setState({ image: queryImage })
                    
        //         })
        //     .catch(error => this.setState({error:(`No any images with key word ${nextQuery}`), status: 'rejected'}))
        // }
    
    }
    async fetchImage() {
    const { page } = this.state;
    const { query } = this.props;
    this.setState({ status: 'pending' })
    
    try {
        const data = Search(page, query)
        console.log(data)
         this.setState({ status: 'resolved' })
    }
    catch {
        this.setState({ error:'ALL IS BED!', status: 'rejected' })
    }
}
   
    render() {
        const {status} = this.state
      if(status === 'idle')
      return  <div> Do you want to find  some images? </div>
        if (status === 'pending')
            return <Loader/>
        if (status === 'rejected')
            return <div>Error</div>
        if (status === 'resolved')
            return
        <ImageGallery
                array={this.state.image.hits}
                id={this.state.image.hits.id}
            url={this.state.image.hits.previewURL}
        />
     
    
  }
}

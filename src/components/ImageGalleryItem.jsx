import React, { Component } from 'react';
import Modal from './Modal';
import './styles.css'


export default class ImageGalleryItem extends Component {
    state = {
    showModal:false
    }
    toggleModal = () => {
       this.setState(({showModal}) => ({
           showModal: !showModal
       }))
     }
  render() {
      return (
        <>
              <li
                  className='ImageGalleryItem' key={this.props.id}>
                  <img
                      className='ImageGalleryItem-image' src={this.props.previewURL} alt='' onClick={this.toggleModal} />
                </li>
              {this.state.showModal && (
                  <Modal OnClose={this.toggleModal}> 
                    <img className='ModalImage'
                        src={this.props.largeImageURL}
                        alt=''
                        loading = "lazy"/>
                     <button
                          className='ModalButton'
                          type="button"
                          onClick={this.toggleModal}> Close modal</button>
                  </Modal>)} 
        </>
    )
  }
}

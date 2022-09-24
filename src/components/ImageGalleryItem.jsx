import { Component } from "react";
import { createPortal } from "react-dom";

const ModalRoot = document.querySelector('#modal-root')
console.log(ModalRoot)
export default class Modal extends Component {
    componentDidMount() {
        console.log('Modal !!ComponentDidMount')
        window.addEventListener('keydown', this.handleKeyDown)
    }
    componentWillUnmount() {
        console.log('Modal ComponentUnMount')
        window.removeEventListener('keydown', this.handleKeyDown)
    }
    handleKeyDown = e => {
            if (e.code === 'Escape'){
                console.log('it need to close modal');
                console.log(this.props);
                this.props.OnClose()
            }
    }
    handleBackdropClick = e => {
        console.log('click in backdrop');  
        console.log(e.target)
        console.log(e.currentTarget)
        if (e.target === e.currentTarget) {
            this.props.OnClose()
        }
    }
    render() {
        return createPortal(<div className="Overlay" onClick={this.handleBackdropClick}>
            <div className="Modal__content">{this.props.children}</div>
        </div>, ModalRoot,
        );
    }
}
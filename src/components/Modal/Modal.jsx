import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.modalClose);
    };
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.modalClose);
    };
    
    modalClose = event => {
        if (event.code === 'Escape' || event.target === event.currentTarget) {
            this.props.onClick();
        };
    };

    render() {
        // console.log(this.props);
        const { url, alt } = this.props

        return (
            <div className={s.overlay} onClick={this.modalClose}>
                <div className={s.modal}>
                    <img src={url} alt={alt} />
                </div>
            </div>
        );
    };
};

export default Modal;

Modal.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}
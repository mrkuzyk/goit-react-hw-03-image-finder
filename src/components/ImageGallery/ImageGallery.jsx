import { Component } from "react";
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css'
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

export default class ImageGallery extends Component{
    state = {
        images: [],
        error: null,
        status: 'idle',
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.imageName;
        const nextName = this.props.imageName;

        if (this.state.images === []) {
            return (console.log('hto'))
        }
        
        // якщо попередній пошук відрізняється він наступного то ми шукаємо
        if (prevName !== nextName) {
            this.setState({status: 'pending'}) //включаю лоадер
            fetch(`https://pixabay.com/api/?q=${nextName}&page=1&key=27124011-562ac77f1fd2864e5ddfeb16c&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    return Promise.reject (
                        new Error(`Незнайдено зображень з ім'ям ${nextName}`)
                    )
                })
                .then(images =>
                    // console.log(images.hits)
                    this.setState(prevState => ({
                        images: images.hits,
                        status: 'resolved'
                    }))
                )
                .catch(error => this.setState({error, status: 'rejected'}))
        };
    };

    render() {
        const { error, images, status } = this.state;

        if (status === 'idle') {
            return <h1>Введіть назву зображення</h1>
        }

        if (status === 'pending') {
            return <div>Завантаження</div>
        }

        if (status === 'rejected') {
            return <h1>{error.message}</h1>
        }

        if (images.length === 0) {
            return <h1>Незнайдено зображень з ім'ям {this.props.imageName}</h1>
        }

        if (status === 'resolved') { 
            return (
                <ul className={s.gallery}>
                {images.map(({ id, webformatURL, tags }) =>
                    <ImageGalleryItem
                        key={id}
                        webformatURL={webformatURL}
                        tags={tags}
                    />)}
                </ul>)
        }
    };
};

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired
}
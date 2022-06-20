import { Component } from "react";
import PropTypes from 'prop-types';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from  'react-loader-spinner'
import s from './ImageGallery.module.css'
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

export default class ImageGallery extends Component{
    state = {
        images: [],
        error: null,
        // status: 'idle',
        totalHits: null,
        page: 1,
        perPage: 20,
        searchName: '',
        loader: false
    }

    componentDidUpdate(prevProps, prevState) {
        const {page, perPage} = this.state;
        const prevName = prevProps.imageName;
        const nextName = this.props.imageName;
        
        // якщо попередній пошук відрізняється він наступного то ми шукаємо
        if (prevName !== nextName) {
            // this.setState({status: 'pending'}) //включаю лоадер
            this.setState({loader: true})
            fetch(`https://pixabay.com/api/?q=${nextName}&page=${page}&key=27124011-562ac77f1fd2864e5ddfeb16c&image_type=photo&orientation=horizontal&per_page=${perPage}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }

                    return Promise.reject (
                        new Error(`Незнайдено зображень з ім'ям ${nextName}`)
                    )
                })
                .then(images => {
                    // console.log(images);
                    this.setState(prevState => ({
                            searchName: nextName,
                            images: images.hits,
                            // status: 'resolved',
                            loader: false,
                            totalHits: images.totalHits, 
                            page: 1 // кожен новий пошук починається з 1 сторінки
                        }))
                })
                .catch(error => this.setState({
                    error,
                    // status: 'rejected',
                    loader: false
                }))
        };
    };

    morePageClick = () => {
        const {searchName, page, perPage} = this.state;
        
        // this.setState({ status: 'pending' }) //включаю лоадер
        this.setState({loader: true})
        
        fetch(`https://pixabay.com/api/?q=${searchName}&page=${page +1}&key=27124011-562ac77f1fd2864e5ddfeb16c&image_type=photo&orientation=horizontal&per_page=${perPage}`)
            .then(response => {
                    return response.json()
            })
            .then(images => {
                this.setState(prevState => ({
                    images: [...prevState.images, ...images.hits],
                    // status: 'resolved',
                    loader: false,
                    page: prevState.page +1
                }))
            })
            .catch(error => this.setState({
                error,
                // status: 'rejected'
                loader: false
            }))
        
        // const loadButton = document.getElementById("load-more");
        // console.log(loadButton);
        // loadButton.scrollIntoView({block: "center", behavior: "smooth"});
    };

    render() {
        const { imageName } = this.props;
        const { error, images, status, totalHits, perPage, page, loader } = this.state;
        const pages = totalHits / perPage; //рахую кількість сторінок

        // якщо початковий стан
        // if (status === 'idle') {
        //     return <h1>Введіть назву зображення</h1>
        // }

        // якщо завантажується то включаєтьсч лоадер
        // if (status === 'pending') {
        //     return (
        //         <div className={s.loader}>
        //             <ThreeDots color="#3f51b5" height={80} width={80} />
        //         </div>
        //     )
        // }

        // якщо помилка
        // if (status === 'rejected') {
        //     return <h1>{error.message}</h1>
        // }

        // якщо користувач введе білібєрду
        // if (images.length === 0) {
        //     return <h1>Незнайдено зображень з ім'ям {this.props.imageName}</h1>
        // }

        // якщо запит успішний
        // if (status === 'resolved') { 
        //     return (
        //         <>
        //             <ul className={s.gallery}>
        //                 {images.map(({ id, webformatURL, tags }) =>
        //                     <ImageGalleryItem
        //                         key={id}
        //                         webformatURL={webformatURL}
        //                         tags={tags}
        //                     />)}
        //             </ul>
        //             {page < pages && <div><button type="button" id="load-more" onClick={this.morePageClick} className={s.btn}>Load more</button></div>}
        //         </>
        //     )
        // }
        return (
            <div className="s.container">
                {!imageName && <h1>Введіть назву зображення</h1>}
                {totalHits === 0 && <h1>Незнайдено зображень з ім'ям {this.props.imageName}</h1>}
                {error && <h1>{error.message}</h1>}
                {loader &&
                    <div className={s.loader}>
                        <ThreeDots color="#3f51b5" height={80} width={80} />
                    </div>
                }
                {this.state.images && 
                    <ul className={s.gallery}>
                        {images.map(({ id, webformatURL, tags }) =>
                            <ImageGalleryItem
                                key={id}
                                webformatURL={webformatURL}
                                tags={tags}
                            />)}
                    </ul>
                }
                { page<pages && <button type="button" id="load-more" onClick={this.morePageClick} className={s.btn}>Load more</button>}
                
            </div>
        )
    };
};

ImageGallery.propTypes = {
    images: PropTypes.array
}
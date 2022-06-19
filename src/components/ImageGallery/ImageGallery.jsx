import { Component } from "react";
import s from './ImageGallery.module.css'

export default class ImageGallery extends Component{
    state = {
        images: [],
    }
    componentDidUpdate(prevProps, PrevState) {
        const prevName = prevProps.imageName;
        const nextName = this.props.imageName;

        if ( prevName !== nextName) {
            
            fetch(`https://pixabay.com/api/?q=${nextName}&page=1&key=27124011-562ac77f1fd2864e5ddfeb16c&image_type=photo&orientation=horizontal&per_page=12`)
                .then(r => r.json())
                .then(images => 
                    this.setState( prevState => ({
                        images: images.hits
                        }))
                );
        };
    };

    render() {
        const { imageName } = this.props;
        return (
            <div>
                { !imageName && <h1>Введіть назву зображення</h1>}
                {this.state.images && 
                    <ul className={s.gallery}>
                        
                        {this.state.images.map(({ id, webformatURL, tags }) =>
                            <li key={id} className={s.galleryItem}>
                                <img src={webformatURL} alt={tags} />
                            </li>)}
                    </ul>}
                </div>
        )
    }
}
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ id, webformatURL, tags }) => {
    return (
        <li key={id} className={s.galleryItem}>
            <img src={webformatURL} alt={tags} className={ s.img} />
        </li>
    );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired
}

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Rating from './ui/Rating';
import Icon from './ui/Icon';
import { toggleFavorite } from '../redux/favoritesSlice';
import { getCamperFeatures } from '../utils/camperFeatures';
import styles from './CamperCard.module.css';

function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const {
    id,
    name,
    price,
    rating,
    reviews,
    location,
    description,
    gallery,
  } = camper;

  const isFavorite = favorites.includes(id);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(id));
  };

  // Format price to display as 8000.00
  const formattedPrice = `€${price.toFixed(2)}`;

  // Get first image for thumbnail
  const thumbnailUrl = gallery && gallery.length > 0 ? gallery[0].thumb : '';

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {/* Thumbnail */}
        <div className={styles.thumbnail}>
          {thumbnailUrl && (
            <img src={thumbnailUrl} alt={name} className={styles.thumbnailImage} />
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          {/* Title and Price */}
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.title}>{name}</h3>
            </div>
            <div className={styles.priceAndFavorite}>
              <div className={styles.price}>{formattedPrice}</div>
              <button
                type="button"
                className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={isFavorite ? 'var(--color-error)' : 'none'}
                  stroke={isFavorite ? 'var(--color-error)' : 'var(--color-main)'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Rating and Location */}
          <div className={styles.details}>
            <div className={styles.reviews}>
              <Rating value={rating} showValue={false} />
              <span className={styles.reviewText}>
                {rating}({reviews.length} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              <Icon name="location" size={16} />
              <span>{location}</span>
            </div>
          </div>

          {/* Description */}
          <p className={styles.description}>{description}</p>

          {/* Badges */}
          <div className={styles.badges}>
            {getCamperFeatures(camper, 'card').map((feature, idx) => (
              <Badge key={`${feature.type}-${feature.label}-${idx}`} icon={feature.icon}>
                {feature.label}
              </Badge>
            ))}
          </div>

          {/* Show more button */}
          <Link to={`/catalog/${id}`} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="medium">
              Show more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

CamperCard.propTypes = {
  camper: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.array.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    gallery: PropTypes.array,
    transmission: PropTypes.string,
    engine: PropTypes.string,
    form: PropTypes.string,
  }).isRequired,
};

export default CamperCard;

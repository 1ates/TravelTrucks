import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCamperById } from '../services/api';
import { getCamperFeatures } from '../utils/camperFeatures';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Rating from '../components/ui/Rating';
import Icon from '../components/ui/Icon';
import styles from './CamperDetailPage.module.css';

function CamperDetailPage() {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCamperById(id);
        setCamper(data);
      } catch (err) {
        setError(err.message || 'Failed to load camper details');
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.bookingDate) {
      errors.bookingDate = 'Please select a booking date.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', bookingDate: '', comment: '' });
    setFormErrors({});

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.errorContainer}>
          <div className={styles.errorCard}>
            <h2 className={styles.errorTitle}>Camper not found</h2>
            <p className={styles.errorMessage}>
              We couldn't find the camper you're looking for. It may have been removed or the ID is incorrect.
            </p>
            <Link to="/catalog">
              <Button variant="primary" size="medium">Back to Catalog</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!camper) return null;

  const gallery = camper.gallery || [];
  const reviews = camper.reviews || [];
  const formattedPrice = `€${parseFloat(camper.price).toFixed(2)}`;
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.reviewer_rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  // Features badges
  const features = getCamperFeatures(camper, 'detail');

  return (
    <div className={styles.page}>
      {/* Main Container */}
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          {/* Gallery */}
          <div className={styles.gallery}>
            {/* Main Image */}
            <div className={styles.mainImage}>
              <img
                src={gallery[selectedImage]?.thumb || gallery[0]?.thumb}
                alt={camper.name}
              />
            </div>

            {/* Thumbnails */}
            <div className={styles.thumbnails}>
              {gallery.slice(0, 5).map((img, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.thumbnailActive : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img.thumb} alt={`${camper.name} photo ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Info Container */}
          <div className={styles.infoContainer}>
            {/* Header and Rating */}
            <div className={styles.headerCard}>
              <h1 className={styles.title}>{camper.name}</h1>
              <div className={styles.details}>
                <div className={styles.reviewsInfo}>
                  <Rating value={parseFloat(avgRating)} size="small" />
                  <span className={styles.reviewsText}>
                    {avgRating}({reviews.length} Reviews)
                  </span>
                </div>
                <div className={styles.locationInfo}>
                  <Icon name="location" size={16} />
                  <span>{camper.location}</span>
                </div>
              </div>
              <p className={styles.price}>{formattedPrice}</p>
              <p className={styles.description}>{camper.description}</p>
            </div>

            {/* Vehicle Details */}
            <div className={styles.detailsCard}>
              <h2 className={styles.sectionTitle}>Vehicle details</h2>

              {/* Features badges */}
              <div className={styles.badgesContainer}>
                {features.map((feature, index) => (
                  <Badge key={`${feature.type}-${feature.label}-${index}`} icon={feature.icon}>
                    {feature.label}
                  </Badge>
                ))}
              </div>

              {/* Divider */}
              <div className={styles.divider} />

              {/* Specifications */}
              <div className={styles.specs}>
                {camper.form && (
                  <div className={styles.specRow}>
                    <span>Form</span>
                    <span>{camper.form}</span>
                  </div>
                )}
                {camper.length && (
                  <div className={styles.specRow}>
                    <span>Length</span>
                    <span>{camper.length}</span>
                  </div>
                )}
                {camper.width && (
                  <div className={styles.specRow}>
                    <span>Width</span>
                    <span>{camper.width}</span>
                  </div>
                )}
                {camper.height && (
                  <div className={styles.specRow}>
                    <span>Height</span>
                    <span>{camper.height}</span>
                  </div>
                )}
                {camper.tank && (
                  <div className={styles.specRow}>
                    <span>Tank</span>
                    <span>{camper.tank}</span>
                  </div>
                )}
                {camper.consumption && (
                  <div className={styles.specRow}>
                    <span>Consumption</span>
                    <span>{camper.consumption}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className={styles.reviewsSection}>
          <h2 className={styles.sectionTitle}>Reviews</h2>

          <div className={styles.reviewsContainer}>
            {/* Reviews List */}
            <div className={styles.reviewsList}>
              {reviews.map((review, index) => (
                <div key={index} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>
                      <span>{review.reviewer_name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className={styles.reviewerInfo}>
                      <p className={styles.reviewerName}>{review.reviewer_name}</p>
                      <Rating value={review.reviewer_rating} size="small" />
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Booking Form */}
            <div className={styles.bookingForm}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Book your campervan now</h3>
                <p className={styles.formSubtitle}>
                  Stay connected! We are always ready to help you.
                </p>
              </div>

              {submitSuccess && (
                <div className={styles.successMessage}>
                  Booking request submitted successfully! We'll contact you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formInputs}>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Name*"
                    error={formErrors.name}
                  />
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Email*"
                    error={formErrors.email}
                  />
                  <Input
                    name="bookingDate"
                    type="date"
                    value={formData.bookingDate}
                    onChange={handleFormChange}
                    placeholder="Booking date*"
                    error={formErrors.bookingDate}
                  />
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleFormChange}
                    placeholder="Comment"
                    className={styles.textarea}
                    rows={4}
                  />
                </div>
                <Button type="submit" variant="primary" size="medium" fullWidth>
                  Send
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CamperDetailPage;

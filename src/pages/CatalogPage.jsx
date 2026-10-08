import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../redux/campersSlice';
import { clearFilters } from '../redux/filtersSlice';
import FilterPanel from '../components/FilterPanel';
import CamperCard from '../components/CamperCard';
import Button from '../components/ui/Button';
import emptyStateImage from '../assets/empty-state.jpg';
import styles from './CatalogPage.module.css';

function CatalogPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.campers);
  const filters = useSelector((state) => state.filters);

  const [displayedCount, setDisplayedCount] = useState(4);
  const [hasSearched, setHasSearched] = useState(true);

  // Ensure items is always an array
  const campers = Array.isArray(items) ? items : [];

  const handleSearch = () => {
    setHasSearched(true);
    setDisplayedCount(4); // Reset to first page
    dispatch(fetchCampers(filters));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setDisplayedCount(4);
    setHasSearched(true);
    dispatch(fetchCampers({}));
  };

  const handleLoadMore = () => {
    setDisplayedCount((prev) => prev + 4);
  };

  // Execute search on mount (show all by default)
  useEffect(() => {
    dispatch(fetchCampers({}));
  }, [dispatch]);

  const displayedCampers = campers.slice(0, displayedCount);
  const hasMore = displayedCount < campers.length;

  const showEmptyState =
    hasSearched && status === 'succeeded' && campers.length === 0;
  const showLoadingOverlay = status === 'loading';

  return (
    <div className={styles.page}>
      {/* Main content */}
      <div className={styles.container}>
        {/* Filter Panel */}
        <aside className={styles.sidebar}>
          <FilterPanel onSearch={handleSearch} onClear={handleClearFilters} />
        </aside>

        {/* Catalog list or empty state */}
        <main className={styles.main}>
          {showEmptyState ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIllustration}>
                <img src={emptyStateImage} alt="No campers found" />
              </div>
              <div className={styles.emptyText}>
                <h2 className={styles.emptyTitle}>No campers found</h2>
                <p className={styles.emptySubtitle}>
                  We couldn&apos;t find any campers that match your filters.
                  <br />
                  Try adjusting your search or clearing some filters.
                </p>
              </div>
              <div className={styles.emptyActions}>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={handleClearFilters}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Clear filters
                </Button>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => handleClearFilters()}
                >
                  View all campers
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Camper list */}
              <div className={styles.list}>
                {displayedCampers.map((camper) => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}
              </div>

              {/* Load More button */}
              {hasMore && status === 'succeeded' && (
                <div className={styles.loadMoreContainer}>
                  <Button
                    variant="secondary"
                    size="medium"
                    onClick={handleLoadMore}
                  >
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Loading Overlay - CATALOG_2 */}
      {showLoadingOverlay && (
        <>
          <div className={styles.loadingBackdrop} />
          <div className={styles.loadingModal}>
            <div className={styles.loadingSpinner}>
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle
                  cx="36"
                  cy="36"
                  r="32"
                  stroke="var(--color-primary)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="150 50"
                  strokeLinecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 36 36"
                    to="360 36 36"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
            <div className={styles.loadingText}>
              <h2 className={styles.loadingTitle}>Loading tracks...</h2>
              <p className={styles.loadingSubtitle}>
                Please wait while we fetch the best
                <br />
                travel trucks for you
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CatalogPage;

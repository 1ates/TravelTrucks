import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './ui/Input';
import Radio from './ui/Radio';
import Button from './ui/Button';
import Icon from './ui/Icon';
import {
  setLocation,
  setVehicleType,
  setEngine,
  setTransmission,
} from '../redux/filtersSlice';
import styles from './FilterPanel.module.css';

function FilterPanel({ onSearch, onClear }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleLocationChange = (e) => {
    dispatch(setLocation(e.target.value));
  };

  const handleVehicleTypeChange = (value) => {
    dispatch(setVehicleType(value));
  };

  const handleEngineChange = (value) => {
    dispatch(setEngine(value));
  };

  const handleTransmissionChange = (value) => {
    dispatch(setTransmission(value));
  };

  return (
    <div className={styles.panel}>
      <div className={styles.content}>
        {/* Location */}
        <div className={styles.section}>
          <Input
            label="Location"
            value={filters.location}
            onChange={handleLocationChange}
            placeholder="City"
            icon={<Icon name="map" size={20} />}
          />
        </div>

        {/* Filters */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Filters</h3>

          {/* Vehicle type (Camper form) */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Camper form</label>
            <div className={styles.radioGroup}>
              <Radio
                name="vehicleType"
                value="alcove"
                checked={filters.vehicleType === 'alcove'}
                onChange={() => handleVehicleTypeChange('alcove')}
                label="Alcove"
              />
              <Radio
                name="vehicleType"
                value="panelVan"
                checked={filters.vehicleType === 'panelVan'}
                onChange={() => handleVehicleTypeChange('panelVan')}
                label="Panel Van"
              />
              <Radio
                name="vehicleType"
                value="integrated"
                checked={filters.vehicleType === 'integrated'}
                onChange={() => handleVehicleTypeChange('integrated')}
                label="Integrated"
              />
              <Radio
                name="vehicleType"
                value="semiIntegrated"
                checked={filters.vehicleType === 'semiIntegrated'}
                onChange={() => handleVehicleTypeChange('semiIntegrated')}
                label="Semi Integrated"
              />
            </div>
          </div>

          {/* Engine */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Engine</label>
            <div className={styles.radioGroup}>
              <Radio
                name="engine"
                value="diesel"
                checked={filters.engine === 'diesel'}
                onChange={() => handleEngineChange('diesel')}
                label="Diesel"
              />
              <Radio
                name="engine"
                value="petrol"
                checked={filters.engine === 'petrol'}
                onChange={() => handleEngineChange('petrol')}
                label="Petrol"
              />
              <Radio
                name="engine"
                value="hybrid"
                checked={filters.engine === 'hybrid'}
                onChange={() => handleEngineChange('hybrid')}
                label="Hybrid"
              />
              <Radio
                name="engine"
                value="electric"
                checked={filters.engine === 'electric'}
                onChange={() => handleEngineChange('electric')}
                label="Electric"
              />
            </div>
          </div>

          {/* Transmission */}
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Transmission</label>
            <div className={styles.radioGroup}>
              <Radio
                name="transmission"
                value="automatic"
                checked={filters.transmission === 'automatic'}
                onChange={() => handleTransmissionChange('automatic')}
                label="Automatic"
              />
              <Radio
                name="transmission"
                value="manual"
                checked={filters.transmission === 'manual'}
                onChange={() => handleTransmissionChange('manual')}
                label="Manual"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className={styles.actions}>
        <Button variant="primary" size="medium" fullWidth onClick={onSearch}>
          Search
        </Button>
        <Button variant="secondary" size="medium" fullWidth onClick={onClear}>
          <Icon name="close" size={24} />
          Clear filters
        </Button>
      </div>
    </div>
  );
}

FilterPanel.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default FilterPanel;

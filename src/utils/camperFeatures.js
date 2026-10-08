export const getCamperFeatures = (camper, variant = 'detail') => {
  const features = [];

  if (camper.transmission) {
    features.push({
      label: camper.transmission.charAt(0).toUpperCase() + camper.transmission.slice(1),
      type: 'transmission',
      icon: 'transmission',
    });
  }

  if (camper.engine) {
    features.push({
      label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1),
      type: 'engine',
      icon: 'engine',
    });
  }

  if (camper.form) {
    let formLabel = camper.form;
    if (formLabel === 'panelVan') formLabel = 'Panel Van';
    else if (formLabel === 'semiIntegrated') formLabel = 'Semi Integrated';
    else formLabel = formLabel.charAt(0).toUpperCase() + formLabel.slice(1);

    features.push({
      label: formLabel,
      type: 'form',
      icon: 'form',
    });
  }

  if (variant === 'card') {
    return features.slice(0, 3);
  }

  // Boolean features - Add label based on key (for detail view)
  const booleanFeatures = {
    AC: 'AC',
    kitchen: 'Kitchen',
    TV: 'TV',
    radio: 'Radio',
    bathroom: 'Bathroom',
    refrigerator: 'Refrigerator',
    microwave: 'Microwave',
    gas: 'Gas',
    water: 'Water',
  };

  Object.entries(booleanFeatures).forEach(([key, label]) => {
    if (camper[key] === true) {
      features.push({
        label,
        type: 'amenity',
        icon: key.toLowerCase(),
      });
    }
  });

  return features;
};

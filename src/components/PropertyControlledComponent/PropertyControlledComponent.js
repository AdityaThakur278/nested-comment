const PropertyControlledComponent = (props) => {
  const { controllerProperty, children } = props;
  if (!controllerProperty) return null;

  return children;
};

export default PropertyControlledComponent;

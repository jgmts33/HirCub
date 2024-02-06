const trackGTM = (eventName, data = {}) => {
  window.dataLayer.push({
    ...data,
    event: eventName,
  });
};

export default trackGTM;

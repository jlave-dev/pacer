import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GaugeJS from 'gaugeJS';

const opts = {
  angle: 0.15, // The span of the gauge arc
  lineWidth: 0.5, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.5, // // Relative to gauge radius
    strokeWidth: 0.02, // The thickness
    color: '#ccc', // Fill color
  },
  limitMax: true, // If false, max value increases automatically if value > maxValue
  limitMin: true, // If true, the min value of the gauge will be fixed
  // colorStart: '#558b6e', // Colors
  // colorStop: '#ab4e68', // just experiment with them
  percentColors: [
    [0.0, '#558b6e'],
    [0.5, '#eabe7c'],
    [1.0, '#ab4e68'],
  ],
  strokeColor: 'hsl(0, 0%, 21%)', // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true, // High resolution support
};

const Gauge = ({ wpm }) => {
  const [gaugeInstance, setGaugeInstance] = useState(null);
  const gaugeEl = useRef();

  useEffect(() => {
    const newGaugeInstance = new GaugeJS.Gauge(gaugeEl.current);
    newGaugeInstance.setOptions(opts);
    newGaugeInstance.minValue = 0;
    newGaugeInstance.maxValue = 300;
    newGaugeInstance.set(0);
    setGaugeInstance(newGaugeInstance);
  }, []);

  useEffect(() => {
    if (gaugeInstance) {
      gaugeInstance.set(wpm);
    }
  }, [gaugeInstance, wpm]);

  return <canvas ref={gaugeEl}>Gauge</canvas>;
};

Gauge.propTypes = {
  wpm: PropTypes.number.isRequired,
};

export default Gauge;

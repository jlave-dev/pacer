import React from 'react';
// import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Transcript.scss';

const Transcript = ({ text }) => {
  // const transcriptEl = useRef();
  // const [displayedText, setDisplayedText] = useState(text);

  // useEffect(() => {
  //   // Gracefully fade out text
  //   if (!text) {
  //     transcriptEl.current.ontransitionend = () => {
  //       setDisplayedText(text);
  //       transcriptEl.current.ontransitionend = undefined;
  //     };
  //   } else {
  //     setDisplayedText(text);
  //   }
  // }, [text]);

  //   useEffect(() => {
  //     transcriptEl.current.classList.remove('has-opacity-0');
  //     setTimeout(() => {
  //       transcriptEl.current.classList.add('has-opacity-0');
  //     }, 5000);
  //   }, [displayedText]);

  return (
    <div className="Transcript">
      <h1 className="title is-4 has-text-white">{text}</h1>;
    </div>
  );
};

Transcript.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Transcript;

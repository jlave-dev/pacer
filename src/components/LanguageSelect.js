import React from 'react';
import PropTypes from 'prop-types';
import supportedLanguages from '../assets/supported_languages.json';

const LanguageSelect = ({ onChange, value }) => {
  return (
    <div className="select">
      <select onChange={onChange} value={value}>
        {supportedLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

LanguageSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default LanguageSelect;

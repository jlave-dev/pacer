import React from 'react';
import PropTypes from 'prop-types';
import LanguageSelect from './LanguageSelect';
import turtle from '../assets/images/turtle_white.svg';

const Navbar = ({ settings, onChangeSetting }) => {
  return (
    <nav className="navbar is-dark">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={turtle} alt="" style={{ height: '50px' }} />
        </a>
        <div className="navbar-burger burger">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          {/* <a className="navbar-item">About</a> */}
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">Settings</div>

            <div className="navbar-dropdown">
              <div className="navbar-item">
                <div className="field">
                  <label className="label">Language</label>
                  <LanguageSelect
                    value={settings.language}
                    onChange={onChangeSetting('language')}
                  />
                </div>
              </div>
              <div className="navbar-item">
                <div className="field is-horizontal">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={settings.showTranscript}
                      onChange={onChangeSetting('showTranscript')}
                    />
                    <span style={{ marginLeft: '5px' }}>Show transcript</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-end" />
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  settings: PropTypes.shape({
    language: PropTypes.string.isRequired,
    showTranscript: PropTypes.bool.isRequired,
  }).isRequired,
  onChangeSetting: PropTypes.func.isRequired,
};

export default Navbar;

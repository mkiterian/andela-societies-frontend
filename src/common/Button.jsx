import React from 'react';
import PropTypes from 'prop-types';

/**
   * @name Button
   * @summary Returns a button
   * @returns Returns a button
   */
const Button = props => (
  <button
    name={props.name}
    className={props.className}
    value={props.value}
    onClick={props.handleClick}
  >
    {props.value}
  </button>
);
/**
    * @name propTypes
    * @type {PropType}
    * @param {Object} propTypes - React PropTypes
    * @property {String} name - The name of the Button
    *@property {String} className - The ClassName of the button for syling
    *@property {String} value - The name to show in the button
  */
Button.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

Button.defaultProps = {
  handleClick: null,
};
export default Button;

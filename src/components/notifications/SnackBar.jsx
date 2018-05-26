import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SnackBar extends Component {
  /**
    * @name SnackBar
    * @type {propTypes}
    * @param {Object} props - React PropTypes
    * @property {boolean} show - whether to display/hide message
    * @property {Object} message - object with type and text to be displayed
    * @return React node containing component for displaying a snackbar notification
    */
  static propTypes = {
    show: PropTypes.bool,
    message: PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    show: true,
  }

  /**
   * @name getDerivedStateFromProps
   * @summary react lifecycle method to update state with message and whether to display the message
   * @return {String} css classes
   */
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.message.text !== prevState.message.text) {
      return {
        message: nextProps.message,
        show: true,
      };
    }
    return prevState;
  };

  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      show: props.show,
    };
  }

  /**
   * @name showClass
   * @summary applies css styling to displayed message
   * @return {String} css classes
   */
  showClass = () => {
    const { message } = this.state;
    if (message.type === 'success') {
      setTimeout(() => { this.setState({ show: false }); }, 3000);
    }

    return message ? `snackbar show ${message.type}` : '';
  };

  render() {
    const { message, show } = this.state;
    return (
      <div className={`${show ? this.showClass() : ''}`}>
        {show && message.text}
      </div>
    );
  }
}

export default SnackBar;

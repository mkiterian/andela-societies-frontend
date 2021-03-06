import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SnackBar from '../../components/notifications/SnackBar';
import SingleInput from '../../common/SingleInput';
import DateField from '../../common/DateField';
import Select from '../../common/Select';
import Button from '../../common/Button';
import TextArea from '../../common/TextArea';
import { createActivity } from '../../actions/activityActions';
import validateFormFields from '../../helpers/validate';
import capitalizeString from '../../helpers/stringFormatter';
import labels from '../../fixtures/labels';

/**
   * @name LogActivityForm
   * @summary Returns Form
   * @returns Returns a form
   */
class LogActivityForm extends Component {
  /**
   * @name propTypes
   * @type {PropType}
   * @property {Array} categories - Array of activity categories
  */
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    closeModal: PropTypes.func.isRequired,
    createActivity: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps = (nextProps) => {
    // clear form fields if activity was logged successfully
    if (nextProps.message && nextProps.message.type === 'success') {
      return {
        activityTypeId: '',
        numberOf: '',
        date: '',
        description: '',
        errors: [],
        message: nextProps.message,
      };
    }
    return {
      message: nextProps.message,
    };
  };

  /**
   * LogActivityForm component class constructor
   * @param {Object} props - actvity categories
   */
  constructor(props) {
    super(props);
    this.state = {
      activityTypeId: '',
      numberOf: '',
      date: '',
      description: '',
      errors: [],
      message: null,
    };
  }

  /**
   * @name setLabel
   * @summary gets the appropriate label from the labels object
   * @return {String} label
   */
  setLabel = () => {
    const categoryName = this.selectedCategory().name.toLowerCase();
    return Object.keys(labels).find(label => labels[label].includes(categoryName));
  }

  /**
   * @memberOf LogActivityForm
   * change event handler
   * @param {Event} event - change event on select input
   */
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    // if input value is not empty remove it from error list
    if (!this.state[event.target.name]) {
      const errors = this.state.errors.filter(error => !error.includes(event.target.name));
      this.setState({ errors });
    }
  }

  handleAddEvent = (event) => {
    event.preventDefault();
    const {
      activityTypeId,
      date,
      description,
      numberOf,
    } = this.state;
    const activity = {
      activityTypeId,
      date,
      description,
    };
    if (this.requiresNumberOf()) {
      activity.numberOf = numberOf;
    }
    this.setState({
      errors: validateFormFields(activity),
    }, () => {
      if (this.state.errors.length === 0) {
        this.props.createActivity(activity);
      }
    });
  }

  /**
   * @name resetState
   * @summary resets state to clear form fields and error messages
   */
  resetState = () => {
    this.setState({
      activityTypeId: '',
      numberOf: '',
      date: '',
      description: '',
      errors: [],
      message: null,
    });
  }

  /**
   * @name cancelModal
   * @summary reset state and close modal
   */
  cancelModal = (event) => {
    event.preventDefault();
    this.resetState();
    this.props.closeModal();
  }

  /**
   * @name selectedCategory
   * @summary uses activityTypeId to find the selected category
   * @return {Object} category
   */
  selectedCategory = () => this.props.categories.filter(category => category.id === this.state.activityTypeId)[0];

  /**
   * @name requiresNumberOf
   * @summary determine whether a category should have a number of input
   * @return {Boolean} whether a category should have a number of input
   */
  requiresNumberOf = () => {
    const { activityTypeId } = this.state;
    return activityTypeId && this.selectedCategory().supportsMultipleParticipants;
  }

  renderValidationError = (field, replaceWord) => {
    if (this.state.errors.indexOf(field) >= 0) {
      return `${capitalizeString(replaceWord || field)} is required`;
    }
    return '';
  }

  render() {
    const { message, activityTypeId, numberOf } = this.state;
    const { categories } = this.props;

    return (
      <form>
        <div className='titleForm'>Log an Activity</div>
        <DateField
          handleChange={this.handleChange}
          value={this.state.date}
        />
        <span className='validate__errors'>
          {this.renderValidationError('date')}
        </span>
        <Select
          name='activityTypeId'
          placeholder='Select Category'
          options={categories}
          title='Activity Category'
          value={activityTypeId}
          handleChange={this.handleChange}
        />
        <span className='validate__errors'>
          {this.renderValidationError('activityTypeId', 'Category')}
        </span>
        {
          this.requiresNumberOf() ?
            <Fragment>
              <SingleInput
                type='number'
                name='numberOf'
                title={`# of ${this.setLabel()}`}
                value={numberOf}
                handleChange={this.handleChange}
              />
              <span className='validate__errors'>
                {this.renderValidationError('numberOf', `Number of ${this.setLabel()}`)}
              </span>
            </Fragment>
            : null
        }

        <TextArea
          title='Description'
          rows={5}
          resize={false}
          name='description'
          placeholder='keep it brief'
          handleChange={this.handleChange}
          value={this.state.description}
        />
        <span className='validate__errors'>
          {this.renderValidationError('description')}
        </span>
        <div>
          <Button
            name='fellowButtonSubmit'
            value='Log'
            className={`submitButton ${message && message.type === 'info' ? 'submitButton--disabled' : ''}`}
            onClick={this.handleAddEvent}
          />
          <Button
            name='fellowButtonCancel'
            value='Cancel'
            className='cancelButton'
            onClick={this.cancelModal}
          />
        </div>
        {
          message && <SnackBar message={message} />
        }
      </form>
    );
  }
}

const mapStateToProps = state => ({
  message: state.myActivities.message,
});

const mapDispatchToProps = dispatch => ({
  createActivity: activity => dispatch(createActivity(activity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogActivityForm);

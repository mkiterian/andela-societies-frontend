import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SingleInput from '../../common/SingleInput';
import DateField from '../../common/DateField';
import Select from '../../common/Select';
import Buttons from '../../common/Buttons';
import TextArea from '../../common/TextArea';
import { createActivity } from '../../actions/activityActions';
import validateFormFields from '../../helpers/validate';
import capitalizeString from '../../helpers/stringFormatter';
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
  };

  /**
   * LogActivityForm component class constructor
   * @param {Object} props - actvity categories
   */
  constructor(props) {
    super(props);
    this.state = {
      activityId: '',
      date: '',
      description: '',
      errors: [],
    };
  }
  /**
   * @memberOf LogActivityForm
   * change event handler
   * @param {Event} event - change event on select input
   */
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAddEvent = (event) => {
    event.preventDefault();
    const { activityId, date, description } = this.state;
    const activity = {
      activityId,
      date,
      description,
    };
    this.setState({
      errors: validateFormFields(activity),
    }, function () {
      if (this.state.errors.length === 0) {
        this.props.createActivity(activity);
      }
    });
  }

  cancelModal = event => {
    event.preventDefault();
    this.props.closeModal();
  }

  renderValidationError = (field, replaceWord) => {
    if (this.state.errors.indexOf(field) >= 0) {
      return (
        <span className='validate__errors'>
          {capitalizeString(replaceWord || field)} is required.
        </span>
      );
    }
  }

  render() {
    const { selectValue } = this.state;
    const { categories } = this.props;

    return (
      <form>
        <div className='titleForm'>Log an Activity</div>
        <DateField
          handleChange={this.handleChange}
          value={this.state.date}
        />
        {this.renderValidationError('date')}
        <Select
          name='activityId'
          placeholder='Select Category'
          options={categories}
          title='Activity Category'
          value={this.state.selectValue}
          handleChange={this.handleChange}
        />
        {this.renderValidationError('activityId', 'Category')}
        {
          selectValue === 'eef0e594-43cd-11e8-87a7-9801a7ae0329' ?
            <SingleInput type='number' name='text' title='# of interviewees' /> : ''
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
        {this.renderValidationError('description')}
        <div>
          <Buttons
            name='fellowButtonSubmit'
            value='Log'
            className='submitButton'
            onClick={this.handleAddEvent}
          />
          <Buttons
            name='fellowButtonCancel'
            value='Cancel'
            className='cancelButton'
            onClick={this.cancelModal}
          />
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createActivity: activity => dispatch(createActivity(activity)),
});

export default connect(null, mapDispatchToProps)(LogActivityForm);

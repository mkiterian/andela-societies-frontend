import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityCard from '../components/activities/ActivityCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import stats from '../fixtures/stats';
import { fetchSocietyInfo } from '../actions/societyInfoActions';
import filterActivitiesByStatus from '../helpers/filterActivitiesByStatus';
import { verifyActivity } from '../actions/verifyActivityActions';
import filterActivities from '../helpers/filterActivities';

class VerifyActivities extends Component {
  /**
    * @name VerifyActivities
    * @type {propTypes}
    * @param {Object} props - React PropTypes
    * @property {Function} fetchSocietyInfo - fetches society details
    */
  static propTypes = {
    fetchSocietyInfo: PropTypes.func.isRequired,
    requesting: PropTypes.bool.isRequired,
    verifyActivity: PropTypes.func.isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
    }).isRequired,
  }

  /**
   * React component lifecycle method getDerivedStateFromProps
   * @param {Object} nextProps - props
   */
  static getDerivedStateFromProps(nextProps) {
    const { societyName, societyActivities } = nextProps;
    const activities = filterActivitiesByStatus(societyActivities, 'in review');
    return {
      activities,
      societyName,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      showUserDetails: true,
      societyName: '',
    };
  }

  componentDidMount() {
    if (this.state.societyName) this.props.fetchSocietyInfo(this.state.societyName);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.societyName !== this.state.societyName) {
      this.props.fetchSocietyInfo(this.state.societyName);
    }
  }
  handleClick = (isApproved, activityId) => {
    this.props.verifyActivity(isApproved, activityId);
  }

  /**
   * Filters state based on the selectedStatus
   * @memberof MyActivities
   */
   filterActivities = (status) => {
     this.setState({
       filteredActivities: filterActivities(status, this.state)
         .filteredActivities,
       selectedStatus: status,
     });
   };


  /**
   * @name VerifyActivities
   * @summary Renders My activities page
   * @return React node that displays the VerifyActivities page
   */
   render() {
     const { activities, showUserDetails } = this.state;
     const { requesting } = this.props;
     const hideFilter = true;
     const page = this.props.history.location.pathname;
     return (
       <Page>
         <div className='mainContent'>
           <div className='VerifyActivities'>
             <PageHeader
               title='Verify Activities'
               hideFilter={hideFilter}
             />
             <div className='activities'>
               {
                 requesting ?
                   <h3 className='loader'>Loading... </h3>
                   :
                   <Fragment>
                     <MasonryLayout
                       items={
                         activities.map(activity => (
                           <ActivityCard
                             id={activity.id}
                             category={activity.category}
                             date={(activity.date)}
                             description={activity.description || activity.activity}
                             points={activity.points}
                             status={activity.status}
                             showUserDetails={showUserDetails}
                             page={page}
                             handleClick={this.handleClick}
                           />
                         ))
                       }
                     />
                   </Fragment>
               }
             </div>
           </div>
         </div>
         <aside className='sideContent'>
           <Stats
             stats={stats}
           />
         </aside>
       </Page>
     );
   }
}

const mapStateToProps = state => ({
  societyActivities: state.societyActivities.activities,
  societyName: state.userProfile.info.society.name,
  requesting: state.societyActivities.requesting,
});

const mapDispatchToProps = dispatch => ({
  fetchSocietyInfo: name => dispatch(fetchSocietyInfo(name)),
  verifyActivity: (isApproved, activityId) => dispatch(verifyActivity(isApproved, activityId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyActivities);

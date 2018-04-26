import React, { Component } from 'react';

import ActivityCard from '../components/activities/ActivityCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';
import stats from '../fixtures/stats';
import capitizeString from '../helpers/stringFormatter';

class VerifyActivities extends Component {
  constructor() {
    super();
    this.state = {
      verifiedActivities: activities,
      filteredVerifiedActivities: activities,
      selectedStatus: 'All',
      initialStatus: 'All',
    };
  }

 filterActivities = (e) => {
   const status = capitizeString(e.currentTarget.textContent);
   const { initialStatus, verifiedActivities } = this.state;
   const filteredActivities = verifiedActivities.filter(activity => capitizeString(activity.status) === status);
   this.setState({
     selectedStatus: status,
     filteredVerifiedActivities: status === initialStatus ? verifiedActivities : filteredActivities,
   });
 };

  /**
 * @name VerifyActivities
 * @summary Renders My activities page
 * @return React node that displays the VerifyActivities page
 */
 render() {
   const { filteredVerifiedActivities, selectedStatus } = this.state;
   return (
     <Page>
       <div className='mainContent'>
         <div className='VerifyActivities'>
           <PageHeader
             title='Verify Activities'
             selectedStatus={selectedStatus}
             filterActivities={this.filterActivities}
           />
           <div className='activities'>
             <MasonryLayout
               items={
                 filteredVerifiedActivities.map(activity => (
                   <ActivityCard
                     id={activity.id}
                     category={activity.category}
                     date={(activity.date)}
                     description={activity.activity}
                     points={activity.points}
                     status={activity.status}
                   />
                 ))
               }
             />
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

export default VerifyActivities;

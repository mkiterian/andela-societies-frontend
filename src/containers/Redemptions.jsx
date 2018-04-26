import React from 'react';

import ActivityCard from '../components/redemptions/RedemptionCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';
import stats from '../fixtures/stats';
import dateFormatter from '../helpers/dateFormatter';
import capitizeString from '../helpers/stringFormatter';

class Redemptions extends React.Component {
  constructor() {
    super();
    this.state = {
      redemptionActivities: activities,
      filteredRedemptionActivities: activities,
      selectedStatus: 'All',
      initialStatus: 'All',
    };
  }

  filterActivities = (e) => {
    const status = capitizeString(e.currentTarget.textContent);
    const { initialStatus, redemptionActivities } = this.state;
    const filteredRedemptionActivities = redemptionActivities
      .filter(activity => capitizeString(activity.status) === status);
    this.setState({
      selectedStatus: status,
      filteredRedemptionActivities: status === initialStatus ?
        redemptionActivities : filteredRedemptionActivities,
    });
  };

  /**
   * @name Redemptions
   * @summary Renders the Redemptions page
   * @return React node that displays the Redemptions page
   */
  render() {
    const { filteredRedemptionActivities, selectedStatus } = this.state;
    return (
      <Page>
        <div className='mainContent'>
          <div className='RecentRedemptions'>
            <PageHeader
              title='Recent Redemptions'
              selectedStatus={selectedStatus}
              filterActivities={this.filterActivities}
            />
            <div className='activities'>
              <MasonryLayout
                items={
                  filteredRedemptionActivities.map(activity => (
                    <ActivityCard
                      id={activity.id}
                      category={activity.category}
                      date={dateFormatter(activity.date)}
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

export default Redemptions;

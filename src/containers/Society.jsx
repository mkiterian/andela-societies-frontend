import React from 'react';

import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import ActivityCard from '../components/activities/ActivityCard';
import MasonryLayout from '../containers/MasonryLayout';
import Stats from '../components/sidebar/Stats';
import activities from '../fixtures/activities';
import capitizeString from '../helpers/stringFormatter';

class Society extends React.Component {
  constructor() {
    super();
    this.state = {
      societyActivities: activities,
      filteredSocietyActivities: activities,
      selectedStatus: 'All',
      initialStatus: 'All',
    };
  }

    filterActivities = (e) => {
      const status = capitizeString(e.currentTarget.textContent);
      const { initialStatus, societyActivities } = this.state;
      const filteredSocietyActivities = societyActivities
        .filter(activity => capitizeString(activity.status) === status);
      this.setState({
        selectedStatus: status,
        filteredSocietyActivities: status === initialStatus ? societyActivities : filteredSocietyActivities,
      });
    };

    /**
     * @name Society
     * @summary Renders a society page
     * @return React node that displays a society page
     */
    render() {
      const { filteredSocietyActivities, selectedStatus } = this.state;
      return (
        <Page>
          <div className='mainContent'>
            <div className='society'>
              <PageHeader
                title='Activities'
                selectedStatus={selectedStatus}
                filterActivities={this.filterActivities}
              />
              <div className='activities'>
                <MasonryLayout
                  items={
                    filteredSocietyActivities.map(activity => (
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
          <aside className='sideContent sideContent--societyPage'>
            <Stats
              title='Invictus'
              page='society'
              stats={[
                {
                  value: '260',
                  name: 'Activities logged',
                },
                {
                  value: '9590',
                  name: 'Points earned',
                },
                {
                  value: '8590',
                  name: 'Points used',
                },
                {
                  value: '2021',
                  name: 'Points remaining',
                },
              ]}
            />
          </aside>
        </Page>
      );
    }
}
export default Society;

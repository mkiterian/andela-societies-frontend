const initialState = {
  userInfo: {},
  myActivities: {
    requesting: false,
    failed: false,
    activities: [],
    error: {},
  },
  societyInfo: {
    requesting: false,
    info: {
      name: '',
      image: '',
      loggedActivities: [],
      totalPoints: 0,
      usedPoints: 0,
      remainingPoints: 0,
    },
    error: {},
  },
  categories: {
    requesting: false,
    categories: [],
    error: {},
  },
};

export default initialState;

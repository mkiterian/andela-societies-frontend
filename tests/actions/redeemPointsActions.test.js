import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

// actions
import {
  createRedeemPointsRequest,
  createRedeemPointsFailure,
  redeemPoints,
  fetchRedemptionsRequest,
  fetchRedemption,
  updateRedemptionRequest,
  updateRedemptionFailure,
  updateRedemptionSuccess,
  updateRedemption,
} from '../../src/actions/redeemPointsAction';

// types
import {
  CREATE_REDEEM_POINTS_FAILURE,
  CREATE_REDEEM_POINTS_REQUEST,
  CREATE_REDEEM_POINTS_SUCCESS,
  FETCH_REDEMPTIONS_REQUEST,
  FETCH_REDEMPTIONS_SUCCESS,
  FETCH_REDEMPTIONS_FAILURE,
  UPDATE_REDEMPTION_REQUEST,
  UPDATE_REDEMPTION_FAILURE,
  UPDATE_REDEMPTION_SUCCESS,
} from '../../src/types';

// helpers
import config from '../../config';
import { redemptions, redemption } from '../../src/fixtures/redemptions';
import testProfile from '../../src/fixtures/userProfile';

const mockStore = configureMockStore([thunk]);
let store;
const societyName = testProfile.society.id;

describe('Redeem Points Actions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
  afterEach(() => moxios.uninstall());

  it('should dispatch redeem points request', () => {
    expect(createRedeemPointsRequest()).toEqual({ type: CREATE_REDEEM_POINTS_REQUEST });
  });

  it('should dispatch redeem points failure', () => {
    expect(createRedeemPointsFailure()).toEqual({ type: CREATE_REDEEM_POINTS_FAILURE });
  });

  it('should create a redeemption successfuly', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem`, {
      status: 200,
      response: {
        data: { ...redemption },
        message: 'Redemption request succesfully added.',
      },
    });

    const expectedSuccessAction = {
      type: CREATE_REDEEM_POINTS_SUCCESS,
      redemption: {
        data: { ...redemption },
        message: 'Redemption request succesfully added.',
      },
    };
    const redemptionData = {
      center: 'Nairobi',
      points: '50',
      reason: 'good reason for this',
    };
    return store.dispatch(redeemPoints(redemptionData, societyName))
      .then(() => (expect(store.getActions()[1]).toEqual(expectedSuccessAction)));
  });


  it('should return fetch redemptions request action', () => {
    expect(fetchRedemptionsRequest()).toEqual({ type: FETCH_REDEMPTIONS_REQUEST });
  });

  it('should return fetch redemptions success action', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem?society=${societyName}`, {
      status: 200,
      response: {
        data: redemptions,
      },
    });
    const expectedSuccessAction = { type: FETCH_REDEMPTIONS_SUCCESS, redemptions };
    return store.dispatch(fetchRedemption(societyName))
      .then(() => (expect(store.getActions()[1]).toEqual(expectedSuccessAction)));
  });

  it('should call createRedeemPointsFailure when there is a error', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem`, {
      status: 400,
      response: {
        message: 'There was an error while processing your request.',
      },
    });

    const expectedFailureAction = {
      type: CREATE_REDEEM_POINTS_FAILURE,
      error: 'There was an error while processing your request.',
    };
    const redemptionData = {
      center: 'Nairobi',
      points: '50',
      reason: 'good reason for this',
    };
    return store.dispatch(redeemPoints(redemptionData, societyName))
      .then(() => (expect(store.getActions()[1]).toEqual(expectedFailureAction)));
  });


  it('should call the fetch failure action', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem?society=Istelle`, { status: 400 });
    const expectedErrorAction = {
      type: FETCH_REDEMPTIONS_FAILURE,
    };
    return store.dispatch(fetchRedemption('Istelle'))
      .then(() => (expect(store.getActions()[1]).toEqual(expectedErrorAction)));
  });

  it('should dispatch update redemption request', () => {
    expect(updateRedemptionRequest()).toEqual({ type: UPDATE_REDEMPTION_REQUEST });
  });

  it('should dispatch update redemption request failure', () => {
    expect(updateRedemptionFailure()).toEqual({ type: UPDATE_REDEMPTION_FAILURE });
  });

  it('should dispatch update redemption request success', () => {
    expect(updateRedemptionSuccess(redemption)).toEqual({ type: UPDATE_REDEMPTION_SUCCESS, redemption });
  });

  it('should update a redemption successfuly', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem/${redemption.id}`, {
      status: 200,
      response: {
        data: { ...redemption },
        message: 'Redemption succesfully updated',
      },
    });

    const expectedSuccessAction = {
      type: UPDATE_REDEMPTION_SUCCESS,
      redemption: {
        data: { ...redemption },
        message: 'Redemption succesfully updated',
      },
    };
    const updateData = {
      id: redemption.id,
      center: redemption.center.name,
      points: redemption.value,
      reason: redemption.reason,
    };
    return store.dispatch(updateRedemption(updateData))
      .then(() => (expect(store.getActions()[1]).toEqual(expectedSuccessAction)));
  });

  it('should dispatch FETCH_REDEMPTIONS_FAILURE if update redemption failed', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem/${redemption.id}`, {
      status: 401,
      response: {
        data: { ...redemption },
        message: 'There was an error',
      },
    });

    const expectedFailureAction = {
      type: UPDATE_REDEMPTION_FAILURE,
      error: 'There was an error',
    };
    const updateData = {
      id: redemption.id,
      center: redemption.center.name,
      points: redemption.value,
      reason: redemption.reason,
    };
    return store.dispatch(updateRedemption(updateData))
      .then(() => (expect(store.getActions()[1]).toEqual(expectedFailureAction)));
  });
});

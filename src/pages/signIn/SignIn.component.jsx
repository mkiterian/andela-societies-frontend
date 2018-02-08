import React from 'react';

import VerifyActivitiesIcon from '../../svgIcons/menuIcons/VerifyActivities';
import RedemptionIcon from '../../svgIcons/menuIcons/Redemptions';
import SocietiesIcon from '../../svgIcons/menuIcons/Societies';
import LogActivitiesIcon from '../../svgIcons/menuIcons/LogActivities';

import './SignIn.scss';
import logo from '../../assets/images/andelaLogoBlue.png';

export default () => (
  <div>
    <header className="signInHeader">
      <div className="pageContent">
        <div className="logo">
          <img className="logo__img" src={logo} alt="Andela logo" />
          <span className="logo__text">Andela Societies</span>
        </div>
        <div
          className="signInButton"
          role="button"
          aria-label="Sign in with Google"
          tabIndex="0"
        >
          <div className="signInButton__logo" />
          <span className="signInButton__label">
            Sign in with Google
          </span>
        </div>
      </div>
    </header>
    <main className="pageContent">
      <div className="leftContent">
        <p className="promo">
          {'Track your society\'s points as well as your personal contributions to your society.'}
        </p>
      </div>
      <div className="rightContent">
        <h1 className="featuresTitle">Features</h1>
        <div className="features">
          <div className="feature">
            <div className="feature__icon">
              <LogActivitiesIcon />
            </div>
            <div className="feature__info">
              <h2 className="feature__name">Log Activities</h2>
              <p className="feature__description">Say goodbye to using spreadsheets for logging activities.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature__icon">
              <VerifyActivitiesIcon />
            </div>
            <div className="feature__info">
              <h2 className="feature__name">Verify Activities</h2>
              <p className="feature__description">Society secretaries and the success department can verify activities.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature__icon">
              <SocietiesIcon />
            </div>
            <div className="feature__info">
              <h2 className="feature__name">Society Pages</h2>
              <p className="feature__description">See how many points societies have, top contributors and much more.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature__icon">
              <RedemptionIcon />
            </div>
            <div className="feature__info">
              <h2 className="feature__name">Redeem points</h2>
              <p className="feature__description">Society presidents can make redemption requests.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

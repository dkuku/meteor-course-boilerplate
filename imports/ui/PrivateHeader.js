import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {
    const navImgSrc = props.isNavOpen ? '/x.svg': '/bars.svg';
  return (
    <div className="header">
      <div className="header__content">
          <img className="header__nav-toggle" src={navImgSrc} onClick={props.handleNavToggle}/>
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={props.handleLogout}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleNavToggle: PropTypes.func.isRequired,
    isNavOpen: PropTypes.bool.isRequired,
};

export default withTracker(()=>{
    const isNavOpen = Session.get('isNavOpen');
    return {
        isNavOpen,
        handleLogout: () => Accounts.logout(),
        handleNavToggle: () => Session.set('isNavOpen', !isNavOpen)
    }
})(PrivateHeader);


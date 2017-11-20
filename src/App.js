import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from './actions/user';
import LeftSlideMenu from './components/Menu/LeftSlideMenu';

const propTypes = {
  children: PropTypes.object.isRequired,
  user: PropTypes.object,
  actions: PropTypes.shape({
    logout: PropTypes.func,
  }),
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    const { user, actions } = this.props;
    return (
      <div>
        <LeftSlideMenu user={user} logout={actions.logout} />
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.details ? state.user.details : {},
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    logout,
  }, dispatch),
});

App.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

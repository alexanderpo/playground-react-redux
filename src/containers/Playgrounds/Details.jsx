import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { CircularProgress } from 'material-ui';
import { getPlayground } from '../../actions/playgrounds';
import { favoritePlaygroundControl } from '../../actions/user';
import EmptyPlaygrounds from '../../components/Playgrounds/Empty';
import Map from '../../components/Map';
import EventsCalendar from './EventsCalendar';
import PlaygroundDetails from '../../components/Playgrounds/Details';

const propTypes = {
  placemarks: PropTypes.array,
  userId: PropTypes.number,
  playgroundDetail: PropTypes.object,
  match: PropTypes.object,
  isLoading: PropTypes.bool,
  actions: PropTypes.shape({
    getPlayground: PropTypes.func,
    favoritePlaygroundControl: PropTypes.func,
  }),
};

class PlaygroundsDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.playgroundId;
    this.props.actions.getPlayground(id);
  }

  renderPlayground = playground => (
    _.isEmpty(playground) ? <EmptyPlaygrounds /> :
    <PlaygroundDetails
      userId={this.props.userId}
      playground={playground}
      favoriteControl={this.props.actions.favoritePlaygroundControl}
    />
  );

  render() {
    const {
      playgroundDetail,
      placemarks,
      isLoading,
    } = this.props;
    return (
      <div className="main-content__wrapper">
        <div className="pg-details__content">
          <div className="pg-details__left-container">
            <div className="pg-details__pg-info">
              {
                isLoading ? <CircularProgress className="pg-details__progress" /> : this.renderPlayground(playgroundDetail)
              }
            </div>
            <div className="pg-details__events-scheldure">
              <div className="pg-details__pg-title">{playgroundDetail.name}</div>
              <EventsCalendar />
            </div>
          </div>
          <div className="pg-details__right-container">
            <Map placemarks={placemarks} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = state.user.details.id;
  const { isLoading } = state.playgrounds.current;
  const { favoritePlaygrounds } = state.user.details;

  const playground = state.playgrounds.current.details.error ? [] :
    state.playgrounds.current.details[0];

  const playgroundDetail = _.isEmpty(playground) ? {} : Object.assign({}, playground, {
    isFavorite: _.includes(favoritePlaygrounds, playground.id),
  });

  const placemarks = state.playgrounds.current.details.error ? [] :
    state.playgrounds.current.details.map(point => ({
      latitude: point.latitude,
      longitude: point.longitude,
      info: {
        playgroundId: point.id,
        title: point.name,
        datetime: moment(point.created_at).format('lll'),
      },
    }));

  return {
    userId,
    playgroundDetail,
    placemarks,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPlayground,
    favoritePlaygroundControl,
  }, dispatch),
});

PlaygroundsDetails.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaygroundsDetails));

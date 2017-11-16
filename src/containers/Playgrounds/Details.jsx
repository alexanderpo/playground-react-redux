import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { getPlayground } from '../../actions/playgrounds';
import { favoritePlaygroundControl } from '../../actions/user';
import Map from '../../components/Map';
import PlaygroundDetails from '../../components/Playgrounds/Details';

const propTypes = {
  placemarks: PropTypes.array,
  userId: PropTypes.number,
  playgroundDetail: PropTypes.object,
  match: PropTypes.object,
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

  render() {
    const {
      playgroundDetail,
      userId,
      actions,
      placemarks,
    } = this.props;
    return (
      <div className="content-container">
        <div className="left-content-box">
          <PlaygroundDetails
            userId={userId}
            playground={playgroundDetail}
            favoriteControl={actions.favoritePlaygroundControl}
          />
        </div>
        <div className="map-container">
          <Map placemarks={placemarks} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = state.user.details.id;
  const { favoritePlaygrounds } = state.user.details;

  const playground = state.currentPlayground.details ? state.currentPlayground.details[0] : {};

  const playgroundDetail = Object.assign({}, playground, {
    isFavorite: _.includes(favoritePlaygrounds, playground.id),
  });

  const placemarks = state.currentPlayground.details ?
    state.currentPlayground.details.map(point => ({
      latitude: point.latitude,
      longitude: point.longitude,
      title: point.name,
      description: point.description,
      datetime: moment(point.created_at).format('lll'),
      creator: point.creator,
    })) : [];

  return {
    userId,
    playgroundDetail,
    placemarks,
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

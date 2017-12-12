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
import Map from '../../components/Map';
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

  render() {
    const {
      playgroundDetail,
      userId,
      actions,
      placemarks,
      isLoading,
    } = this.props;
    return (
      <div className="content-container">
        <div className="left-content-box">
          {
            isLoading ? <CircularProgress className="loading-spinner" /> : (
              <PlaygroundDetails
                userId={userId}
                playground={playgroundDetail}
                favoriteControl={actions.favoritePlaygroundControl}
              />
            )
          }
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
  const { isLoading } = state.playgrounds.current;
  const { favoritePlaygrounds } = state.user.details;

  const playground = state.playgrounds.current.details ? state.playgrounds.current.details[0] : {};

  const playgroundDetail = Object.assign({}, playground, {
    isFavorite: _.includes(favoritePlaygrounds, playground.id),
  });

  const placemarks = state.playgrounds.current.details ?
    state.playgrounds.current.details.map(point => ({
      latitude: point.latitude,
      longitude: point.longitude,
      info: {
        playgroundId: point.id,
        title: point.name,
        datetime: moment(point.created_at).format('lll'),
      },
    })) : [];

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

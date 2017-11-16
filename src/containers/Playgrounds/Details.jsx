import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { getPlayground } from '../../actions/playgrounds';
import Map from '../../components/Map';
import PlaygroundDetails from '../../components/Playgrounds/Details';

const propTypes = {
  placemarks: PropTypes.array,
  userId: PropTypes.number,
  playground: PropTypes.array,
  match: PropTypes.object,
  actions: PropTypes.shape({
    getPlayground: PropTypes.func,
  }),
};

class PlaygroundsDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.playgroundId;
    this.props.actions.getPlayground(id);
  }

  render() {
    const { playground, placemarks } = this.props;
    return (
      <div className="content-container">
        <div className="left-content-box">
          <h2> asdadsa</h2>
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
  const playground = state.currentPlayground.details.map(ground => ({
    ...ground,
    isFavorite: _.includes(favoritePlaygrounds, ground.id),
  }));

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
    playground,
    placemarks,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPlayground,
  }, dispatch),
});

PlaygroundsDetails.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaygroundsDetails));

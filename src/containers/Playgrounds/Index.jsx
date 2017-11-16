import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { getPlaygrounds } from '../../actions/playgrounds';
import { favoritePlaygroundControl } from '../../actions/user';
import EventsFilter from '../../components/Events/Filter';
import PlaygroundPreview from '../../components/Playgrounds/Preview';

const propTypes = {
  userId: PropTypes.number,
  playgrounds: PropTypes.array,
  actions: PropTypes.shape({
    getPlaygrounds: PropTypes.func,
    favoritePlaygroundControl: PropTypes.func,
  }),
};

class PlaygroundsWrapper extends Component {
  componentDidMount() {
    this.props.actions.getPlaygrounds();
  }

  renderPlaygrounds = playgrounds => (
    playgrounds.map(playground => (
      <PlaygroundPreview
        key={playground.id}
        userId={this.props.userId}
        favoritePlaygroundControl={this.props.actions.favoritePlaygroundControl}
        playground={{
          id: playground.id,
          name: playground.name,
          description: playground.description,
          images: playground.images,
          address: playground.address,
          isFavorite: playground.isFavorite,
          created: moment(playground.created_at).format('lll'),
          creator: playground.creator,
          lat: playground.latitude,
          lng: playground.longitude,
        }}
      />
    ))
  );

  render() {
    const { playgrounds } = this.props;
    return (
      <div className="content-container">
        <EventsFilter>
          { this.renderPlaygrounds(playgrounds) }
        </EventsFilter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userId = state.user.details.id;
  const { favoritePlaygrounds } = state.user.details;
  const playgrounds = state.playgrounds.details.map(playground => ({
    ...playground,
    isFavorite: _.includes(favoritePlaygrounds, playground.id),
  }));
  return {
    userId,
    playgrounds,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPlaygrounds,
    favoritePlaygroundControl,
  }, dispatch),
});

PlaygroundsWrapper.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(PlaygroundsWrapper);

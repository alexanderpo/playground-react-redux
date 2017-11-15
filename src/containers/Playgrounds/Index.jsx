import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPlaygrounds } from '../../actions/playgrounds';
import EventsFilter from '../../components/Events/Filter';
import Preview from '../../components/Playgrounds/Preview';

const propTypes = {
  actions: PropTypes.shape({
    getPlaygrounds: PropTypes.func,
  }),
};

class PlaygroundsWrapper extends Component {
  componentDidMount() {
    this.props.actions.getPlaygrounds().then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <div className="content-container">
        <EventsFilter>
          <Preview />
          <Preview />
          <Preview />
          <Preview />
          <Preview />
        </EventsFilter>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPlaygrounds,
  }, dispatch),
});

PlaygroundsWrapper.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(PlaygroundsWrapper);

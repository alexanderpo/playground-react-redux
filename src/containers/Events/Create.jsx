import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Paper, TextField, RaisedButton } from 'material-ui';
import { createEventSchema } from '../../utils/validationSchema';
import validate from '../../utils/validation';
import DateTimePicker from '../../components/Events/Create/DateTimePicker';
import PlaygroundSelector from '../../components/Events/Create/PlaygroundSelector';
import { updateNotificationStatus } from '../../actions/user';
import { getPlaygrounds } from '../../actions/playgrounds';
import { createEvent, updateEventDatetime, updateEventSelectedPlayground } from '../../actions/events';

const propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  createInfo: PropTypes.object,
  playgrounds: PropTypes.array,
  actions: PropTypes.shape({
    getPlaygrounds: PropTypes.func,
    createEvent: PropTypes.func,
    updateNotificationStatus: PropTypes.func,
    updateEventDatetime: PropTypes.func,
    updateEventSelectedPlayground: PropTypes.func,
  }),
};

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      error: {
        title: '',
        datetime: '',
      },
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleCreateEvent = this.handleCreateEvent.bind(this);
    this.clearInputFields = this.clearInputFields.bind(this);
    this.clearErrorsFields = this.clearInputFields.bind(this);
  }

  componentDidMount() {
    this.props.actions.getPlaygrounds();
  }

  clearErrorsFields() {
    this.setState({
      error: {
        title: '',
        datetime: '',
      },
    });
  }

  clearInputFields() {
    this.setState({
      title: '',
    });
  }

  handleInputValue(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value,
      });
    };
  }

  handleCreateEvent() {
    const { title } = this.state;
    const { user, actions } = this.props;
    const { datetime, playgroundId } = this.props.createInfo;
    const values = { title, datetime, playgroundId };
    const error = validate(createEventSchema, values);

    if (!_.isEmpty(error)) {
      this.setState({
        error: {
          title: error.title,
          datetime: error.datetime,
        },
      });
      if (error.playgroundId) {
        actions.updateNotificationStatus({
          show: true,
          message: 'Select playground for create event',
          type: 'failure',
        });
      }
    } else {
      this.clearErrorsFields();
      actions.createEvent(title, datetime, user.id, playgroundId).then((action) => {
        if (_.isEmpty(action.payload.error)) {
          this.clearInputFields();
          actions.updateEventSelectedPlayground(0);
          actions.updateEventDatetime(null);
          actions.updateNotificationStatus({
            show: true,
            message: 'Event created',
            type: 'success',
          });
        } else {
          actions.updateNotificationStatus({
            show: true,
            message: action.payload.error,
            type: 'failure',
          });
        }
      });
    }
  }

  render() {
    const {
      playgrounds,
      actions,
      createInfo,
    } = this.props;
    const {
      title,
      error,
    } = this.state;
    return (
      <div className="create-event-wrapper">
        <div className="create-event-title">create event</div>
        <Paper zDepth={2} className="create-event__container">
          <div className="create-event__pg-content">
            <PlaygroundSelector
              playgrounds={playgrounds}
              selectedPlayground={createInfo.playgroundId}
              updateSelectedPlayground={actions.updateEventSelectedPlayground}
            />
          </div>
          <div className="create-event__event-content">
            <div className="create-event__text-fields">
              <div>
                <TextField
                  className="create-event__input"
                  hintText="EVENT TITLE"
                  floatingLabelText="TITLE"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  value={title}
                  errorText={error.title}
                  onChange={this.handleInputValue('title')}
                />
                <DateTimePicker
                  updateDateTime={actions.updateEventDatetime}
                  datetime={createInfo.datetime}
                  errorText={error.datetime}
                />
              </div>
              <div className="create-event__action-buttons">
                <RaisedButton
                  className="create-event__btn"
                  label="Cancel"
                  onClick={() => this.props.history.push('/')}
                />
                <RaisedButton
                  className="create-event__btn"
                  label="Create"
                  primary={true}
                  onClick={this.handleCreateEvent}
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.details,
  playgrounds: state.playgrounds.all.details.error ? [] :
    state.playgrounds.all.details.map(pg => ({
      id: pg.id,
      name: pg.name.toUpperCase(),
      description: pg.description,
      address: pg.address,
      image: pg.images[0],
    })),
  createInfo: state.events.create,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPlaygrounds,
    createEvent,
    updateEventDatetime,
    updateEventSelectedPlayground,
    updateNotificationStatus,
  }, dispatch),
});

CreateEvent.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEvent));

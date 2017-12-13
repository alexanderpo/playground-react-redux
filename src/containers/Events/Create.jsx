import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Paper, TextField, RaisedButton, Snackbar } from 'material-ui';
import { CardHeader } from 'material-ui/Card';
import { createEventSchema } from '../../utils/validationSchema';
import validate from '../../utils/validation';
import UserProfilePhoto from '../../styles/images/user.png';
import { getPlaygrounds } from '../../actions/playgrounds';
import { createEvent, updateEventDatetime, updateEventSelectedPlayground } from '../../actions/events';
import DateTimePicker from '../../components/Events/Create/DateTimePicker';
import PlaygroundSelector from '../../components/Events/Create/PlaygroundSelector';

const propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  createInfo: PropTypes.object,
  playgrounds: PropTypes.array,
  actions: PropTypes.shape({
    getPlaygrounds: PropTypes.func,
    createEvent: PropTypes.func,
    updateEventDatetime: PropTypes.func,
    updateEventSelectedPlayground: PropTypes.func,
  }),
};

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogBoxIsOpen: false,
      dialogBoxText: '',
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
      dialogBoxText: '',
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
        this.setState({
          dialogBoxIsOpen: true,
          dialogBoxText: 'Select playground for create event',
        });
      }
    } else {
      this.clearErrorsFields();
      actions.createEvent(title, datetime, user.id, playgroundId).then((action) => {
        if (_.isEmpty(action.payload.error)) {
          this.clearInputFields();
          actions.updateEventSelectedPlayground(0);
          actions.updateEventDatetime(null);
          this.setState({
            dialogBoxIsOpen: true,
            dialogBoxText: 'Event created',
          });
        } else {
          this.setState({
            dialogBoxIsOpen: true,
            dialogBoxText: action.payload.error,
          });
        }
      });
    }
  }

  render() {
    const {
      user,
      playgrounds,
      actions,
      createInfo,
    } = this.props;
    const {
      title,
      dialogBoxIsOpen,
      dialogBoxText,
      error,
    } = this.state;
    return (
      <div>
        <Paper zDepth={2} className="create-playground-user-details-wrapper">
          <CardHeader
            title={user.name}
            subtitle={user.phone}
            avatar={(user.image !== null) ? `/api/v1/images/${user.image}` : UserProfilePhoto}
          />
        </Paper>
        <Paper zDepth={2} className="create-playground-user-details-wrapper">
          <TextField
            hintText="Event title"
            floatingLabelText="Event title"
            fullWidth={true}
            value={title}
            errorText={error.title}
            onChange={this.handleInputValue('title')}
          />
        </Paper>
        <PlaygroundSelector
          playgrounds={playgrounds}
          selectedPlayground={createInfo.playgroundId}
          updateSelectedPlayground={actions.updateEventSelectedPlayground}
        />
        <DateTimePicker
          updateDateTime={actions.updateEventDatetime}
          datetime={createInfo.datetime}
          errorText={error.datetime}
        />
        <div className="create-playground-action-buttons-wrapper">
          <RaisedButton
            className="create-playground-action-button"
            label="Cancel"
            onClick={() => this.props.history.push('/')}
          />
          <RaisedButton
            className="create-playground-action-button"
            label="Create"
            primary={true}
            onClick={this.handleCreateEvent}
          />
        </div>
        <Snackbar
          open={dialogBoxIsOpen}
          message={dialogBoxText}
          autoHideDuration={4000}
          onRequestClose={() => { this.setState({ dialogBoxIsOpen: false }); }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.details,
  playgrounds: state.playgrounds.all.details,
  createInfo: state.events.create,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPlaygrounds,
    createEvent,
    updateEventDatetime,
    updateEventSelectedPlayground,
  }, dispatch),
});

CreateEvent.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEvent));

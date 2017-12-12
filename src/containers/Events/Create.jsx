import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Paper, TextField, RaisedButton, Snackbar, Subheader } from 'material-ui';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import { CardHeader } from 'material-ui/Card';
import { createEventSchema } from '../../utils/validationSchema';
import validate from '../../utils/validation';
import PromoEventPhoto from '../../styles/images/no-event-pictures.svg';
import UserProfilePhoto from '../../styles/images/user.png';
import { getPlaygrounds } from '../../actions/playgrounds';
import { createEvent, updateEventDatetime, updateEventSelectedPlayground } from '../../actions/events';
import DateTimePicker from '../../components/Events/Create/DateTimePicker';
import PlaygroundSelector from '../../components/Events/Create/PlaygroundSelector';

const propTypes = {
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

const SelectableList = makeSelectable(List);

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogBoxIsOpen: false,
      dialogBoxText: '',
      title: '',
      selectedPlayground: 0,
      error: {
        title: '',
        datetime: '',
        selectedPlayground: '',
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
        selectedPlayground: '',
      },
    });
  }

  clearInputFields() {
    this.setState({
      dialogBoxText: '',
      title: '',
      selectedPlayground: 0,
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
    const {
      title,
      selectedPlayground,
    } = this.state;
    const { user, actions } = this.props;
    const { datetime } = this.props.createInfo;
    const values = { title, datetime, selectedPlayground };
    const error = validate(createEventSchema, values);

    if (!_.isEmpty(error)) {
      this.setState({
        error: {
          title: error.title,
          datetime: error.datetime,
          selectedPlayground: error.selectedPlayground,
        },
      });
    } else {
      this.setState({
        error: {
          title: '',
          datetime: '',
        },
      });
      if (selectedPlayground === 0) {
        this.setState({
          dialogBoxIsOpen: true,
          dialogBoxText: 'Select playground for create event',
        });
      }
      actions.createEvent(title, datetime, user.id, selectedPlayground).then((action) => {
        if (_.isEmpty(action.payload.error)) {
          this.clearInputFields();
          actions.createEventDatetime(null);
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

  renderListItems = playgrounds => (
    playgrounds.map(playground => (
      <ListItem
        key={playground.id}
        primaryText={playground.name}
        value={playground.id}
        onClick={() => { this.setState({ selectedPlayground: playground.id }); }}
        leftAvatar={
          (playground.images[0] !== null) ?
            <img className="playground-preview-image" src={`/api/v1/images/${playground.images[0]}`} alt="" /> :
            <img src={PromoEventPhoto} alt="" />
        }
        secondaryText={playground.description}
      />
    ))
  );

  render() {
    const {
      user,
      playgrounds,
      actions,
      createInfo,
    } = this.props;
    const {
      title,
      selectedPlayground,
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
        <Paper zDepth={2} className="create-playground-user-details-wrapper">
          <SelectableList value={selectedPlayground}>
            <Subheader>SELECT PLAYGROUND</Subheader>
            { this.renderListItems(playgrounds)}
          </SelectableList>
        </Paper>
        <DateTimePicker
          updateDateTime={actions.updateEventDatetime}
          datetime={createInfo.datetime}
          errorText={error.datetime}
        />
        <div className="create-playground-action-buttons-wrapper">
          <RaisedButton
            className="create-playground-action-button"
            label="Cancel"
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);

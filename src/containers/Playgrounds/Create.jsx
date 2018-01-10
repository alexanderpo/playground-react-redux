import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { TextField, Paper, RaisedButton, IconButton, Dialog } from 'material-ui';
import MapIcon from 'material-ui/svg-icons/maps/map';
import ImageDropzone from '../../components/Playgrounds/Create/ImageDropzone';
import Map from '../../components/Map';
import { createPlaygroundSchema } from '../../utils/validationSchema';
import validate from '../../utils/validation';
import { updateNotificationStatus } from '../../actions/user';
import { createImage, removeImage } from '../../actions/images';
import {
  updatePlaygroundPosition,
  updateUploadedImages,
  getPlaygroundAddress,
  createPlayground,
} from '../../actions/playgrounds';

const propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  playground: PropTypes.object,
  uploadedImages: PropTypes.array,
  actions: PropTypes.shape({
    updateNotificationStatus: PropTypes.func,
    updatePlaygroundPosition: PropTypes.func,
    updateUploadedImages: PropTypes.func,
    getPlaygroundAddress: PropTypes.func,
    createPlayground: PropTypes.func,
    createImage: PropTypes.func,
    removeImage: PropTypes.func,
  }),
};

const styles = {
  textareaStyle: {
    border: '1px solid #cccccc',
    height: '150px',
    width: '100%',
    maxHeight: '150px',
    overflowY: 'auto',
    fontSize: '14px',
    textTransform: 'uppercase',
  },
  inputStyle: {
    fontSize: '14px',
    textTransform: 'uppercase',
  },
};

class CreatePlayground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      mapIsOpen: false,
      errorText: {
        name: '',
        address: '',
        description: '',
      },
      isCreated: false,
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.clearErrorsFields = this.clearErrorsFields.bind(this);
    this.clearInputFields = this.clearInputFields.bind(this);
    this.handleCreatePlayground = this.handleCreatePlayground.bind(this);
  }

  componentWillUnmount = () => {
    this.clearInputFields();
  };

  onMapClicked = (newState) => {
    if (newState.clicked) {
      this.props.actions.updateNotificationStatus({
        show: true,
        message: 'Address selected',
        type: 'success',
      });
      setTimeout(() => this.setState({ mapIsOpen: false }), 3000);
    }
  };

  handleInputValue(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value,
      });
    };
  }

  handleCreatePlayground() {
    const { name, description } = this.state;
    const { user, actions, uploadedImages } = this.props;
    const { address, latitude, longitude } = this.props.playground;
    const values = { name, address, description };
    const error = validate(createPlaygroundSchema, values);

    if (!_.isEmpty(error)) {
      this.setState({
        errorText: {
          name: error.name,
          address: error.address,
          description: error.description,
        },
      });
    } else {
      this.clearErrorsFields();
      actions.createPlayground(
        name,
        description,
        address,
        uploadedImages,
        latitude,
        longitude,
        user.email,
        user.id,
      ).then((action) => {
        if (_.isEmpty(action.payload.error)) {
          actions.updateNotificationStatus({
            show: true,
            message: 'Playground created',
            type: 'success',
          });
          this.setState({
            isCreated: true,
          });
          this.clearInputFields();
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

  clearErrorsFields() {
    this.setState({
      errorText: {
        name: '',
        address: '',
        description: '',
      },
    });
  }

  clearInputFields() {
    this.props.actions.getPlaygroundAddress(0, 0);
    this.props.actions.updateUploadedImages([]);
    this.setState({
      name: '',
      description: '',
      isCreated: false,
    });
  }

  render() {
    const { actions, playground, uploadedImages } = this.props;
    const {
      name,
      description,
      mapIsOpen,
      errorText,
      isCreated,
    } = this.state;
    return (
      <div className="create-pg__container">
        <div className="create-pg__title">create playground</div>
        <Paper zDepth={2} className="create-pg__content">
          <div className="create-pg__editable-area">
            <ImageDropzone
              createImage={actions.createImage}
              removeImage={actions.removeImage}
              updateStore={actions.updateUploadedImages}
              uploadedImages={uploadedImages}
              isCreated={isCreated}
            />
            <div className="create-pg__input-fields">
              <div className="create-pg__name-field">
                <TextField
                  className="create-pg__input"
                  inputStyle={styles.inputStyle}
                  hintText="PLAYGROUND NAME"
                  floatingLabelText="NAME"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  value={name}
                  errorText={errorText.name}
                  onChange={this.handleInputValue('name')}
                />
              </div>
              <div className="create-pg__address-field">
                <TextField
                  className="create-pg__input"
                  hintText="PLAYGROUND ADDRESS"
                  floatingLabelText="ADDRESS"
                  inputStyle={styles.inputStyle}
                  floatingLabelFixed={true}
                  fullWidth={true}
                  disabled={true}
                  value={playground.address}
                  errorText={errorText.address}
                />
                <IconButton
                  onClick={() => this.setState({ mapIsOpen: true })}
                >
                  <MapIcon className="create-pg__map-icon" />
                </IconButton>
                <span className="create-pg__map-btn-label">MAP</span>
              </div>
              <div className="create-pg__description-field">
                <TextField
                  className="create-pg__input create-pg__desc-input"
                  textareaStyle={styles.textareaStyle}
                  underlineShow={false}
                  hintText="ENTER PLAYGROUND DESCRIPTION"
                  floatingLabelText="DESCRIPTION"
                  floatingLabelFixed={true}
                  multiLine={true}
                  fullWidth={true}
                  rowsMax={3}
                  value={description}
                  errorText={errorText.description}
                  onChange={this.handleInputValue('description')}
                />
              </div>
              <div className="create-pg__actions">
                <RaisedButton
                  className="create-pg__btn"
                  label="Cancel"
                  onClick={() => this.props.history.push('/')}
                />
                <RaisedButton
                  className="create-pg__btn"
                  label="Create"
                  primary={true}
                  onClick={this.handleCreatePlayground}
                />
              </div>
            </div>
          </div>
        </Paper>
        <Dialog
          title="To select an address click on the map"
          titleClassName="create-pg_map-modal__title"
          className="create-pg__map-modal"
          modal={false}
          open={mapIsOpen}
          onRequestClose={() => this.setState({ mapIsOpen: false })}
        >
          <Map
            placemarks={[]}
            clickable={true}
            modalCallback={newState => this.onMapClicked(newState)}
            updatePosition={actions.updatePlaygroundPosition}
            getAddress={actions.getPlaygroundAddress}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.details,
  playground: {
    latitude: state.playgrounds.create.position.latitude,
    longitude: state.playgrounds.create.position.longitude,
    address: !_.isEmpty(state.playgrounds.create.address.details.results) ?
      state.playgrounds.create.address.details.results[0].formatted_address : '',
  },
  uploadedImages: state.playgrounds.create.images,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateNotificationStatus,
    updatePlaygroundPosition,
    updateUploadedImages,
    getPlaygroundAddress,
    createPlayground,
    createImage,
    removeImage,
  }, dispatch),
});

CreatePlayground.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePlayground));

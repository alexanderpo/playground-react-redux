import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import { TextField, Paper, Divider, IconButton, RaisedButton, Snackbar } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import { CardHeader } from 'material-ui/Card';
import RemoveButton from 'material-ui/svg-icons/content/remove-circle';
import ImageUpload from 'material-ui/svg-icons/file/cloud-upload';
import UserProfilePhoto from '../../styles/images/user.png';
import { createPlaygroundSchema } from '../../utils/validationSchema';
import validate from '../../utils/validation';
import { createImage, removeImage } from '../../actions/images';
import { updatePlaygroundPosition, getPlaygroundAddress, createPlayground } from '../../actions/playgrounds';
import Map from '../../components/Map';

const propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  playground: PropTypes.object,
  actions: PropTypes.shape({
    updatePlaygroundPosition: PropTypes.func,
    getPlaygroundAddress: PropTypes.func,
    createPlayground: PropTypes.func,
    createImage: PropTypes.func,
    removeImage: PropTypes.func,
  }),
};

class CreatePlayground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogBoxIsOpen: false,
      dialogBoxText: '',
      name: '',
      description: '',
      files: [],
      uploadedImages: [],
      error: {
        name: '',
        address: '',
        description: '',
      },
    };

    this.removeItem = this.removeItem.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.clearErrorsFields = this.clearErrorsFields.bind(this);
    this.clearInputFields = this.clearInputFields.bind(this);
    this.handleCreatePlayground = this.handleCreatePlayground.bind(this);
  }

  onDrop(files) {
    const { actions } = this.props;
    this.setState({
      files,
    });
    files.map((file) => { // eslint-disable-line
      actions.createImage(file).then((action) => {
        const { uploadedImages } = this.state;
        this.setState({
          uploadedImages: [...uploadedImages, action.payload],
        });
      });
    });
  }

  removeItem = (item) => {
    const { uploadedImages } = this.state;
    const { actions } = this.props;

    uploadedImages.map((image) => { // eslint-disable-line
      if (image.originalName === item.name) {
        const imageId = image.id;
        actions.removeImage(imageId).then((action) => {
          if (action.payload) {
            const items = this.state.files;
            _.remove(items, item);
            this.setState({
              files: items,
            });
          }
        });
      }
    });
  }

  handleInputValue(key) {
    return (event) => {
      this.setState({
        [key]: event.target.value,
      });
    };
  }

  handleCreatePlayground() {
    const { name, description, uploadedImages } = this.state;
    const { user, actions } = this.props;
    const { address, latitude, longitude } = this.props.playground;
    const values = { name, address, description };
    const error = validate(createPlaygroundSchema, values);

    if (!_.isEmpty(error)) {
      this.setState({
        error: {
          name: error.name,
          address: error.address,
          description: error.description,
        },
      });
    } else {
      this.clearErrorsFields();
      // eslint-disable-next-line
      actions.createPlayground(name, description, address, uploadedImages, latitude, longitude, user.email)
        .then((action) => {
          if (_.isEmpty(action.payload.error)) {
            this.clearInputFields();
            this.setState({
              dialogBoxIsOpen: true,
              dialogBoxText: 'Playground created',
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

  clearErrorsFields() {
    this.setState({
      error: {
        name: '',
        error: '',
        description: '',
      },
    });
  }

  clearInputFields() {
    this.setState({
      dialogBoxText: '',
      name: '',
      description: '',
      files: [],
      uploadedImages: [],
    });
  }

  renderListItems = items => (
    items.map(item => (
      <ListItem
        key={item.name}
        disabled={true}
        leftAvatar={<img className="playground-preview-image" src={item.preview} alt="" />}
        primaryText={item.name}
        rightIconButton={
          <IconButton
            className="playground-preview-delete-image"
            onClick={() => { this.removeItem(item); }}
            iconStyle={{ color: 'rgb(77, 77, 79)' }}
          >
            <RemoveButton />
          </IconButton>
        }
      />
    ))
  );

  render() {
    const { user, actions, playground } = this.props;
    const {
      name,
      description,
      dialogBoxText,
      dialogBoxIsOpen,
      error,
    } = this.state;
    return (
      <div className="content-container">
        <div className="left-content-box" >
          <Paper zDepth={2} className="create-playground-user-details-wrapper">
            <CardHeader
              title={user.name}
              subtitle={user.phone}
              avatar={(user.image !== null) ? `/api/v1/images/${user.image}` : UserProfilePhoto}
            />
          </Paper>
          <Paper zDepth={2} className="create-playground-image-wrapper">
            <List>
              <ListItem
                primaryText="Drop images here or click to select"
                containerElement={
                  <Dropzone
                    className="create-playground-dropzone"
                    onDrop={this.onDrop.bind(this)}
                    accept="image/jpeg, image/png, image/bmp"
                  />
                }
                rightIcon={
                  <ImageUpload id="cloud-image" />
                }
              />
              <Divider />
              <div className="create-playground-image-preview-container">
                { this.renderListItems(this.state.files)}
              </div>
            </List>
          </Paper>
          <Paper zDepth={2} className="create-playground-details-wrapper">
            <TextField
              hintText="Playground name"
              floatingLabelText="Playground name"
              fullWidth={true}
              value={name}
              errorText={error.name}
              onChange={this.handleInputValue('name')}
            />
            <TextField
              hintText="Address"
              floatingLabelText="Address"
              fullWidth={true}
              disabled={true}
              value={playground.address}
              errorText={error.address}
              onChange={this.handleInputValue('address')}
            />
            <TextField
              floatingLabelFixed={true}
              className="create-playground-description"
              hintText="Ender playground description here ..."
              floatingLabelText="Description"
              multiLine={true}
              fullWidth={true}
              rowsMax={2}
              value={description}
              errorText={error.description}
              onChange={this.handleInputValue('description')}
            />
          </Paper>
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
              onClick={this.handleCreatePlayground}
            />
          </div>
        </div>
        <div className="map-container">
          <Map
            placemarks={[]}
            clickable={true}
            updatePosition={actions.updatePlaygroundPosition}
            getAddress={actions.getPlaygroundAddress}
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
  playground: {
    latitude: state.playgrounds.create.position.latitude,
    longitude: state.playgrounds.create.position.longitude,
    address: !_.isEmpty(state.playgrounds.create.address.details.results) ?
      state.playgrounds.create.address.details.results[0].formatted_address : '',
  },
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updatePlaygroundPosition,
    getPlaygroundAddress,
    createPlayground,
    createImage,
    removeImage,
  }, dispatch),
});

CreatePlayground.propTypes = propTypes;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePlayground));

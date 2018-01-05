import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import { TextField, Paper, Divider, IconButton, RaisedButton, Snackbar } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import RemoveButton from 'material-ui/svg-icons/content/remove-circle';
import ImageUpload from 'material-ui/svg-icons/file/cloud-upload';
import ImageDropzone from '../../components/Playgrounds/Create/ImageDropzone';
import { createPlaygroundSchema } from '../../utils/validationSchema';
import validate from '../../utils/validation';
import { createImage, removeImage } from '../../actions/images';
import {
  updatePlaygroundPosition,
  updateUploadedImages,
  getPlaygroundAddress,
  createPlayground,
} from '../../actions/playgrounds';
import Map from '../../components/Map';

const propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  playground: PropTypes.object,
  uploadedImages: PropTypes.array,
  actions: PropTypes.shape({
    updatePlaygroundPosition: PropTypes.func,
    updateUploadedImages: PropTypes.func,
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
      error: {
        name: '',
        address: '',
        description: '',
      },
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.clearErrorsFields = this.clearErrorsFields.bind(this);
    this.clearInputFields = this.clearInputFields.bind(this);
    this.handleCreatePlayground = this.handleCreatePlayground.bind(this);
  }

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
        error: {
          name: error.name,
          address: error.address,
          description: error.description,
        },
      });
    } else {
      this.clearErrorsFields();
      // eslint-disable-next-line
      actions.createPlayground(name, description, address, uploadedImages, latitude, longitude, user.email, user.id)
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
    });
  }

  render() {
    const { actions, playground, uploadedImages } = this.props;
    const {
      name,
      description,
      dialogBoxText,
      dialogBoxIsOpen,
      error,
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
            />
            <div className="create-pg__input-fields">
              fields
            </div>
          </div>
          <div className="create-pg__actions">
            actions button
          </div>
        </Paper>
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
  uploadedImages: state.playgrounds.create.images,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
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

/*
<Paper zDepth={2} className="create-playground-details-wrapper" style={{ display: 'none' }}>
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
<div className="create-playground-action-buttons-wrapper" style={{ display: 'none' }}>
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
  <div className="map-container" style={{ display: 'none' }}>
    <Map
      placemarks={[]}
      clickable={true}
      updatePosition={actions.updatePlaygroundPosition}
      getAddress={actions.getPlaygroundAddress}
    />
  </div>
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import { TextField, Paper, Divider, IconButton } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import { CardHeader } from 'material-ui/Card';
import RemoveButton from 'material-ui/svg-icons/content/remove-circle';
import ImageUpload from 'material-ui/svg-icons/file/cloud-upload';
import UserProfilePhoto from '../../styles/images/user.png';
import Map from '../../components/Map';

const propTypes = {
  user: PropTypes.array,
  actions: PropTypes.shape({}),
};

class CreatePlayground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };

    this.removeItem = this.removeItem.bind(this);
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  removeItem = (item) => {
    const items = this.state.files;
    _.remove(items, item);
    this.setState({
      files: items,
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
          >
            <RemoveButton />
          </IconButton>
        }
      />
    ))
  );

  render() {
    const { user } = this.props;
    return (
      <div className="content-container">
        <div className="left-content-box" >
          <Paper zDepth={2} className="create-playground-user-details-wrapper">
            <CardHeader
              title={user.name}
              subtitle={user.phone}
              avatar={user.image ? user.image : UserProfilePhoto}
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
                  <ImageUpload />
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
            />
            <TextField
              hintText="Address"
              floatingLabelText="Address"
              fullWidth={true}
            />
            <TextField
              floatingLabelFixed={true}
              className="create-playground-description"
              hintText="Ender playground description here ..."
              floatingLabelText="Description"
              multiLine={true}
              fullWidth={true}
              rowsMax={2}
            />
          </Paper>
        </div>
        <div className="map-container">
          <Map placemarks={[]} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.details,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch),
});

CreatePlayground.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(CreatePlayground);

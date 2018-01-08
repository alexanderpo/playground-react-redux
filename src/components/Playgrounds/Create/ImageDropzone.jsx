import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import { IconButton } from 'material-ui';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import RemoveButton from 'material-ui/svg-icons/content/clear';

const propTypes = {
  uploadedImages: PropTypes.array,
  createImage: PropTypes.func,
  removeImage: PropTypes.func,
  updateStore: PropTypes.func,
  isCreated: PropTypes.bool,
};

const SelectableList = makeSelectable(List);

class ImageDropzone extends Component {
  state = {
    files: [],
    uploadedImages: this.props.uploadedImages,
    selectedImage: null,
    previewImage: null,
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.isCreated && !_.isEmpty(this.state.files)) {
      this.setState({
        files: [],
        selectedImage: null,
        previewImage: null,
      });
    }
  };

  onDrop(files) {
    this.setState({
      files,
      previewImage: null,
      selectedImage: null,
      uploadedImages: [],
    });
    files.map((file) => { // eslint-disable-line
      this.props.createImage(file).then((action) => {
        const { uploadedImages } = this.state;
        this.setState({
          uploadedImages: [...uploadedImages, action.payload],
        });
        this.props.updateStore([...uploadedImages, action.payload]);
      });
    });
  }

  removeItem = (item) => {
    const { uploadedImages, previewImage } = this.state;

    uploadedImages.map((image) => { // eslint-disable-line
      if (image.originalName === item.name) {
        const imageId = image.id;
        this.props.removeImage(imageId).then((action) => {
          if (action.payload) {
            const updatedImages = _.filter(uploadedImages, (upImage) => {
              const isEqual = upImage.originalName !== item.name;
              return isEqual;
            });
            const items = this.state.files;
            _.remove(items, item);
            this.setState({
              uploadedImages: updatedImages,
              files: items,
              previewImage: item.preview === previewImage ? null : previewImage,
            });
            this.props.updateStore(updatedImages);
          }
        });
      }
    });
  }

  renderListItems = items => (
    items.map(item => (
      <ListItem
        className="image-dropzone__preview-list-item"
        key={item.name}
        value={item.name}
        onClick={() => {
          this.setState({
            selectedImage: item.name,
            previewImage: item.preview,
          });
        }}
        leftAvatar={<img className="image-dropzone_list__image" src={item.preview} alt="" />}
        primaryText={item.name}
        rightIconButton={
          <IconButton
            onClick={() => { this.removeItem(item); }}
          >
            <RemoveButton />
          </IconButton>
        }
      />
    ))
  );

  render() {
    const { selectedImage, previewImage } = this.state;

    return (
      <div className="image-dropzone__container">
        <div className="image-dropzone__content">
          <Dropzone
            className="image-dropzone"
            onDrop={this.onDrop.bind(this)}
            accept="image/jpeg, image/png, image/bmp"
          >
            <img className="image-dropzone__selected-image" src={previewImage} alt="" />
          </Dropzone>
        </div>
        <div className="image-dropzone__preview">
          <SelectableList value={selectedImage}>
            { this.renderListItems(this.state.files)}
          </SelectableList>
        </div>
      </div>
    );
  }
}

ImageDropzone.propTypes = propTypes;
export default ImageDropzone;

import React, { Component } from 'react';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import UserProfilePhoto from '../../styles/images/user.png';
import PromoEventPhoto from '../../styles/images/event.png';

const styles = {
  card: {
    display: 'block',
  },
};

class Event extends Component {
  render() {
    return (
      <div>
        <Card style={styles.card}>
          <CardHeader
            title="alexpo"
            subtitle="+375(25)714-66-43"
            avatar={UserProfilePhoto}
          />
          <CardMedia
            overlay={<CardTitle title="Играем в футбол" />}
          >
            <img src={PromoEventPhoto} alt="" />
          </CardMedia>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardTitle subtitle="Event start 25.02.2017 at 19 : 00" />
        </Card>
      </div>
    );
  }
}

export default Event;

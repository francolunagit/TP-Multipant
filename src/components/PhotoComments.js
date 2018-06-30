import React, { Component }  from 'react';
import { Text, View, ScrollView, Image, Linking } from 'react-native';
import Card from './Card';
import axios from 'axios';
import CardSection from './CardSection';
import Button from './Button';

class PhotoComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
        comments: null
        };
    }
    
    componentWillMount() {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=${this.props.idPhoto}&format=json&nojsoncallback=1`)
          .then(response => this.setState({ comments: response.data.comments.comment }));
      }

      renderComments() {
        return this.state.comments.map(comment =>
          <Text key={comment.id}> {comment.authorname}: {comment._content} </Text>  
         
        );
      }

  render () {

    if (!this.state.comments) { 
        return (
                <Text>
        Cargando...
                </Text>
            );
}

      return (
    <ScrollView>
        
        <Card>
      <CardSection>
        
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>{this.props.title} </Text>
         
        </View>
      </CardSection>

      <CardSection>
        <Image
          style={styles.imageStyle}
          source={{ uri: this.props.imageUrl }}
        />
      </CardSection>

    <CardSection>
    <View style={paddingBottom=40}>
    <ScrollView>  
          <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>Comentarios: </Text>         
          </View>      
          <View>                  
          {this.renderComments()}
          </View>
    </ScrollView>
        
    </View>
    </CardSection>
     
    </Card>
        </ScrollView> 
        );
  }
}

const styles = {
    headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    headerTextStyle: {
      fontSize: 18
    },
    thumbnailStyle: {
      height: 50,
      width: 50
    },
    thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10
    },
    imageStyle: {
      height: 300,
      flex: 1,
      width: null
    }
  };

export default PhotoComments;
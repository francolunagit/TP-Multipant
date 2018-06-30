import React, { Component } from 'react';
import { ScrollView,FlatList, Text, View } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';
import PhotoDetail from './PhotoDetail';

class PhotoList extends Component {
  //state = { photos: null };
  constructor(props) {
    super(props);


    this.state = {
      photos: null,
      loading: false,
      data: null,
      page: 20,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentWillMount() {
    const { page, seed } = this.state;
    this.setState({ loading: true });
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=${this.props.albumId}&user_id=42990025@N06&format=json&nojsoncallback=1&per_page=${this.state.page}&page=1`)
      .then(response => this.setState({ photos: response.data.photoset.photo, loading: false, refreshing: false }));

      
  }
 /*
  renderAlbums() {
    return this.state.photos.map(photo =>
      <PhotoDetail key={photo.title} title={photo.title} imageUrl={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
    );
  }
  */

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
   
    <View>
    <PhotoDetail key={item.title} title={item.title} idPhoto={item.id} imageUrl={`https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`} />
    
   </View>
  );
/*
  _handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.componentWillMount();
      }
    );
  };
  */

  _handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 20
      },
      () => {
        this.componentWillMount();
        this.onEndReachedCalledDuringMomentum = true;
      }
    );
  };

  render() {
    console.log(this.state);


    if (!this.state.photos) { 
			return (
                <View style={{ flex: 1 }}>
					<Text>
                        Cargando fotos...
					</Text>
                </View>
				);
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
      data={this.state.photos}
      extraData={this.state}
      keyExtractor={this._keyExtractor}
      renderItem={this._renderItem}

     
      refreshing={this.state.refreshing}
      onEndReached={this._handleLoadMore}
      onEndReachedThreshold={50}
      bounces={false}
      onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
    />
        </View>
    );
  }
}

export default PhotoList;

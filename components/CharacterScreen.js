import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import Card from './Card';
import md5 from 'md5';

const CharacterScreen = ({ navigation, route }) => {

    let [otherSeries, setOtherSeries] = useState([]);
    let { character } = route.params;
    console.log(character);
    let imageUrl = character.thumbnail.path + "." + character.thumbnail.extension;
    let stringImgUrl = imageUrl.toString();
    console.log(stringImgUrl);

    const getSeriesForCharacter = async () => {
    let ts = new Date().getTime();
    let message = ts+"5ee8c18f78856b9e12d234ffdda9b8f0eb6c11e8"+"c6f23ae3df5415b5cee5c9a78e3faca6";
    let hash = md5(message);
    let uri = character.series.collectionURI;
    console.log(uri);

    let response = await fetch(
      `${uri}?apikey=c6f23ae3df5415b5cee5c9a78e3faca6&ts=${ts}&hash=${hash}&limit=100`,  {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
      }
    )

    let json = await response.json();
    let results = json.data.results;
    console.log(results);
    setOtherSeries(results);
    return results;
  }

  useEffect(() => {
      getSeriesForCharacter()
  }, [])

  const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Series', { series: item })}>
          <Card title={item.title} description={item.description} />
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>  
        <Text style={styles.title}>{character.name}</Text>
        <Image style={styles.img} source={{uri: stringImgUrl}} />
      <FlatList
        data={otherSeries}
        renderItem={renderItem}
        keyExtractor={series => series.id}
        numColumns='2'
      />
    </View>
  );
}

export default CharacterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 40,
    marginTop: 30,
  },

  img: {
    width: 300,
  }
});

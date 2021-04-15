import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import Card from './Card';
import md5 from 'md5';

const SeriesScreen = ({ navigation, route }) => {

    let [characters, setCharacters] = useState([]);
    let { series } = route.params;

    const getCharactersInSeries = async () => {
    let ts = new Date().getTime();
    let message = ts+"5ee8c18f78856b9e12d234ffdda9b8f0eb6c11e8"+"c6f23ae3df5415b5cee5c9a78e3faca6";
    let hash = md5(message);
    let uri = series.characters.collectionURI;
    console.log(uri);
    console.log(`${uri}?apikey=c6f23ae3df5415b5cee5c9a78e3faca6&ts=${ts}&hash=${hash}&limit=100`);

    let response = await fetch(
      `${uri}?apikey=c6f23ae3df5415b5cee5c9a78e3faca6&ts=${ts}&hash=${hash}&limit=50`,  {
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
    setCharacters(results);
    return results;
  }

  useEffect(() => {
      getCharactersInSeries()
  }, [])

  const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Character', { character: item })} >
          <Card title={item.name} description={item.description} />
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>  
        <Text style={styles.title}>{series.title}</Text>
        {characters.length > 0 ? 
            <FlatList
            data={characters}
            renderItem={renderItem}
            keyExtractor={character => character.id}
            numColumns='2'
            />
        : <View>
            <Text>Sorry, we don't have any character sheets for this series.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text>Try again?</Text>
            </TouchableOpacity>
        </View> }
      
    </View>
  );
}

export default SeriesScreen;

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
});

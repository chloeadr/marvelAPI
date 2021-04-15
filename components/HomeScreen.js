import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import Card from './Card';
import md5 from 'md5';

const HomeScreen = ({ navigation }) => {

    let [series, setSeries] = useState([]);
    let [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100));

  const getSeries = async () => {
    let ts = new Date().getTime();
    let message = ts+"5ee8c18f78856b9e12d234ffdda9b8f0eb6c11e8"+"c6f23ae3df5415b5cee5c9a78e3faca6";
    let hash = md5(message);

    let response = await fetch(
      `https://gateway.marvel.com/v1/public/series?apikey=c6f23ae3df5415b5cee5c9a78e3faca6&ts=${ts}&hash=${hash}&limit=100`,  {
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
    setSeries(results);
    console.log(series);
    return results;
  }

  useEffect(() => {
      getSeries()
  }, [])

  function getRandomNumber() {
    let numberOfSeries = series.length();
    setRandomNumber(Math.floor(Math.random() * numberOfSeries));
  }

  const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Series', { series: item })} >
          <Card style={styles.card} title={item.title} description={item.description} />
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>  
      <Text style={styles.title}>Marvel Comics</Text>
      <TouchableOpacity onPress={() => getRandomNumber() }>
        <Text>Get a random series: {randomNumber}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Series', { series: series[0] })} >
          <Card style={styles.card} title={series[0].title} description={series[0].description} />
  </TouchableOpacity> */}
      <FlatList
        data={series}
        renderItem={renderItem}
        keyExtractor={series => series.id}
        numColumns='2'
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 40,
    marginTop: 30,
  },
});

import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const Card = (item) => (
    <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
    </View>
);
export default Card;

const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: '#FFE5D9',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      padding: 30,
      margin: 30,
      width: 300,
      textAlign: 'center',
    },

    title: {
        fontSize: 30,
        fontFamily: 'Barlow-Regular'
    },
  });
import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

const SecondScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>This is the second screen!</Text>
    </View>
  );
};

export default SecondScreen;

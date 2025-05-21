import React from 'react';
import {View, Text} from 'react-native';

import {User} from '../../types/Users';
import {capitalize, getInitials} from '../../utils/getinitials';
import {styles} from './styles';

const UserCard = ({user}: {user: User}) => (
  <View style={styles.container}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
    </View>
    <View>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.role}>{capitalize(user.role.toLowerCase())}</Text>
    </View>
  </View>
);

export default UserCard;

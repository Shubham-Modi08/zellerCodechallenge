import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {User} from '../../types/Users';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import UserCard from '../../components/User';
import {LIST_CUSTOMERS} from '../../graphql/queries';
import {styles} from './styles';

type RootStackParamList = {
  Home: undefined;
  Second: undefined;
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'MANAGER'>(
    'ADMIN',
  );
  const [searchText, setSearchText] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {data, loading, refetch} = useQuery<{
    listZellerCustomers: {
      items: User[];
    };
  }>(LIST_CUSTOMERS, {
    variables: {filter: {role: {eq: selectedRole}}},
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filteredUsers = (data?.listZellerCustomers?.items || []).filter(
    (user: User) => user.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderRadio = (role: 'ADMIN' | 'MANAGER') => {
    const isSelected = selectedRole === role;
    return (
      <TouchableOpacity
        onPress={() => setSelectedRole(role)}
        style={[styles.radioContainer, isSelected && styles.selectedRadio]}>
        <View style={styles.radioCircle}>
          {isSelected && <View style={styles.radioInnerCircle} />}
        </View>
        <Text style={styles.radioLabel}>
          {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>User Types</Text>
      {renderRadio('ADMIN')}
      {renderRadio('MANAGER')}

      <TextInput
        placeholder="Search by name"
        value={searchText}
        onChangeText={(text: string) => setSearchText(text)}
        style={styles.searchInput}
      />

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Second')}>
        <Text style={styles.linkText}>Go to Second Screen</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        {selectedRole === 'ADMIN' ? 'Admin Users' : 'Manager Users'}
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={{marginTop: 20}}
        />
      ) : (
        <FlatList<User>
          data={filteredUsers}
          keyExtractor={(item: User) => item.id}
          renderItem={({item}) => <UserCard user={item} />}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

export default HomeScreen;

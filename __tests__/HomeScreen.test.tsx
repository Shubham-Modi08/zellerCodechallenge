import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import {NavigationContainer} from '@react-navigation/native';
import {LIST_CUSTOMERS} from '../src/graphql/queries';
import HomeScreen from '../src/screens/Home';

const mockUsers = [
  {id: '1', name: 'John Doe', role: 'ADMIN'},
  {id: '2', name: 'Jane Smith', role: 'MANAGER'},
];

const adminMock = {
  request: {
    query: LIST_CUSTOMERS,
    variables: {filter: {role: {eq: 'ADMIN'}}},
  },
  result: {
    data: {
      listZellerCustomers: {
        items: [mockUsers[0]],
      },
    },
  },
};

const managerMock = {
  request: {
    query: LIST_CUSTOMERS,
    variables: {filter: {role: {eq: 'MANAGER'}}},
  },
  result: {
    data: {
      listZellerCustomers: {
        items: [mockUsers[1]],
      },
    },
  },
};

describe('HomeScreen', () => {
  it('renders correctly and toggles roles', async () => {
    const {getByText, getByPlaceholderText, queryByText} = render(
      <MockedProvider mocks={[adminMock, managerMock]} addTypename={false}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </MockedProvider>,
    );

    // Should show loading initially
    expect(getByText('User Types')).toBeTruthy();

    // Wait for data to load
    await waitFor(() => expect(getByText('John Doe')).toBeTruthy());

    // Toggle to MANAGER
    fireEvent.press(getByText('Manager'));

    await waitFor(() => expect(getByText('Jane Smith')).toBeTruthy());

    // Search for a user
    const searchInput = getByPlaceholderText('Search by name');
    fireEvent.changeText(searchInput, 'Jane');

    await waitFor(() => {
      expect(getByText('Jane Smith')).toBeTruthy();
      expect(queryByText('John Doe')).toBeNull();
    });
  });

  it('navigates to Second screen on button press', async () => {
    const mockNavigate = jest.fn();

    jest.mock('@react-navigation/native', () => {
      const actualNav = jest.requireActual('@react-navigation/native');
      return {
        ...actualNav,
        useNavigation: () => ({
          navigate: mockNavigate,
        }),
      };
    });

    const {getByText} = render(
      <MockedProvider mocks={[adminMock]} addTypename={false}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </MockedProvider>,
    );

    await waitFor(() => getByText('Go to Second Screen'));
    fireEvent.press(getByText('Go to Second Screen'));

    expect(mockNavigate).toHaveBeenCalledWith('Second');
  });
});

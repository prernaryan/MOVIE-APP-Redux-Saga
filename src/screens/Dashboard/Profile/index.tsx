import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {logOutAction} from '../../../redux/action/authAction';
import {images, RouteName} from '../../../constants';
import {goBack, navigate} from '../../../services/navigationService';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const {top} = useSafeAreaInsets();

  const handleLogout = () => {
    dispatch(logOutAction());
  };

  return (
    <View style={[styles.container, {marginTop: top}]}>
      <TouchableOpacity onPress={goBack}>
        <Image source={images.BACK_IMAGE} />
      </TouchableOpacity>
      <View style={styles.profileHeader}>
        <Image source={images.PROFILE_ICON} style={styles.profileImage} />
        <Text style={styles.profileName}>prernaryan</Text>
        <Text style={styles.profileEmail}>prernaryan@gmail.com</Text>
      </View>

      <View style={styles.profileDetails}>
        <Text style={styles.detailsText}>Membership: Premium</Text>
        <Text style={styles.detailsText}>Joined: November 2024</Text>
      </View>
      <TouchableOpacity
        style={styles.trendingPeople}
        onPress={() => navigate(RouteName.TRENDINGPEOPLE)}>
        <Text style={styles.logoutText}>Trending People</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  profileDetails: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 20,
  },
  detailsText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF5A5F',
    marginHorizontal: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  trendingPeople: {
    backgroundColor: '#7a4597',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginHorizontal: 50,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Profile;

import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images, RouteName} from '../../../constants';
import {navigate} from '../../../services/navigationService';
import {Movie} from '../../../redux/saga/homeSaga';
import {useSelector, useDispatch} from 'react-redux';
import {getWatchlistAction} from '../../../redux/action/watchlistAction';

const DATA = [];
const WatchList = () => {
  const {getWatchlistRes} = useSelector((state: any) => state.watchlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatchlistAction());
  }, []);
  const renderItem = ({item}: {item: Movie}) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
        style={styles.poster}
      />
      <View style={styles.cardDetails}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.overview} numberOfLines={2}>
          {item.overview}
        </Text>
        <Text style={styles.meta}>Release Date: {item.release_date}</Text>
        <Text style={styles.vote}>⭐ {item.vote_average}</Text>
      </View>
    </TouchableOpacity>
  );
  const {top} = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{marginTop: top, marginLeft: 20}}
        onPress={() => navigate(RouteName.HOME)}>
        <Image source={images.BACK_IMAGE} tintColor={'white'} />
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          color: 'white',
          fontWeight: 'bold',
        }}>
        WatchList
      </Text>
      <FlatList
        data={getWatchlistRes?.data ?? []}
        style={{marginTop: 20, marginBottom: 40}}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => {
          <Text>No WatchListAdded</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  poster: {
    width: 100,
    height: 150,
  },
  cardDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  overview: {
    color: '#BBB',
    fontSize: 14,
    marginBottom: 8,
  },
  meta: {
    color: '#777',
    fontSize: 12,
  },
  vote: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default WatchList;

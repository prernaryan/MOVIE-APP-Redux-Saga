import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {trendingPeopleAction} from '../../../redux/action/trendingPeople';
import {images} from '../../../constants';
import {goBack} from '../../../services/navigationService';

const TrendingPeople: React.FC = () => {
  const dispatch = useDispatch<any>();
  const {trendingPplRes} = useSelector((state: any) => state.trendingPeople);
  const [page, setPage] = React.useState(trendingPplRes?.currentPage ?? 1);
  const [loadingMore, setLoadingMore] = React.useState(false); // State to track loading for pagination

  useEffect(() => {
    dispatch(trendingPeopleAction(page));
  }, [dispatch, page]);

  const renderPerson = ({item}: {item: any}) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
        }}
        style={styles.image}
      />
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={styles.popularity}>
        Popularity: {item.popularity.toFixed(1)}
      </Text>
    </View>
  );
  const loadMoreMovies = () => {
    if (
      trendingPplRes?.currentPage < trendingPplRes?.totalPage &&
      !loadingMore
    ) {
      setLoadingMore(true);
      setPage(trendingPplRes?.currentPage + 1);
    }
  };
  console.log('====================================');
  console.log(
    trendingPplRes?.currentPage,
    trendingPplRes?.totalPage,
    'trendingPplRes?.currentPage',
  );
  console.log('====================================');
  React.useEffect(() => {
    if (trendingPplRes?.data && !trendingPplRes?.loading) {
      setLoadingMore(false);
    }
  }, [trendingPplRes]);
  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return null;
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Image source={images.BACK_IMAGE} />
      </TouchableOpacity>
      <Text style={styles.header}>Trending People</Text>
      <FlatList
        data={trendingPplRes?.data}
        renderItem={renderPerson}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreMovies}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  footer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: width / 2 - 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  popularity: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default TrendingPeople;

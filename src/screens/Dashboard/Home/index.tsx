import React, {useState} from 'react';
import {
  Text,
  FlatList,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {trendinMoviesAction} from '../../../redux/action/homeAction';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images, RouteName} from '../../../constants';
import {navigate} from '../../../services/navigationService';
import {imageBaseUrl} from '../../../utils/helperFunction';
const {width} = Dimensions.get('window');

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const Home: React.FC = () => {
  const {top} = useSafeAreaInsets();
  const [search, setSearch] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>();
  const dispatch = useDispatch<any>();
  const {trendingMoviesRes} = useSelector((state: any) => state.home);
  const [loadingMore, setLoadingMore] = useState(false); // State to track loading for pagination
  const [page, setPage] = useState(trendingMoviesRes?.currentPage ?? 1);
  React.useEffect(() => {
    dispatch(trendinMoviesAction(page));
  }, [dispatch, page]);
  React.useEffect(() => {
    if (!trendingMoviesRes?.loading && trendingMoviesRes?.data) {
      if (search) {
        const searchLowerCase = search.toLowerCase();
        const filtered = trendingMoviesRes?.data?.filter((movie: Movie) =>
          movie.title.toLowerCase().includes(searchLowerCase),
        );
        setFilteredMovies(filtered);
      } else {
        setFilteredMovies(trendingMoviesRes?.data ?? []);
      }
      setLoadingMore(false);
    }
  }, [trendingMoviesRes?.data, trendingMoviesRes?.loading, search]);

  const renderItem = React.useCallback(
    ({item}: {item: Movie}) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigate(RouteName.DETAILS, {movie: item})}>
        <Image
          source={{
            uri: `${imageBaseUrl}${item.poster_path}`,
          }}
          style={styles.poster}
        />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    ),
    [],
  );
  const loadMoreMovies = () => {
    if (
      trendingMoviesRes?.currentPage < trendingMoviesRes?.totalPage &&
      !loadingMore &&
      !search
    ) {
      setLoadingMore(true);
      setPage(trendingMoviesRes?.currentPage + 1);
    }
  };
  const renderFooter = () => {
    return loadingMore ? (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : null;
  };
  return (
    <SafeAreaView style={{top: top}}>
      <View
        style={{
          marginHorizontal: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigate(RouteName.PROFILE)}>
          <Image source={images.PROFILE_ICON} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate(RouteName.WATCH_LIST)}>
          <Text>WatchList</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        style={{marginBottom: 110}}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreMovies} // Trigger load more when scrolled to end
        ListFooterComponent={renderFooter} // Add footer component for loa
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchBar: {
    borderColor: '#ccc',
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
  poster: {
    width: width / 2.5,
    height: width / 2,
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default Home;

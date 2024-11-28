import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../../constants';
import {goBack} from '../../../services/navigationService';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteRateMovie,
  getRatedMoviesAction,
  rateMovie,
} from '../../../redux/action/homeAction';
import {imageBaseUrl} from '../../../utils/helperFunction';
import {SCREEN_WIDTH} from '../../../utils/responsve';
import {
  addWatchlistAction,
  getWatchlistAction,
} from '../../../redux/action/watchlistAction';

const {width} = Dimensions.get('window');

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
}

type Props = {
  route: {
    params: {
      movie: Movie;
    };
  };
};

const Details: React.FC<Props> = ({route}) => {
  const {getRatedMoviesRes} = useSelector((state: any) => state.home);
  const {getWatchlistRes} = useSelector((state: any) => state.watchlist);
  console.log('getWatchlistRes', getWatchlistRes?.data);
  const {movie} = route.params;
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch<any>();
  const [rating, setRating] = useState<number | null>(null);
  const [alreadyRated, setAlreadyRated] = useState(false);

  const [alreadyAdded, setAlreadyAdded] = useState(false);
  React.useEffect(() => {
    dispatch(getRatedMoviesAction());
    dispatch(getWatchlistAction());
  }, []);
  React.useEffect(() => {
    if (!getRatedMoviesRes?.loading && getRatedMoviesRes?.data) {
      const matchFound = getRatedMoviesRes?.data.some(
        (item: Movie) => item.id === movie.id,
      );
      setAlreadyRated(matchFound);
    }
  }, [getRatedMoviesRes, movie.id]);
  React.useEffect(() => {
    if (!getWatchlistRes?.loading && getWatchlistRes?.data) {
      const matchFound = getWatchlistRes?.data.some(
        (item: Movie) => item.id === movie.id,
      );
      setAlreadyAdded(matchFound);
    }
  }, [getWatchlistRes, movie.id]);
  // React.useEffect(() => {
  //   if (deleteRateMovieRes?.success || rateMovieRes?.success) {
  //     dispatch(showAppLoader());
  //     setTimeout(() => {
  //       dispatch(getRatedMoviesAction());
  //     }, 2000);
  //   }
  // }, [deleteRateMovieRes, rateMovieRes]);

  // Post Rating
  const handlePostRating = () => {
    if (!alreadyRated) {
      if (rating !== null) {
        dispatch(rateMovie({movieId: movie.id, rating}));
      } else {
        Alert.alert('Please select a rating first.');
      }
    } else {
      setRating(null);
      dispatch(deleteRateMovie({movieId: movie.id}));
    }
  };

  const handleAddToWatchlist = () => {
    if (!alreadyAdded) {
      dispatch(addWatchlistAction({movieId: movie.id}));
    } else {
      Alert.alert('Already added to Watchlist!');
    }
  };

  return (
    <View style={[styles.main]}>
      <ScrollView style={[styles.container, {top: top}]}>
        <TouchableOpacity onPress={goBack}>
          <Image source={images.BACK_IMAGE} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: alreadyAdded ? '#157c92' : '#147450'},
          ]}
          onPress={handleAddToWatchlist}>
          <Image
            source={alreadyAdded ? images.TICK_MARK : images.WISHLIST_ICON}
            style={[
              styles.icon,
              {
                tintColor: 'white',
                opacity: alreadyAdded ? 1 : 0.5,
              },
            ]}
          />
          <Text style={[styles.text]}>
            {alreadyAdded ? 'Added to Watchlist' : 'Add to Watchlist'}
          </Text>
        </TouchableOpacity>
        <Image
          source={{uri: `${imageBaseUrl}${movie.backdrop_path}`}}
          style={styles.backdrop}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.releaseDate}>
          Release Date: {movie.release_date}
        </Text>
        <Text style={styles.rating}>
          Average Rating: {movie.vote_average} ({movie.vote_count} votes)
        </Text>
        <View style={styles.actions}>
          <Text style={styles.subTitle}>Your Rating:</Text>
          {!alreadyRated && (
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(num => (
                <TouchableOpacity key={num} onPress={() => setRating(num)}>
                  <Text
                    style={[
                      styles.ratingButton,
                      rating === num && styles.selectedRating,
                    ]}>
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Button
            title={alreadyRated ? 'Delete Rating' : 'Post Rating'}
            onPress={handlePostRating}
            color={alreadyRated ? 'red' : 'blue'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  main: {flex: 1, backgroundColor: '#fff'},
  backdrop: {
    width: width - 40,
    height: width / 1.5,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  rating: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  actions: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  ratingButton: {
    fontSize: 18,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  selectedRating: {
    backgroundColor: '#f39c12',
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 170,
    width: SCREEN_WIDTH / 2,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#c7b087',
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default Details;

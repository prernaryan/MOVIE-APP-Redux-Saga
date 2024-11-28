import {
  TRENDING_PEOPLE,
  TRENDING_PEOPLE_SUCCESS,
  TRENDING_PEOPLE_FAIL,
} from './../Type';

interface PersonData {
  page: number;
  results: Person[];
  total_pages: number;
}

interface Person {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  popularity: number;
  gender: number;
  known_for_department: string;
  profile_path: string;
  known_for: KnownFor[];
}

interface KnownFor {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingPeopleState {
  trendingPplRes: {
    loading: boolean;
    data?: PersonData | null;
    error: string | null;
    totalPage: number;
    currentPage: number;
  };
}

const initialState: TrendingPeopleState = {
  trendingPplRes: {
    loading: false,
    data: null,
    error: null,
    totalPage: 1,
    currentPage: 1,
  },
};

export const trendingPpleReducer = (
  state = initialState,
  action: any,
): TrendingPeopleState => {
  switch (action.type) {
    case TRENDING_PEOPLE:
      return {
        ...state,
        trendingPplRes: {
          ...state.trendingPplRes,
          loading: true,
          error: null,
        },
      };
    case TRENDING_PEOPLE_SUCCESS:
      return {
        ...state,
        trendingPplRes: {
          ...state.trendingPplRes,
          loading: false,
          data:
            action?.currentPage > 1
              ? [...state.trendingPplRes?.data, ...action.data]
              : action.data,
          error: null,
          currentPage: action?.currentPage,
          totalPage: action?.totalPage,
        },
      };
    case TRENDING_PEOPLE_FAIL:
      return {
        ...state,
        trendingPplRes: {
          ...state.trendingPplRes,
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};

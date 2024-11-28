import {TRENDING_PEOPLE} from '../Type';

interface TrendingPeopleAction {
  type: typeof TRENDING_PEOPLE;
  data: number;
}

export const trendingPeopleAction = (page: number): TrendingPeopleAction => {
  return {
    type: TRENDING_PEOPLE,
    data: page,
  };
};

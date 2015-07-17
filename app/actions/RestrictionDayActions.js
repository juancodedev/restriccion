import { SET_LATEST_RESTRICTION_DAY } from '../constants/ActionTypes';

export function setLatestRestrictionDay(restrictionDay) {
  return {
    type          : SET_LATEST_RESTRICTION_DAY,
    restrictionDay
  };
}

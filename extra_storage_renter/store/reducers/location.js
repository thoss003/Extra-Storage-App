//import a module located in a Different file
import { SET_LOCATION } from '../actions/locations';
const initialState = {
  location: { 'lat': 100, 'lng': 100 },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: {

          'lat': action.location.coords.latitude,
          'lng': action.location.coords.longitude,
        }
      };
  }
  return state;
};
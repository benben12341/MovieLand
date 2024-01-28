import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  movieListReducer,
  movieDetailsReducer,
  movieDeleteReducer,
  movieCreateReducer,
  movieUpdateReducer,
  movieCreateReviewReducer,
  movieTopRatedReducer,
} from './reducers/movieReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  movieList: movieListReducer,
  movieDetails: movieDetailsReducer,
  movieDelete: movieDeleteReducer,
  movieCreate: movieCreateReducer,
  movieUpdate: movieUpdateReducer,
  movieCreateReview: movieCreateReviewReducer,
  movieTopRated: movieTopRatedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

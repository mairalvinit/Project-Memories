import {combineReducers} from 'redux';
import posts from './posts';
import auth from './Auth'

//console.log(posts);
export default combineReducers({ posts,auth });
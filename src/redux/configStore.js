import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { LoadingReducer } from '../redux/LoadingReducer'
import { JobReducer } from './Admin/reducer/JobReducer';
import { JobTypeDetailReducer } from './Admin/reducer/JobTypeDetailReducer';
import { QLNDreducer } from './Admin/reducer/QLNDReducer';
import { JobTypeReducer } from './Admin/reducer/JobTypeReducer';
import { InfoDetailJobReducer } from './User/reducer/InfoDetailJobReducer';
import {ListMenuJobReducer} from './User/reducer/ListMenuJobReducer';
import { ManegeCommentReducer } from './User/reducer/ManegeCommentReducer';
import { ManegeListJobReducer } from './User/reducer/ManegeListJobReducer';
import { UserReducer } from './User/reducer/UserReducer';

const rootReducer = combineReducers({
    LoadingReducer,
    JobReducer,
    JobTypeDetailReducer,
    QLNDreducer,
    // ListJobByNameReducer,
    ManegeListJobReducer,
    ListMenuJobReducer,
    JobTypeReducer,
    InfoDetailJobReducer,
    UserReducer,
    ManegeCommentReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk))
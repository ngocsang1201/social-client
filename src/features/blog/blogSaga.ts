import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import postApi from 'api/postApi';
import { IListParams, IListResponse, IPost, ISearchObj } from 'models';
import { blogActions } from './blogSlice';

function* fetchPostList(action: PayloadAction<IListParams>) {
  const params: IListParams = {
    page: 1,
    limit: 10,
    ...action.payload,
  };

  try {
    const response: IListResponse<IPost> = yield call(postApi.getAll, params);
    yield put(blogActions.fetchPostListSuccess(response));
  } catch (error) {
    yield put(blogActions.fetchPostListFailure());
    console.log('Failed to fetch post list:', error);
  }
}

function* fetchSavedList(action: PayloadAction<IListParams>) {
  const params: IListParams = {
    page: 1,
    limit: 10,
    ...action.payload,
  };

  try {
    const response: IListResponse<IPost> = yield call(postApi.getSavedList, params);
    yield put(blogActions.fetchSavedListSuccess(response));
  } catch (error) {
    yield put(blogActions.fetchSavedFailure());
    console.log('Failed to fetch saved post list:', error);
  }
}

function* fetchPostDetail(action: PayloadAction<string>) {
  try {
    const post: IPost = yield call(postApi.getBySlug, action.payload);
    yield put(blogActions.fetchPostDetailSuccess(post));
  } catch (error) {
    yield put(blogActions.fetchPostDetailFailure());
    console.log('Failed to fetch post detail:', error);
  }
}

function* handleLikePost(action: PayloadAction<string>) {
  try {
    const post: IPost = yield call(postApi.like, action.payload);
    yield put(blogActions.likePostSuccess(post));
    yield put(blogActions.updateStatistics({ likeCount: post.statistics?.likeCount }));
  } catch (error) {
    console.log('Failed to like post:', error);
  }
}

function* handleSearchWithDebounce(action: PayloadAction<ISearchObj>) {
  const searchObj = action.payload;

  try {
    if (searchObj.searchTerm.length > 2) {
      const response: IPost[] = yield call(postApi.search, searchObj);
      yield put(blogActions.searchWithDebounceSuccess(response));
    } else {
      yield put(blogActions.searchWithDebounceSuccess([]));
    }
  } catch (error) {
    console.log('Failed to fetch post list with search debounce:', error);
    yield put(blogActions.searchWithDebounceFailure());
  }
}

export default function* postSaga() {
  yield takeLatest(blogActions.fetchPostList.type, fetchPostList);
  yield takeLatest(blogActions.fetchSavedList.type, fetchSavedList);
  yield takeLatest(blogActions.fetchPostDetail.type, fetchPostDetail);

  yield takeLatest(blogActions.likePost.type, handleLikePost);

  yield debounce(500, blogActions.searchWithDebounce.type, handleSearchWithDebounce);
}

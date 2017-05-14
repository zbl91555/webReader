import * as types from './mutationsTypes';
import api from '../api';
const ERR_OK = 0;

export default {
  //首页加载更多请求
  [types.UPLOAD_GUESS]({commit, state}) {
    return new Promise((resolve, reject) => {
      if (state.guessContent.last) {
        api.guessApi(state.guessContent.last).then(res => {
          if (res.data.status === ERR_OK) {
            commit(types.UPLOAD_GUESS, res.data);
            resolve();
          } else {
            reject();
          }
        });
      }
      else {
        api.firstGuessApi().then(res => {
          if (res.data.status === ERR_OK) {
            commit(types.UPLOAD_GUESS, res.data);
            resolve();
          } else {
            reject();
          }
        });
      }
    });
  },
  //获得详情页章节数据
  [types.GET_DETAIL_DATA]({commit, state}) {
    return new Promise((resolve, reject) => {
      api.detailApi(state.bookId).then(res => {
        if (res.data.status === ERR_OK) {
          commit(types.UPLOAD_GUESS, res.data);
          resolve(res.data);
        } else {
          reject();
        }
      })
    });
  },
  //获取书籍章节列表
  [types.GET_CATELOG_DATA]({commit, state}) {
    return new Promise((resolve, reject) => {
      api.catelogDate(state.bookId).then(res => {
        if (res.data.status === ERR_OK) {
          commit(types.GET_CATELOG_DATA, res.data.data.list);
          resolve(res.data);
        } else {
          reject();
        }
      })
    });
  },
  //获取章节内容
  [types.GET_CHAPTER_DATA]({getters}) {
    return new Promise((resolve, reject) => {
      api.chapterApi(getters.chapterId).then(res => {
        if (res.data.status === ERR_OK) {
          // commit(types.GET_CHAPTER_DATA, res.data.data.list);
          resolve(res.data);
        } else {
          reject();
        }
      })
    });
  },
  //用户登录
  [types.USER_LOGIN]({commit}, payload) {
    return new Promise((resolve, reject) => {
      api.userLoginApi(payload.phoneNumber, payload.password).then(res => {
        resolve(res.data);
      });
    });
  },
  //获得用户个人信息
  [types.USER_MINE]({commit}) {
    return new Promise((resolve, reject) => {
      api.userMineApi().then((data) => {
        let isLogin = false;
        if (data.data.status === ERR_OK) {
          isLogin = true;
          let userInfo = data.data.data.user;
          commit(types.USER_MINE, {userInfo, isLogin});
          resolve();
        } else if (data.data.status = -244) {
          commit(types.USER_MINE, {isLogin});
          reject(data);
        }
      })
    });
  },
  [types.GET_FAVORITE_DATA]({commit}, payload) {
    return new Promise((resolve) => {
      api.favoriteApi().then((data) => {
        if (data.data.status === ERR_OK) {
          commit(types.GET_FAVORITE_DATA, {list: data.data.data.list, isFirstLoadFav: payload.isFirstLoadFav});
          resolve(data.data.data.list)
        }
      })
    });
  }
}

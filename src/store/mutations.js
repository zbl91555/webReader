import * as types from './mutationsTypes';

export default {
  //保存图书ID
  [types.SET_BOOK_ID](state, payload) {
    if (!payload) {
      return;
    }
    state.bookId = payload;
  },
  [types.UPLOAD_GUESS](state, payload) {
    if (payload.status === 0) {
      state.guessContent = payload.data;
    }
  },
  [types.GET_CATELOG_DATA](state, payload) {
    state.chapterListIds = []; //防止多次点击时章节顺序错乱
    state.chapterList = payload;
    payload.forEach(item => {
      state.chapterListIds.push(item.id);
    });
  },
  [types.GET_CHAPTER_INDEX](state, payload) {
    state.chapterIndex = payload;
  },
  [types.KEYBOARD_POPUP](state, payload) {
    if (!payload) {
      setTimeout(() => {
        state.isKeyboardPopup = payload;
      }, 300)
    } else {
      state.isKeyboardPopup = payload;
    }

  },
  [types.USER_MINE](state, payload) {
    if (payload.userInfo) {
      state.userInfo = payload.userInfo;
    }
    state.isLogin = payload.isLogin;
  },
  [types.GET_FAVORITE_DATA](state, payload) {
    state.favoriteList = payload.list;
    state.isFirstLoadFav = payload.isFirstLoadFav;
  },
  [types.CHANGE_FAVORITE_LIST](state, payload) {
    if (!payload.isAddFav) {
      state.favoriteList = state.favoriteList.filter((item) => {
        return payload.bookID !== item.id;
      });
    }
  },
  [types.CHANGE_GUIDE_STATE](state, payload) {
    if (state.isLogin) {
      state.guideInfo.isShowGuide = false;
    }
    else {
      state.guideInfo.GuideHref = payload.GuideHref;
      state.guideInfo.isShowGuide = payload.isShowGuide;
    }
  }
}

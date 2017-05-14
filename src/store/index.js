import Vue from 'vue';
import Vuex from 'vuex';


//关联vuex
Vue.use(Vuex);

//引入基本文件
import getters from './getters';
import mutations from './mutations';
import actions from './actions';


const state = {
  bookId: null, //书籍ID
  favoriteList: [], //收藏列表
  chapterList: [],//当前数据列表
  chapterListIds: [], //当前书籍章节列表
  chapterIndex: 0, //章节索引
  guessContent: {}, //猜你喜欢数据
  userInfo: {}, //用户登录信息
  isLogin: false, //用户是否登录
  isKeyboardPopup: false, //键盘状态
  isFirstLoadFav: true, //是有第一次加载猜你喜欢列表
  guideInfo: {isShowGuide: true, GuideHref: 'login'},//显示引导页内容信息
}

//导出vuex实例化对象
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

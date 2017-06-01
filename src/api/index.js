import axios from 'axios';
const postfix = 'tf_webapp=1&c_av=4.3.0';

export default {
  bannerApi() {
    // banner 数据获取
    return axios.get(`https://api.doufu.la/index.php/banner/get?place=home.novel&${postfix}`);
  },
  contentApi() {
    // banner 数据获取
    return axios.get(`https://api.doufu.la/index.php/topics/novel_entrance?${postfix}`);
  },
  guessApi(last) {
    //猜你喜欢 数据获取
    return axios.get(`https://api.doufu.la/index.php/novel/personal_recommend?last=${last}&${postfix}`);
  },
  firstGuessApi() {
    //猜你喜欢 首次数据获取
    return axios.get(`https://api.doufu.la/index.php/novel/personal_recommend?last=&${postfix}`);
  },
  detailApi(bookId) {
    //详情页 数据获取
    return axios.get(`https://api.doufu.la/index.php/topic/novel?topic_id=${bookId}&${postfix}`);
  },
  catelogDate(bookId) {
    //书籍章节列表 数据获取
    return axios.get(`https://api.doufu.la/index.php/novel/chapter_list?novel_id=${bookId}&${postfix}`);
  },
  chapterApi(chapterId) {
    //章节内容 数据获取
    return axios.get(`https://api.doufu.la/index.php/post/view/${chapterId}?type=read&${postfix}`);
  },
  userLoginApi(phoneNumber, password) {
    //用户登录
    return axios.get(`https://api.doufu.la/index.php/member/user_login?account=${phoneNumber}&password=${password}&${postfix}`);
  },
  userMineApi() {
    //用户信息 数据获取
    return axios.get(`https://api.doufu.la/index.php/member/mine?${postfix}`);
  },
  favoriteApi() {
    //收藏列表 数据获取
    return axios.get(`https://api.doufu.la/index.php/favorite?fav_type=18&last=0&size=20&new=1&${postfix}`);
  },
  forgetApi(phoneNumber) {
    //忘记密码
    return axios.get(`https://api.doufu.la/index.php/member/reset_passwords?account=${phoneNumber}&${postfix}`)
  },
  removeCollectApi(bookID) {
    //取消收藏书籍
    return axios.get(`https://api.doufu.la/index.php/favorite/remove?id=${bookID}&object_type=5&${postfix}`)
  },
  addCollectApi(bookID) {
    //添加收藏书籍
    return axios.get(`https://api.doufu.la/index.php/favorite/add?id=${bookID}&object_type=5&${postfix}`)
  },
  searchApi(keyword) {
    //搜索内容 数据获取
    return axios.get(`https://api.doufu.la/index.php/search/content?types=18&keyword=${keyword}&size=20&start=0&${postfix}`)
  },
  categoryApi() {
    //分类页面数据获取
    return axios.get(`https://api.doufu.la/index.php/entrance_item/novel_category?begin=0&last=&lastStart=0&rows=0&sex=1&size=20&start=0&${postfix}`);
  },
    //详细分类数据
  detailCategoryApi(keyword) {
    return axios.get(`https://api.doufu.la/index.php/search/single?keyword=${keyword}&types=18&smart_filter=1&last=&size=20&${postfix}`);
  },
  vipApi() {
    //vip页面数据获取
    return axios.get(`https://api.doufu.la/index.php/albums/items?id=1316&last=&size=20&tf_webapp=1&${postfix}`);
  },
  lastApi() {
    //最新页面数据获取
    return axios.get(`https://api.doufu.la/index.php/topics/latestNovels?last=&size=20&tf_webapp=1&${postfix}`);
  },
  bookListApi() {
    //书单页面数据获取
    return axios.get(`https://api.doufu.la/index.php/albums/items?id=1659&last=&size=20&${postfix}`);
  },
  finishedApi() {
    //完结页面数据获取
    return axios.get(`https://api.doufu.la/index.php/post/topics?type=18&finished=1&last=&size=20&last=&size=20&${postfix}`);
  },
  rankApi() {
    //排行页面数据获取
    return axios.get(`https://api.doufu.la/index.php/albums/items?id=1375&begin=0&last=&lastStart=0&rows=0&size=20&start=0&${postfix}`);
  }
}

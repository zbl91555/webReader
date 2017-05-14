<template>
  <div class="bookrack-container">
    <top-bar :hasBackBtn="false">我的收藏</top-bar>
    <div class="bookrack-wrap">
      <mu-list>
        <mu-list-item :title="book.title" v-for="book in favoriteList" class="book">
          <mu-avatar :src="book.images[0].imgUrl" slot="leftAvatar" @click="goDetail(book.id)"/>
      <span slot="describe" @click="goDetail(book.id)">
        <span style="color: rgba(0, 0, 0, .87)">{{book.author}}&nbsp;&nbsp;&nbsp;&nbsp;<span
          class="lastTitle">最新章节：{{book.last_origin_title}}</span></span><span class="desc">{{book.des}}
      </span>
      </span>
          <mu-icon-menu slot="right" icon="☆" tooltip="操作">
            <mu-menu-item title="取消收藏" @click="removeFav(book.id)"/>
          </mu-icon-menu>
        </mu-list-item>
      </mu-list>
    </div>
    <keep-alive>
      <r-footer></r-footer>
    </keep-alive>
    <mu-raised-button label="刷 新" class="demo-raised-button refresh" @click="refreshFavList" v-if="isLogin"/>
    <div class="guide" v-if="!isLogin">
      <div class="goLogin" @click="goLogin">手机号登录</div>
      <div class="goRegister" @click="goRegister">手机号注册</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import footer from '../../components/footer/footer';
  import {mapState} from 'vuex';
  import topBar from '../../components/common/topBar';
  import * as types from '../../store/mutationsTypes';
  import api from  '../../api';

  export default {
    components: {
      'rFooter': footer,
      'topBar': topBar
    },
    computed: {
      ...mapState(['favoriteList', 'isFirstLoadFav', 'isLogin'])
    },
    methods: {
      goDetail(bookId) {
        this.$router.push({path: '/detail', params: {bookId}});
        this.$store.commit(types.SET_BOOK_ID, bookId);
      },
      removeFav(bookID) {
        //对书籍进行删除操作
        api.removeCollectApi(bookID).then(() => {
          this.$store.commit(types.CHANGE_FAVORITE_LIST, {bookID, isAddFav: false});
        });
      },
      refreshFavList() {
        this.$store.dispatch(types.GET_FAVORITE_DATA, {'isFirstLoadFav': false});
      },
      goLogin(){
        this.$store.commit(types.CHANGE_GUIDE_STATE, {isShowGuide: false, GuideHref: 'login'});
        this.$router.push({path: '/mine/login'});
      },
      goRegister() {
        this.$store.commit(types.CHANGE_GUIDE_STATE, {isShowGuide: false, GuideHref: 'register'});
        this.$router.push({path: '/mine/register'});
      }
    },
    created() {
      if (this.isFirstLoadFav) { //当第一次加载收藏列表时请求数据
        this.$store.dispatch(types.GET_FAVORITE_DATA, {'isFirstLoadFav': false});
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .bookrack-container {
    background-color: rgb(244, 244, 244);
    min-height: 700px;
    .bookrack-wrap {
      padding: 44px 0;
      .book {
        font-size: 18px;
        margin: 10px 10px 0;
        background-color: #fff;
        .lastTitle {
        }
        .desc {
          white-space: pre-wrap;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
        }
      }
    }
    .guide {
      position: fixed;
      top: 44px;
      left: 0;
      width: 100%;
      .goRegister, .goLogin {
        width: 276px;
        height: 40px;
        margin: 20px auto 0;
        background-color: rgb(254, 110, 110);
        line-height: 40px;
        text-align: center;
        border-radius: 20px;
        font-size: 18px;
        color: rgb(255, 255, 255);
      }
    }
    .refresh {
      position: absolute;
      z-index: 1112;
      top: 0;
      right: 6px;
      height: 44px;
      width: 50px;
      font-size: 16px;
    }
  }
</style>

<template>
  <div class="detail-wrap">
    <r-loading v-if="isLoading"></r-loading>
    <div class="backUp-wrap" @click="goBack">
      <div class="backUp"><span class="icon"></span></div>
    </div>
    <div class="footer-container">
      <div class="footer-wrap">
        <!--@click="changeFav(detailData)"-->
        <div class="collect" @click="changeFav(detailData.id)">
          <span class="icon" :class="{'selected':has_fav}"></span>
          <span class="text"><span ref="text">收藏</span> <strong class="collect-times"> {{collect_times}}</strong></span>
        </div>
        <mu-raised-button label="进入阅读" color="#fff" class="demo-raised-button in-reading" @click="goToReader"/>
      </div>
    </div>
    <div class="header-container" v-if="detailData.images">
      <img :src="detailData.images[0].imgUrl" width="100%" height="100%">
      <ul class="header-wrap">
        <li class="title">
          <span class="icon" v-if="detailData.is_vip === '1'"></span>
          <span class="text">{{detailData.title}}</span>
        </li>
        <li class="author" v-if="detailData.user">作者 ：{{detailData.user.name}}</li>
        <li class="desc">
          {{detailData.has_praise?'完结':'连载中'}} | {{detailData.length}}字 | {{detailData.read_times}}次浏览
        </li>
        <!--//需要改进-->
        <li class="tags-container" v-if="detailData.tags">
          <ul class="tags-wrap">
            <li class="tag" v-for="item in detailData.tags">{{item.name}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="content-container">
      <ul class="catalog-container">
        <li class="text">目录</li>
        <li class="catalog-wrap" @click="openCatelog">连载至{{detailData.article_num}}章&nbsp;&nbsp;最近更新：{{transDate}}&nbsp;&nbsp;&nbsp;&gt;</li>
      </ul>
      <div class="content-wrap">
        <p class="info">简介</p>
        <p class="desc">{{detailData.des}}</p>
      </div>
      <div class="author-contain" v-if="detailData.user">
        <div class="avatar">
          <img :src="detailData.user.icon" height="60" width="60" class="icon">
          <span class="logo"></span>
        </div>
        <div class="desc-wrap">
          <p class="name">{{detailData.author}}</p>
          <p class="desc">{{detailData.user.signature}}</p>
        </div>
      </div>
    </div>
    <r-back></r-back>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from '../../../static/js/moment'
  import chapterList from '../catelog/catelog';
  import * as types from '../../store/mutationsTypes';
  import loading from './../../components/common/loading';
  import goBack from '../../components/common/goBack.vue';
  import {mapState} from 'vuex';
  import api from  '../../api';

  export default {
    data() {
      return {
        detailData: {},
        isShowList: false,
        isLoading: true,
        has_fav: false,
        collect_times: 6666
      }
    },
    components: {
      'r-back': goBack,
      'rLoading': loading
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      openCatelog() {
        this.$router.push({path: '/catelog'});
      },
      goToReader() { //进入阅读器
        this.$store.commit(types.GET_CHAPTER_INDEX, 0);
        this.$router.push({path: '/reader'});
      },
      changeFav(bookID) { //改变书籍收藏状态
        if (!this.isLogin) {
          return;
        }
        if (this.has_fav) {  //移除收藏列表操作
          this.$refs.text.innerHTML = '正在移除收藏';
          api.removeCollectApi(bookID).then(() => {
            this.$store.commit(types.CHANGE_FAVORITE_LIST, {bookID, isAddFav: false});
            this.has_fav = false;
            this.collect_times--;
            this.$refs.text.innerHTML = '收藏';
          });
        } else { //添加收藏列表操作
          this.$refs.text.innerHTML = '正在添加收藏';
          api.addCollectApi(bookID).then(() => {
            this.$store.commit(types.CHANGE_FAVORITE_LIST, {bookID, isAddFav: true});
            this.has_fav = true;
            this.collect_times++;
            this.$refs.text.innerHTML = '收藏';
          });
        }
      }
    },
    computed: {
      ...mapState(['isLogin']),
      //计算后的时间
      transDate() {
        let times = moment(this.detailData.update_time * 1000).fromNow(true).split(' ');
        switch (times[1]) {
          case 'hours' :
            return times[0] + '小时前';
            break;
          case 'minutes' :
            return times[0] + '分钟前';
            break;
          case 'days' :
            return times[0] + '天前';
            break;
          case 'weeks' :
            return times[0] + '周前';
            break;
          case 'months' :
            return times[0] + '月前';
            break;
          case 'years' :
            return times[0] + '年前';
            break;
          default :
            return times.join('');
        }
      }
    },
    created() {
      this.$store.dispatch(types.GET_DETAIL_DATA).then((data) => {
        this.detailData = data.data.topic;
        this.collect_times = data.data.topic.collect_times;
        this.has_fav = data.data.topic.has_fav;
      });

      this.$store.dispatch(types.GET_CATELOG_DATA).then((data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
      });
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .detail-wrap {
    .backUp-wrap {
      position: absolute;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      height: 44px;
      .backUp {
        height: 100%;
        line-height: 52px;
        width: 72px;
        .icon {
          display: inline-block;
          margin-left: 10px;
          width: 22px;
          height: 22px;
          background-image: url("../../../static/img/nav_back_white.png");
          background-size: 100% 100%;
        }
      }
    }
    .header-container {
      position: relative;
      width: 100%;
      height: 180px;
    }
    .header-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-left: 20px;
      background-color: rgba(0, 0, 0, 0.3);
      .title {
        position: relative;
        margin-top: 70px;
        margin-left: 30px;
        color: #fff;
        font-size: 20px;
        margin-bottom: 6px;
        .icon {
          position: absolute;
          top: 8px;
          left: -28px;
          width: 20px;
          height: 11px;
          background-image: url('../../../static/img/novel_vip.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .text {
          white-space: pre-wrap;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
        }
      }
      .author, .desc {
        line-height: 20px;
        font-size: 11px;
        color: rgb(233, 233, 233);
      }
      .tags-container {
        margin-top: 4px;
      }
      .tags-wrap {
        display: flex;
        overflow: auto;
        .tag + .tag {
          margin-left: 7px;
        }
        .tag {
          flex: none;
          font-size: 12px;
          color: rgb(233, 233, 233);
          padding: 2px 6px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 3px;
        }
      }
    }
    .content-container {
      padding-bottom: 66px;
      .catalog-container {
        display: flex;
        height: 44px;
        .text {
          flex: 0 0 60px;
          width: 60px;
          text-align: center;
          line-height: 44px;
          font-size: 16px;
          font-weight: 600;
        }
        .catalog-wrap {
          text-align: right;
          flex: auto;
          color: rgb(155, 155, 155);
          font-size: 14px;
          line-height: 44px;
          margin-right: 12px;
        }
      }
      .content-wrap {
        color: rgb(0, 0, 0);
        font-size: 16px;
        margin: 0 15px;
        border-top: 1px solid #e0e0e0;
        padding-bottom: 36px;
        .info {
          line-height: 48px;
        }
        .desc {
          line-height: 20px;
          color: rgb(111, 111, 111);
          font-size: 14px;

          white-space: pre-wrap;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: visible;
          &::first-letter {
          }
        }
      }
      .author-contain {
        display: flex;
        .avatar {
          position: relative;
          flex: 0 0 60px;
          margin-left: 20px;
          margin-right: 10px;
          .icon {
            border-radius: 50%;
          }
          .logo {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 22px;
            width: 22px;
            background-image: url('../../../static/img/7.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
        .desc-wrap {
          padding-top: 6px;
          .name {
            font-size: 15px;
            color: rgb(255, 95, 113);
            line-height: 28px;
          }
          .desc {
            font-size: 12px;
            color: rgb(153, 153, 153);
          }
        }
      }
    }
    .footer-container {
      position: fixed;
      z-index: 100;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      .footer-wrap {
        display: flex;
        height: 50px;
        justify-content: space-around;
        align-items: center;
        font-size: 17px;
        background-color: #fff;
        .collect {
          flex: auto;
          text-align: center;
          margin-left: 3px;
          .text {
            vertical-align: middle;
            margin-left: 3px;
            .collect-times {
              vertical-align: -1px;
            }
          }
          color: rgb(66, 66, 66);
          .icon {
            display: inline-block;
            height: 18px;
            width: 17px;
            vertical-align: -2px;
            background-image: url('../../../static/img/btn_collect@3x.png');
            &.selected {
              background-image: url('../../../static/img/btn_collect_selected@3x.png');
            }
            background-size: 17px 18px;
          }
        }
        .in-reading {
          flex: auto;
          height: 100%;
          line-height: 50px;
          text-align: center;
          background-color: rgb(255, 95, 113);
          color: #fff;
          font-weight: 600;
        }
      }
    }
  }

</style>

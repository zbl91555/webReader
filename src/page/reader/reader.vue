<template>
  <div class="reader-container">
    <r-loading v-if="isLoading"></r-loading>
    <transition name="topBar">
      <section class="header" v-show="isButtonShow">
        <span class="back-icon" @click="goBack"></span>
        <section class="catelog-icon" @click="isCatelogShow = !isCatelogShow">
          ...
          <section class="popup-container" v-show="isCatelogShow">
            <section class="book-content" v-if="topic.images">
              <img :src="topic.images[0].imgUrl" width="54" height="72" class="icon">
              <h3 class="book-title">{{topic.title}}</h3>
              <p class="book-author">{{topic.user.name}}</p>
            </section>
            <section class="book-btn">
              <span class="catelog" @click="goToCatelog">目录</span>
              <span class="set" @click="openPopup">设置</span>
            </section>
          </section>
        </section>
      </section>
    </transition>
    <div class="reader-content" ref="readerContent">
      <div class="content-wrap" ref="content">
        <h1 class="title">{{content.title}}</h1>
        <div class="content" v-html="formattingContent"></div>
      </div>
      <div class="touchSection" @click="touchSection"></div>
    </div>
    <transition name="bottomBar">
      <div class="btn-container" v-show="isButtonShow">
        <div class="chapter-bar">
          <span class="prev" @click="prevChapter">上一章</span>
          <span class="chapter-index">{{chapterIndex+1}}/{{chapterListIds.length}}</span>
          <span class="next" @click="nextChapter">下一章</span>
        </div>
      </div>
    </transition>
    <mu-toast v-if="toast" message="文章到了尽头" @close="hideToast" class="toast"/>

    <mu-popup position="right" popupClass="popup-right" :open="popup" @close="closePopup">
      <div class="setting-tittle">设置</div>
      <mu-switch :label="autoPageStatus?'关闭自动翻页':'开启自动翻页'" @input="autoPageToggle" class="autoPage-switch"
                 v-model="autoPageStatus" labelLeft/>
      <br/>
      <p class="background-title">选择背景颜色</p>
      <div class="background-wrap">
        <mu-paper class="background-item" circle :zDepth="2"/>
        <mu-paper class="background-item" circle :zDepth="2"/>
        <mu-paper class="background-item" circle :zDepth="2"/>
        <mu-paper class="background-item" circle :zDepth="2"/>
        <mu-paper class="background-item" circle :zDepth="2"/>
        <mu-paper class="background-item" circle :zDepth="2"/>
      </div>
      <div class="background-button-wrap">
        <mu-radio label="" name="background-group" nativeValue="0" v-model="styleIndex" class="radio"/>
        <mu-radio label="" name="background-group" nativeValue="1" v-model="styleIndex" class="radio"/>
        <mu-radio label="" name="background-group" nativeValue="2" v-model="styleIndex" class="radio"/>
        <mu-radio label="" name="background-group" nativeValue="3" v-model="styleIndex" class="radio"/>
        <mu-radio label="" name="background-group" nativeValue="4" v-model="styleIndex" class="radio"/>
        <mu-radio label="" name="background-group" nativeValue="5" v-model="styleIndex" class="radio"/>
      </div>
      <div class="font-title">设置字体大小</div>
      <div class="font-wrap">
        <mu-paper class="font-item" :zDepth="2">
          <slot>小</slot>
        </mu-paper>
        <mu-paper class="font-item" :zDepth="2">
          <slot>中</slot>
        </mu-paper>
        <mu-paper class="font-item" :zDepth="2">
          <slot>大</slot>
        </mu-paper>
      </div>
      <div class="font-button-wrap">
        <mu-radio label="" name="font-group" nativeValue="0" v-model="fontSizeIndex" class="radio"/>
        <mu-radio label="" name="font-group" nativeValue="1" v-model="fontSizeIndex" class="radio"/>
        <mu-radio label="" name="font-group" nativeValue="2" v-model="fontSizeIndex" class="radio"/>
      </div>
    </mu-popup>

  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import {mapActions, mapState, mapGetters} from 'vuex';
  import localStorage from '../../utils/localStorage'
  import * as types from '../../store/mutationsTypes';
  import loading from './../../components/common/loading';

  const styleArr = [
    {backgroundColor: '#f7eee5', color: '#333'},
    {backgroundColor: '#e9dfc7', color: '#333'},
    {backgroundColor: '#a4a4a4', color: '#333'},
    {backgroundColor: '#cdefce', color: '#333'},
    {backgroundColor: '#283548', color: '#7685a2'},
    {backgroundColor: '#0f1410', color: '#4e534f'}
  ];
  const fontArr = ['14px', '16px', '20px'];
  export default {
    data() {
      return {
        content: {},
        formattingContent: '',
        topic: {},
        isButtonShow: false,
        isCatelogShow: false,
        isLoading: true,
        toast: false,
        toastTimer: null,
        readerScroll: null,
        deviceHeight: 0, //设备高度
        contentHeight: 0, //内容高度
        refreshLock: false, //刷新锁
        popup: false,
        autoPageStatus: true, //自动翻页开关
        styleIndex: 2,
        fontSizeIndex: 2
      }
    },
    watch: {
      styleIndex(curVal, oldVal) {
        this.$refs.readerContent.style.backgroundColor = styleArr[curVal].backgroundColor;
        this.$refs.readerContent.style.color = styleArr[curVal].color;
        localStorage.set('styleIndex', curVal);
      },
      fontSizeIndex(curVal, oldVal) {
        this.$refs.readerContent.style.fontSize = fontArr[curVal];
        localStorage.set('fontSizeIndex', curVal);
      }
    },
    components: {
      'rLoading': loading
    },
    methods: {
      getData() {
        return this.$store.dispatch(types.GET_CHAPTER_DATA).then((data) => {
          this.content = data.data.detail;
          this.topic = data.data.topic;
          this.formattingContent = data.data.detail.content.replace(/\n/g, '<br>');
        });
      },
      prevChapter() {
        if (this.chapterIndex <= 0) {
          this.showToast();
        } else {
          this.$store.commit(types.GET_CHAPTER_INDEX, this.chapterIndex - 1);
          this.getData().then(() => {
            this.$nextTick(() => {
              this._initScroll();
              this.isLoading = false;
              this.refreshLock = false;
            });
          });
          this.isButtonShow = false;
        }
      },
      nextChapter() {
        this.$store.commit(types.GET_CHAPTER_INDEX, this.chapterIndex + 1);
        this.getData().then(() => {
          this.$nextTick(() => {
            this._initScroll();
            this.isLoading = false;
            this.refreshLock = false;
          });
        });
        this.isButtonShow = false;
      },
      goBack() {
        this.$router.go(-1);
      },
      goToCatelog() {
        this.$router.replace({path: '/catelog'});
      },
      touchSection() {
        this.isButtonShow = !this.isButtonShow;
        this.isCatelogShow = false;
      },
      showToast () {
        this.toast = true;
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.toast = false;
        }, 1000)
      },
      hideToast () {
        this.toast = false;
        if (this.toastTimer) clearTimeout(this.toastTimer);
      },
      openPopup () {
        this.popup = true;
        this.isButtonShow = false;
      },
      closePopup () {
        this.popup = false;
      },
      autoPageToggle() {
        localStorage.set('autoPage', this.autoPageStatus);
      },
      _initScroll() {
        this.contentHeight = this.$refs.content.clientHeight
        if (!this.readerScroll) {
          this.readerScroll = new BScroll(this.$refs.readerContent, {
            click: true,
            probeType: 3,
            bounceTime: 100,
            swipeTime: 1500
          });
          this.readerScroll.on('scroll', (pos)=> {
            if (!this.refreshLock && this.autoPageStatus) {
              if (pos.y + 40 < -(this.contentHeight - this.deviceHeight)) {
                this.refreshLock = true;
                this.nextChapter();
              }
            }
          });
        } else {
          this.readerScroll.refresh();
        }
        //切换章节时返回顶部
        this.readerScroll.scrollTo(0, 0, 0);
      },
      //初始化阅读器
      _initReader() {
        //是否自动翻页
        this.autoPageStatus = Boolean(localStorage.get('autoPage'));
        //设置背景颜色
        this.styleIndex = Number(localStorage.get('styleIndex'));
        //设置字体大小
        this.fontSizeIndex = Number(localStorage.get('fontSizeIndex'));
      }
    },
    computed: {
      ...mapState(['chapterListIds', 'chapterIndex'])
    },
    created() {
      this.deviceHeight = document.documentElement.clientHeight;
      this.getData().then(() => {
        this.$nextTick(() => {
          this._initScroll();
          this.isLoading = false;
          this._initReader();
        });
      });
    }
  }
</script>


<style lang="less" rel="stylesheet/less">

  .reader-container {
    margin: 0 auto;
    padding: 15px 0;
    max-width: 900px;
    font-size: 16px;
    color: #333;
    overflow: auto;
    z-index: 1;
    .title {
      margin-bottom: 20px;
      border-bottom: 1px solid #736357;
      font-size: 20px;
      line-height: 31px;
      color: #736357;
      letter-spacing: 2px;
      font-weight: 900;
    }
    .reader-content {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: #e9dfc7;
    }
    .content-wrap {
      margin: 0 15px;
      padding-bottom: 30px;
    }
    .header {
      position: fixed;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.9);
      z-index: 2;
      top: 0;
      height: 50px;
      font-size: 14px;
      font-weight: 600;
      color: #d5d5d6;
      .back-icon {
        float: left;
        height: 36px;
        width: 66px;
        margin: 15px 10px 0;
        background-image: url('../../../static/img/nav_back_white.png');
        background-repeat: no-repeat;
        background-size: 20px 20px;
      }
      .catelog-icon {
        position: relative;
        float: right;
        margin: 0 10px;
        font-size: 28px;
        font-weight: 900;
        line-height: 36px;

        .popup-container {
          &:before {
            content: '';
            position: absolute;
            right: 12px;
            top: -8px;
            margin: 0 auto;
            width: 0;
            height: 0;
            border: 8px solid transparent;
            border-top: 0;
            border-bottom-color: #000;
            opacity: 0.85;
          }
          position: absolute;
          top: 66px;
          right: 0;
          height: 138px;
          width: 182px;
          background-color: rgba(0, 0, 0, .85);
          border-radius: 12px;
          .book-content {
            padding: 12px 10px;
            border-bottom: 1px solid #5e5e5e;
            width: 182px;
            height: 95px;
            .icon {
              position: absolute;
            }
            .book-title {
              color: #ddd;
              line-height: 1;
              font-size: 15px;
              margin: 14px 0 0 64px;
            }
            .book-author {
              color: #9d9d9c;
              line-height: 28px;
              font-size: 12px;
              margin: 0 0 0 62px;
            }
          }
          .book-btn {
            display: flex;
            height: 41px;
            color: #ddd;
            line-height: 22px;
            font-size: 14px;
            .catelog, .set {
              flex: auto;
              height: 100%;
              line-height: 41px;
              text-align: center;
            }
          }
        }
      }
    }
    .btn-container {
      position: fixed;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.9);
      z-index: 10;
      bottom: 0;
    }
    .chapter-bar {
      display: flex;
      justify-content: space-between;
      height: 48px;
      font-size: 13px;
      color: #fff;
      border-bottom: 1px solid #333;
      .prev, .chapter-index, .next {
        flex: auto;
        text-align: center;
        height: 100%;
        line-height: 48px;
      }
    }
    .touchSection {
      position: fixed;
      top: 50%;
      left: 0;
      width: 100%;
      height: 300px;
      transform: translateY(-50%);
      z-index: 10;
    }
  }

  .popup-right {
    display: flex;
    width: 70%;
    height: 100%;
    max-width: 375px;
    align-items: flex-start;
    justify-content: center;
    padding: 24px;
    background-color: #f4f4f4 !important;
  }

  .autoPage-switch {
    margin-top: 80px;
  }

  .setting-tittle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
    font-weight: 900;
    color: #736357;
    background-image: linear-gradient(rgba(126, 87, 194, .5), #7e57c2);
  }

  .background-title {
    position: absolute;
    top: 170px;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .background-wrap {
    position: absolute;
    display: flex;
    top: 210px;
    left: 0;
    width: 100%;
    justify-content: space-around;
    .background-item {
      width: 30px;
      height: 30px;
      /*border: 1px solid #7e57c2;*/
      display: inline-block;
      &:nth-child(1) {
        background-color: #f7eee5;
      }
      &:nth-child(2) {
        background-color: #e9dfc7;
      }
      &:nth-child(3) {
        background-color: #a4a4a4;
      }
      &:nth-child(4) {
        background-color: #cdefce;
      }
      &:nth-child(5) {
        background-color: #283548;
      }
      &:nth-child(6) {
        background-color: #0f1410;
      }
    }
  }

  .background-button-wrap {
    position: absolute;
    display: flex;
    top: 250px;
    left: 0;
    width: 100%;
    justify-content: space-around;
  }

  .font-title {
    position: absolute;
    top: 320px;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .font-wrap {
    position: absolute;
    display: flex;
    justify-content: space-around;
    top: 360px;
    left: 0;
    width: 100%;
    .font-item {
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      &:nth-child(1) {
        font-size: 14px;
      }
      &:nth-child(2) {
        font-size: 18px;
      }
      &:nth-child(3) {
        font-size: 20px;
      }
    }
  }

  .font-button-wrap {
    position: absolute;
    display: flex;
    top: 414px;
    left: 0;
    width: 100%;
    justify-content: space-around;
  }

  .topBar-enter-active, .topBar-leave-active, .bottomBar-enter-active, .bottomBar-leave-active {
    transition: all 0.4s;
  }

  .topBar-enter, .topBar-leave-active {
    transform: translateY(-44px);
    opacity: 0;
  }

  .bottomBar-enter, .bottomBar-leave-active {
    transform: translateY(50px);
    opacity: 0;
  }
</style>

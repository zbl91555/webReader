<template>
  <div class="catelog-container">
    <div class="header">
      <div class="back-icon" @click="goBack"></div>
      <div class="totalChapters">共{{chapterListLength}}章</div>
      <div class="sort-wrap" :class="{'reverse':!isReverseList}" @click="reverseChapterList">
        <span class="icon"></span>
        <span class="text" v-if="!isReverseList">正序</span>
        <span class="text" v-if="isReverseList">倒序</span>
      </div>
    </div>
    <div class="catelog-container">
      <ul ref="list">
        <li class="chapter" v-for="(item,index) in chapterList" @click="goToReader(index)">
          <span class="title"><span class="text">{{item.title}}</span> <i v-if="item.vip === '1'" class="lock-icon"></i></span>
          <span class="desc">{{item.add_time}}&nbsp;&nbsp; {{item.length}}字</span>
          <span class="border-1px"></span>
        </li>
      </ul>
    </div>
    <r-back></r-back>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as types from '../../store/mutationsTypes';
  import {mapState} from 'vuex';
  import goBack from '../../components/common/goBack.vue'

  export default {
    data(){
      return {
        isReverseList: false //是否倒序排列章节列表
      }
    },
    components: {
      'r-back': goBack
    },
    computed: {
      ...mapState(['chapterList']),//初始状态列表
      chapterListLength() {
        return this.chapterList.length;
      }
    },
    methods: {
      goBack() {
        this.$router.goBack();
      },
      reverseChapterList() {
        this.isReverseList = !this.isReverseList;
        this.chapterList.reverse();
      },
      goToReader(index) { //进入阅读器
        if (this.isReverseList) { //处理章节列表翻转后问题
          index = this.chapterListLength - 1;
        }
        this.$store.commit(types.GET_CHAPTER_INDEX, index);
        this.$router.replace({path: '/reader'}); //replace不会向history添加新记录
      }
    },
    created() {
//      this.$store.dispatch(types.GET_CATELOG_DATA).then((data) => {
//        this.chapterList = data.data.list;
//      });
      this.$nextTick(() => {
        document.body.scrollTop = 0;
      });
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .catelog-container {
    .header {
      position: fixed;
      z-index: 1;
      display: flex;
      align-items: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 44px;
      background-color: #fff;
      .back-icon {
        flex: 0 0 22px;
        height: 22px;
        width: 22px;
        margin-left: 10px;
        background-image: url('../../../static/img/arrow_nav_back_black@2x.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .totalChapters {
        flex: 1;
        text-align: center;
        font-size: 17px;
        color: rgb(86, 63, 63);
      }
      .sort-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 0 70px;
        width: 70px;
        height: 24px;
        margin-right: 14px;
        border: 1px solid rgb(177, 177, 177);
        border-radius: 12px;
        &.reverse .icon {
          background-image: url('../../../static/img/btn_chapter_inverted@3x.png');
        }
        .icon {
          width: 15px;
          height: 12px;
          margin-right: 4px;
          background-image: url('../../../static/img/btn_chapter_positive@3x.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .catelog-container {
      padding-top: 46px;
      background-color: rgb(244, 244, 244);
      .chapter {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 65px;
        margin-left: 16px;
        &:last-child {
          .border-1px {
            display: none;
          }
        }
        .title {
          .text {
            /*max-width: 80%;*/
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 15px;
          }
          line-height: 30px;
          color: rgb(50, 50, 50);
          .lock-icon {
            float: right;
            margin-top: 8px;
            margin-right: 20px;
            width: 13px;
            height: 16px;
            background-image: url('../../../static/img/img_chapter_locked@3x.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
        .desc {
          font-size: 11px;
          line-height: 18px;
          color: rgb(182, 182, 182);
          margin-bottom: 6px;
        }

        .border-1px {
          flex: 0 0 1px;
          height: 0;
          border-bottom: 1px solid rgb(177, 177, 177);
          transform: scaleY(0.5);
        }
      }
    }
  }
</style>

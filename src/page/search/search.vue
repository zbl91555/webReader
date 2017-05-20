<template>
  <div class="search-container">
    <top-bar>搜索</top-bar>
    <div class="search-input-wrap">
      <input type="search" ref="search" class="search-input" placeholder="请输入搜索关键字" @keyup.enter="search">
      <span class="text" @click="search">搜索</span>
    </div>
    <div class="search-wrap">
      <!--color="#696969" rippleOpacity="'0.3'"-->
      <div v-for="book in updateData" class="book-list clearfix" @click="goDetail(book.id)">
        <a :href="book.shareUrl" class="link" @click.prevent="">
          <div class="avatar">
            <img v-lazy="book.images[0].imgUrl" width="104" height="80" class="icon">
            <span class="vip" v-if="book.is_vip == 1"></span>
          </div>
          <div class="desc">
            <h2 class="name">{{book.title}}</h2>
            <p class="des">{{book.des}}</p>
            <div class="info"><span class="author"><img v-lazy="book.user.icon" class="icon" width="13" height="13">{{book.user.name}}</span>
              <span class="tag" v-if="book.tags[0]">{{book.tags[0].name}}</span>
              <span class="tag" v-if="book.tags[1]">{{book.tags[1].name}}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="error" v-show="isErrorData">没有相关作品</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as types from '../../store/mutationsTypes';
  import topBar from '../../components/common/topBar'
  import api from '../../api'
  export default {
    data() {
      return {
        updateData: [],
        isErrorData: false
      }
    },
    components: {
      topBar
    },
    methods: {
      search() {
        let keyword = this.$refs.search.value;
        api.searchApi(keyword).then((data) => {
          if (data.data.data.length === 0) {
            this.isErrorData = true;
            this.updateData = [];
          } else {
            this.isErrorData = false;
            this.updateData = data.data.data;
            console.log(data.data.data)
          }
        });
      },
      goDetail(bookId) {
        this.$router.push({path: '/detail', params: {bookId}});
        this.$store.commit(types.SET_BOOK_ID, bookId);
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .search-container {
    padding-top: 44px;
    .search-input-wrap {
      padding: 8px 0;
      border-top: 1px solid rgb(244, 244, 244);
      border-bottom: 1px solid rgb(244, 244, 244);
      display: flex;
      justify-content: space-around;
      font-size: 18px;
      color: rgb(86, 63, 63);
      .search-input {
        flex: 0 0 295px;
        height: 35px;
        background-color: rgb(244, 244, 244);
        border-radius: 8px;
        border: 0;
        outline: none;
        font-size: 16px;
        text-indent: 1em;
        margin-left: 10px;
      }
      .text {
        flex: 1 1 auto;
        text-align: center;
        align-self: center;
      }
    }
    .search-wrap {
      background-color: #fff;
      padding: 0 14px;
      .guess {
        height: 26px;
        line-height: 38px;
        font-size: 13px;
        color: rgb(105, 105, 105);
      }
      .book-list + .book-list {
        border-top: 1px solid #e6e6e6;
      }
      .book-list {
        height: 92px;
        min-height: 80px;
        margin: 8px 0;
        padding-top: 8px;
        &:last-of-type {
          padding-bottom: 0px;
          margin-bottom: 10px;
        }
        .link {
          display: flex;
          text-decoration: none;
        }
        .avatar {
          position: relative;
          flex: none;
          width: 104px;
          margin-right: 12px;
          .icon {
            border-radius: 5px;
          }
          .vip {
            position: absolute;
            top: 0;
            left: 0;
            height: 24px;
            width: 24px;
            background-image: url('../../../static/img/img_vip_ribbon@3x.png');
            background-size: 100% 100%;
          }
        }
        .desc {
          flex: 1;
          .name {
            line-height: 14px;
            font-size: 14px;
            color: #101010;
            margin-bottom: 6px;
          }
          .des {
            overflow: hidden;
            /*height: 46px;*/
            font-size: 12px;
            line-height: 16px;
            color: #929292;
            white-space: pre-wrap;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            margin-bottom: 6px;
          }
          .author {
            color: #666;
            vertical-align: top;
            .icon {
              vertical-align: top;
              margin-right: 3px;
              display: inline-block;
              border-radius: 50%;
            }
          }
          .tag {
            color: #999;
            margin-right: 4px;
            float: right;
            border: 1px solid #b3b3b3;
            line-height: 10px;
            font-size: 10px;
            padding: 2px;
          }
        }
      }
    }
    .error {
      position: fixed;
      top: 97px;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-top: 10px;
      background-color: #f0f0f0;
      font-size: 15px;
      color: rgb(89, 89, 89);
      text-align: center;
    }
  }
</style>

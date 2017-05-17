<template>
  <div class="content-wrap">
    <r-loading v-if="isLoading"></r-loading>
    <div class="content" v-for="item in totalData">
      <h2 class="title">{{item.title}}</h2>
      <ul>
        <li v-for="book in item.list" class="book-list" @click="goDetail(book.id)">
          <a class="link">  <!--:href="book.shareUrl" @click.prevent=""-->
            <div class="avatar">
              <img v-lazy="book.images[0].imgUrl" width="104" height="80" class="icon">
              <span class="vip" v-if="item.title==='VIP文推荐' || item.title==='VIP文畅销榜'"></span>
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
        </li>
      </ul>
    </div>
    <r-update></r-update>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as types from '../../../store/mutationsTypes';
  import update from './../../../components/common/update';
  import loading from './../../../components/common/loading';
  import api from '../../../api';


  export default {
    data() {
      return {
        totalData: [],
        isLoading: true
      }
    },
    methods: {
      goDetail(bookId) {
        //跳转路由
        this.$router.push({path: '/detail', params: {bookId}});
        this.$store.commit(types.SET_BOOK_ID, bookId);
      }
    },
    components: {
      'rUpdate': update,
      'rLoading': loading
    },
    computed: {
      categoryDate() {
        let temp = this.totalData.forEach((item) => {
          if (item.list) {
            return item;
          }
        });
        return temp;
      }
    },
    created() {
      api.contentApi().then((res)=> {
        //将数据中的%变为\
        let relData = JSON.parse(JSON.stringify(res.data.data).replace(/%/g, '\\'));
        this.totalData = relData.list;
        setTimeout(() => {
          this.isLoading = false;
        }, 0);
      });
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  @import "../../../../static/less/index";

  .content-wrap {
    padding-bottom: 56px;
    .content {
      background: #fff;
      padding: 0 10px;
      .title {
        height: 44px;
        line-height: 44px;
        font-size: 12px;
        color: #696969;
      }
      .book-list {
        height: 80px;
        min-height: 60px;
        margin-bottom: 22px;

        &:last-child {
          padding-bottom: 6px;
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
            background-image: url('../../../../static/img/img_vip_ribbon@3x.png');
            background-size: 100% 100%;
          }
        }
        .desc {
          flex: 1;
          .name {
            line-height: 14px;
            font-size: 14px;
            color: rgb(16, 16, 16);
            margin-bottom: 6px;
            white-space: pre-wrap;
            word-wrap: break-word;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
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
            color: rgb(146, 146, 146);
            font-size: 12px;
            .icon {
              vertical-align: -2px;
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
            margin-top: 2px;
            padding: 2px;
          }
        }
      }
    }
  }
</style>

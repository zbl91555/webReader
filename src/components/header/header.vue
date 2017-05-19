<template>
  <header class="header">
    <div class="about-more">
      <div class="icon"><img src="../../../static/img/Icon.png" alt="webApp" width="50" height="50"></div>
      <div class="text">
        <h1 class="title">WebApp书城</h1>
        <p class="desc">一个有内涵的毕设☺</p>
      </div>
      <!--<div class="download">-->
      <!--<a class="mine" href="#">项目简介</a>-->
      <!--</div>-->
      <!--rippleColor="'#fff'" rippleOpacity="0.6"-->
      <!--rippleOpacity="0.6"-->
      <mu-raised-button label="项目简介" color="#fff" class="download" :rippleOpacity="0.4" @click="goAbout"/>
    </div>
    <keep-alive>
      <r-banner></r-banner>
    </keep-alive>
    <div class="category-container">
      <ul class="category-wrap">
        <li class="item" @click="goCategories('category')"><a class="link"><span class="text"><span
          class="icon"></span>分类</span></a>
        </li>
        <li class="item" @click="goCategories('vip')"><a href="javascript:void(0)" class="link"><span class="text"><span
          class="icon"></span>Vip文</span></a></li>
        <li class="item" @click="goCategories('rank')"><a href="javascript:void(0)" class="link"><span class="text"><span
          class="icon"></span>排行</span></a></li>
      </ul>
      <ul class="category-wrap">
        <li class="item" @click="goCategories('finished')"><a href="javascript:void(0)" class="link"><span class="text"><span
          class="icon"></span>完结</span></a></li>
        <li class="item" @click="goCategories('booklist')"><a href="javascript:void(0)" class="link"><span class="text"><span
          class="icon"></span>书单</span></a></li>
        <li class="item" @click="goCategories('last')"><a href="javascript:void(0)" class="link"><span class="text"><span
          class="icon"></span>最新</span></a></li>
      </ul>
    </div>
    <div class="search-icon" @click="goSearch"></div>
  </header>
</template>

<script type="text/ecmascript-6">
  import banner from './banner/banner';
  export default {
    components: {
      'r-banner': banner
    },
    methods: {
      goSearch() {
        this.$router.push({name: 'search'});
      },
      goAbout() {
        window.open('https://github.com/zbl91555/webReader/blob/master/README.md');
      },
      goCategories(page) {
        this.$router.push({path: '/categories', query: {page}})
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .header {
    height: 388px;
    margin-bottom: 6px;
    .search-icon {
      position: absolute;
      right: 10px;
      top: 80px;
      z-index: 100;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, .5);
      background-image: url("../../../static/img/home_search_top@2x.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .about-more {
      display: flex;
      height: 70px;
      justify-content: space-around;
      align-items: center;
      color: #fff;
      background: #929292;
      .icon {
        flex: 0 0 50px;
        margin-left: 20px;
      }
      .text {
        flex: 1;
        margin-left: 10px;
        .title {
          font-size: 18px;
          line-height: 24px;
          margin: 0;
        }
        .desc {
          font-size: 13px;
          line-height: 17px;
        }
      }
      .download {
        flex: 0 0 98px;
        width: 98px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 10px;
        margin-right: 15px;
        background: rgb(255, 95, 113);
        .mine {
          font-size: 17px;
          color: inherit;
          text-decoration: none;
        }
      }
    }
    .category-container {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      background-color: #fff;
      background-image: url("../../../static/img/img_bookcase_table.png");
      background-size: 100% 100%;
      .category-wrap {
        display: flex;
        height: 64px;
        justify-content: space-around;
        align-items: center;
        //图标
        &:nth-child(1) .item:nth-child(1) .icon {
          background-image: url("../../../static/img/img_home_goods@3x.png");
        }
        &:nth-child(1) .item:nth-child(2) .icon {
          background-image: url("../../../static/img/img_home_end@3x.png");
        }
        &:nth-child(1) .item:nth-child(3) .icon {
          background-image: url("../../../static/img/img_home_rank@3x1.png");
        }
        &:nth-child(2) .item:nth-child(1) .icon {
          background-image: url("../../../static/img/Icon-2.png");
        }
        &:nth-child(2) .item:nth-child(2) .icon {
          background-image: url("../../../static/img/img_home_booklist@3x.png");
        }
        &:nth-child(2) .item:nth-child(3) .icon {
          background-image: url("../../../static/img/last.jpg");
        }
        .item {
          flex: auto;
          text-align: center;
        }
        .link {
          color: rgb(51, 51, 51);
          text-decoration: none;
        }
        .text {
          vertical-align: middle;
          .icon {
            &:nth-child(1) {
            }
            display: inline-block;
            width: 32.5px;
            height: 32.5px;
            vertical-align: middle;
            margin-right: 6px;
            border-radius: 50%;
            background-size: 32.5px 32.5px;
          }
        }
      }
    }
  }
</style>

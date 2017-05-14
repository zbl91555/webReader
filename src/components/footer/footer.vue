<template>
  <nav class="main-nav">
    <ul class="item-wrap">
      <li class="item home">
        <router-link to="/home/content" class="nav-link"><span class="icon"></span><strong class="text">首页</strong>
        </router-link>
      </li>
      <li class="item book">
        <router-link to="/bookrack" class="nav-link" replace><span class="icon"></span><strong class="text">书架</strong>
        </router-link>
      </li>
      <li class="item user">
        <router-link to="/mine" class="nav-link"><span class="icon"></span><strong class="text">我的</strong>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>


<style lang="less" rel="stylesheet/less">
  .main-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0px -0.5px 0.5px 0.5px #cecece;
    .item-wrap {
      display: flex;
      padding-top: 2px;
      align-items: center;
      background: #fff;
      .item {
        flex: auto;
        text-align: center;
        height: 44px;
        line-height: 44px;
        .nav-link {
          position: relative;
          display: block;
          color: #333;
          font-size: 10px;
          text-decoration: none;
          .icon {
            display: block;
            margin: 0 auto;
            width: 28px;
            height: 28px;
            background-repeat: no-repeat;
          }
          .text {
            position: absolute;
            top: 14px;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
          }
          &.router-link-active {
            color: #fe6e6e;
          }
        }
        &.home {
          .nav-link.router-link-active {
            .icon {
              background-image: url('../../../static/img/a_home.png');
              background-size: 28px 28px;
            }
          }
          .icon {
            background-image: url('../../../static/img/home.png');
            background-size: 28px 28px;
          }
        }
        &.book {
          .nav-link.router-link-active {
            .icon {
              background-image: url('../../../static/img/a_book.png');
              background-size: 28px 28px;
            }
          }
          .icon {
            background-image: url('../../../static/img/book.png');
            background-size: 28px 28px;
          }
        }
        &.user {
          .nav-link.router-link-active {
            .icon {
              background-image: url('../../../static/img/a_user.png');
              background-size: 28px 28px;
            }
          }
          .icon {
            background-image: url('../../../static/img/user.png');
            background-size: 28px 28px;
          }
        }
      }
    }
  }
</style>

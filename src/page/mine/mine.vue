<template>
  <section class="mine-container">
    <!--<top-bar :hasBackBtn="false" v-if="guideInfo.isShowGuide">个人中心</top-bar>-->
    <router-view></router-view>
    <!--<div class="guide" v-if="guideInfo.isShowGuide">-->
    <!--<div class="goLogin">手机号登录</div>-->
    <!--<div class="goRegister">手机号注册</div>-->
    <!--</div>-->
    <keep-alive>
      <!--v-show="!isKeyboardPopup"-->
      <r-footer></r-footer>
    </keep-alive>
  </section>
</template>

<script type="text/ecmascript-6">
  import footer from '../../components/footer/footer';
  import topBar from '../../components/common/topBar';
  import {mapState} from 'vuex';

  export default {
    computed: {
      ...mapState(['isLogin', 'guideInfo'])
    },
    components: {
      'r-footer': footer
    },
    mounted() {
      this.isLogin ? this.$router.replace({name: 'personal'}) : (this.guideInfo.GuideHref === 'login' ? this.$router.push({path: '/mine/login'}) : this.$router.push({path: '/mine/register'}));
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .mine-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgb(244, 244, 244);

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
  }
</style>

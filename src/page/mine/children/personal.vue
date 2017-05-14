<template>
  <div class="personal-container">
    <top-bar :hasBackBtn="false">个人中心</top-bar>
    <div class="personal-wrap" v-if="">
      <div class="avatar">
        <img :src="userInfo.head_image" class="icon" width="80" height="80">
      </div>
      <h3 class="name">{{userInfo.nickname}}</h3>
      <div class="changeUser"><span class="btn" @click="changeUser">切换账号</span></div>
    </div>
    <div class="background-image"><img src="../../../../static/img/personal.gif" width="100%"
                                       height="100%"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import topBar from '../../../components/common/topBar';
  import {mapState} from  'vuex';

  export default {
    data() {
      return {
        isKeyboardPopup: false //键盘是否弹出
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    components: {
      topBar
    },
    methods: {
      changeUser() {
        this.$router.push({path: '/mine/login'});
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>

  .personal-wrap {
    margin-top: 177px;
    .avatar {
      width: 80px;
      margin: 0 auto;
      .icon {
        border-radius: 50%;
      }
    }
    .name {
      margin-top: 14px;
      text-align: center;
      font-size: 18px;
      color: rgb(86, 63, 63);
    }
    .changeUser {
      text-align: center;
      margin-top: 26px;
      .btn {
        display: inline-block;
        padding: 10px 40px;
        border-radius: 20px;
        border: 1px solid rgb(86, 63, 63);
        color: rgb(86, 63, 63);
        line-height: 15px;
        font-size: 15px;
      }
    }
  }

  .background-image {
    position: absolute;
    bottom: 50px;
    left: 50%;
    margin-left: -100px;
    width: 200px;
    height: 150px;
  }

</style>

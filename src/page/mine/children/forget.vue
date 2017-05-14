<template>
  <div class="forget-container">
    <top-bar>忘记密码</top-bar>
    <div class="forget-wrap">
      <div class="phoneNumber-wrap">
        <input type="text" ref="phoneNumber" class="phoneNumber" placeholder="请输入手机号" @focus="popup"
               @blur="popdown">
      </div>
      <mu-raised-button label="确   定" class="reset-btn"
                        @click="reset" :rippleOpacity="0.2"/>
    </div>
    <div class="background-image" v-show="!isKeyboardPopup"><img src="../../../../static/img/person_bg.png" width="100%"
                                                                 height="100%"></div>
    <mu-toast v-show="toast" :message="message" @close="hideToast" class="toast"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex';
  import api from '../../../api'
  import * as types from '../../../store/mutationsTypes';
  import topBar from '../../../components/common/topBar';


  export default {
    data() {
      return {
        message: '一段简单的文本',
        toast: false,
        toastTimer: null
      }
    },
    components: {
      topBar
    },
    computed: {
      ...mapState(['isKeyboardPopup'])
    },
    methods: {
      showToast () {
        this.toast = true;
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
          this.toast = false;
        }, 2000)
      },
      hideToast () {
        this.toast = false;
        if (this.toastTimer) clearTimeout(this.toastTimer);
      },
      goRegister() {
        this.$router.push({path: 'register'});
      },
      reset() {
        let phoneNumber = this.$refs.phoneNumber.value;
        api.forgetApi(phoneNumber).then((data) => {
          if (data.data.status === 0) {
            this.message = data.data.user_msg + '5秒后跳转';
            setTimeout(() => {
              this.$router.push({path: 'login'});
            }, 5000);
          } else {
            this.message = data.data.user_msg;
          }
          this.showToast();
        });
      },
      popup() {
        this.$store.commit(types.KEYBOARD_POPUP, true);
      },
      popdown() {
        this.$store.commit(types.KEYBOARD_POPUP, false);
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .forget-wrap {
    padding-top: 44px;
    margin-top: 20px;
    .phoneNumber-wrap {
      height: 44px;
      width: 100%;
      background-color: rgb(255, 255, 255);
      padding: 0 20px;
    }
    .phoneNumber {
      height: 100%;
      width: 100%;
      border: 0;
      color: #333;
      font-size: 16px;
      text-indent: 6px;
    }

    .reset-btn {
      width: 94%;
      background-color: rgb(254, 110, 110);
      margin-left: 3%;
      margin-top: 20px;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
    }
  }

  .background-image {
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    height: 200px;
  }

  .toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 80%;
    font-size: 13px;
    text-align: center;
    background-color: rgba(0, 0, 0, .6);
  }
</style>

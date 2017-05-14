<template>
  <div class="login-container">
    <top-bar>登录</top-bar>
    <div class="login-wrap">
      <div class="phoneNumber-wrap">
        <input type="text" class="phoneNumber" ref="phoneNumber" placeholder="请输入手机号" @focus="popup">
      </div>
      <div class="border-1px"></div>
      <div class="password-wrap">
        <input type="password" class="password" ref="password" placeholder="请输入密码" @focus="popup">
      </div>
      <mu-raised-button label="登   录" class="login-btn"
                        @click="login" :rippleOpacity="0.2"/>
      <div class="link"><span class="register" @click="goRegister">注册</span><span class="forgot"
                                                                                  @click="goForget">忘记密码</span></div>
    </div>
    <div class="background-image" v-show="!isKeyboardPopup"><img src="../../../../static/img/person_bg.png" width="100%"
                                                                 height="100%"></div>
    <mu-toast v-show="toast" :message="message" @close="hideToast" class="toast"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import topBar from '../../../components/common/topBar';
  import * as types from '../../../store/mutationsTypes';
  import md5 from 'md5';
  import {mapState, mapActions} from 'vuex';

  const ERRNO = 0; //错误状态码

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
      ...mapActions([types.USER_MINE]),
      login() {
        let phoneNumber = this.$refs.phoneNumber.value;
        let password = md5(this.$refs.password.value);
        this.$store.dispatch(types.USER_LOGIN, {phoneNumber, password}).then((data) => {
          if (data.status === ERRNO) {
            this.$router.push({name: 'personal'});
            this[types.USER_MINE]();
          } else {
            this.message = data.user_msg;
            this.showToast();
          }
        });
      },
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
      goForget() {
        this.$router.push({path: 'forget'});
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
  .login-wrap {
    padding-top: 44px;
    margin-top: 20px;
    .border-1px {
      border-bottom: 1px solid #eee;
      transform: scaleY(0.5);
    }
    .phoneNumber-wrap, .password-wrap {
      height: 44px;
      width: 100%;
      background-color: rgb(255, 255, 255);
      padding: 0 20px;
    }
    /*.phoneNumber-wrap {*/
    /*margin-bottom: 10px;*/
    /*}*/

    .phoneNumber, .password {
      height: 100%;
      width: 100%;
      border: 0;
      color: #333;
      font-size: 16px;
      text-indent: 6px;
    }

    .login-btn {
      width: 94%;
      background-color: rgb(254, 110, 110);
      margin-left: 3%;
      margin-top: 20px;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
    }
    .link {
      margin-top: 10px;
      width: 94%;
      margin-left: 3%;
      font-size: 16px;
      .register, .forgot {
        text-decoration: underline;
      }
      .register {
        float: left;
      }
      .forgot {
        float: right;
        color: rgb(254, 110, 110);
      }
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

<template>
  <div class="register-container">
    <top-bar>注册</top-bar>
    <div class="register-wrap">
      <div class="phoneNumber-wrap">
        <input type="text" class="phoneNumber" ref="phoneNumber" placeholder="请输入手机号" @focus="popup"
               pattern="\^1[3|4|5|8][0-9]/d{4,8}$\"
               required="required">
      </div>
      <div class="border-1px"></div>
      <div class="password-wrap">
        <input type="password" class="password" ref="password" placeholder="密码至少六个字符，可以使用数字字母" @focus="popup"
               required="required">
      </div>
      <div class=" border-1px">
      </div>
      <div class="confirm-password-wrap">
        <input type="password" class="confirm-password" placeholder="确认密码" @focus="popup" required="required">
      </div>
      <div class="border-1px"></div>
      <div class="captcha-wrap">
        <input type="text" class="captcha" placeholder="请输入验证码" @focus="popup">
        <mu-raised-button label="获取验证码" class="captcha-btn" @click="getCaptcha" :rippleOpacity="0.2" @focus="popup"
                          @blur="popdown"/>
      </div>
      <mu-raised-button label="注   册" class="reg-btn" @click="register" :rippleOpacity="0.2"/>
      <div class="background-image" v-show="!isKeyboardPopup"><img src="../../../../static/img/person_bg.png"
                                                                   width="100%" height="100%"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import topBar from '../../../components/common/topBar';
  import * as types from '../../../store/mutationsTypes';
  import md5 from 'md5';
  import {mapState} from 'vuex';


  export default {
    components: {
      topBar
    },
    computed: {
      ...mapState(['isKeyboardPopup'])
    },
    methods: {
      register() {
        let phoneNumber = this.$refs.phoneNumber.value;
        let password = md5(this.$refs.password.value);
      },
      getCaptcha() {

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
  .register-wrap {
    padding-top: 44px;
    margin-top: 20px;
    .border-1px {
      border-bottom: 1px solid #eee;
      transform: scaleY(0.5);
    }
    .phoneNumber-wrap, .password-wrap, .confirm-password-wrap, .captcha-wrap {
      position: relative;
      height: 44px;
      width: 100%;
      background-color: rgb(255, 255, 255);
      padding: 0 20px;
    }
    /*.phoneNumber-wrap {*/
    /*margin-bottom: 10px;*/
    /*}*/

    .phoneNumber, .password, .confirm-password, .captcha {
      height: 100%;
      width: 100%;
      border: 0;
      color: #333;
      font-size: 16px;
      text-indent: 6px;
    }

    .reg-btn {
      width: 94%;
      background-color: rgb(254, 110, 110);
      margin-left: 3%;
      margin-top: 20px;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
    }

    .captcha-btn {
      position: absolute;
      right: 20px;
      top: 5px;
      width: 66px;
      height: 30px;
      border-radius: 8px;
      background-color: rgb(227, 87, 101);
      color: rgb(255, 255, 255);
      font-size: 11px;
      line-height: 30px;
      text-align: center;
    }
  }

  .background-image {
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    height: 200px;
  }

</style>

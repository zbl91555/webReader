<template>
  <div class="topBar-container">
    <div class="icon" @click="goLastStep" v-if="hasBackBtn"></div>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import goBack from './goBack'
  export default {
    components: {
      goBack
    },
    methods: {
      goLastStep() {
        this.$router.go(-1);
      }
    },
    props: {
      hasBackBtn: {
        type: Boolean,
        default: true
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .topBar-container {
    position: fixed;
    height: 44px;
    right: 0px;
    left: 0px;
    top: 0px;
    z-index: 1111;
    background-color: rgb(255, 255, 255);
    .icon {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 50px;
      height: 34px;
      background-image: url('../../../static/img/arrow_nav_back_black@2x.png');
      background-repeat: no-repeat;
      background-size: 22px 22px;
    }
    .text {
      text-align: center;
      line-height: 44px;
      font-size: 17px;
      color: rgb(86, 63, 63);
    }
  }
</style>

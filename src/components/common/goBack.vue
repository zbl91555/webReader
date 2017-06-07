<template>
  <section class="container" @click="goBack">
    <section class="icon"></section>
  </section>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      goBack() {
        this.$router.goBack();
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 15px;
    bottom: 50px;
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0,.4);
    border-radius: 50%;
    .icon {
      height: 22px;
      width: 22px;
      background-image: url('../../../static/img/nav_back_white.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
</style>

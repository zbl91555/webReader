<template>
  <div id="app">
    <!--<transition :name="transitionName">-->
    <router-view class="view"></router-view>
    <!--</transition>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    beforeRouteUpdate (to, from, next) {
      console.log(this.$router.isBack)
      let isBack = this.$router.isBack;
      if (isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.isBack = false;
      next()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .view {
    transition: all .2s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>

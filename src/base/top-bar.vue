<template>
  <div class="top-bar-container">
    <slot></slot>
    <span class="back-click-area"></span>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'topBar',

  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

  .top-bar-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 88px;
    background-color: #000;
    .back-click-area {

    }
  }
</style>

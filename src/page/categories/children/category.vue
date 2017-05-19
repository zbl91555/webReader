<template>
  <div class="category-container">
    <div class="category" v-for="">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '../../../api';
  export default {
    created() {
      api.categoryApi().then(data => {
        console.log(data);
      })
    }
  }
</script>


<style lang="less" rel="stylesheet/less">

</style>

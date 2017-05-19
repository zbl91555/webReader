<template>
  <div class="categories-container">
    <top-bar>{{pageName}}</top-bar>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import topBar from '../../components/common/topBar'
  export default {
    data() {
      return {
        pageName: ''
      }
    },
    components: {
      topBar
    },
    created() {
      let page = this.$route.query.page;
      let pageName = '';
      switch (page) {
        case 'category':
          pageName = '分类';
          break;
        case 'vip':
          pageName = 'Vip文';
          break;
        case 'rank':
          pageName = '排行';
          break;
        case 'finished':
          pageName = '完结';
          break;
        case 'booklist':
          pageName = '书单';
          break;
        case 'last':
          pageName = '最新';
          break;
      }
      this.pageName = pageName;
      this.$router.replace({name: page});
    }
  }
</script>


<style lang="less" rel="stylesheet/less">

</style>

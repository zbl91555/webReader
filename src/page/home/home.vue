<template>
  <section class="home-container">
    <!--<r-loading v-if="isLoading" @loadinghidden="show"></r-loading>-->
    <r-header></r-header>
    <router-view></router-view>
    <keep-alive>
      <r-footer></r-footer>
    </keep-alive>
  </section>
</template>

<script type="text/ecmascript-6">

  import header from '../../components/header/header';
  import footer from '../../components/footer/footer';
  import loading from '../../components/common/loading';
  import * as types from '../../store/mutationsTypes';
  import {mapActions, mapState} from 'vuex';

  export default {
    data() {
      return {
        mainData: {}, //用于展示首页的主数据
        isLoading: true
      }
    },
    computed: {
      ...mapState(['isLogin'])
    },
    components: {
      'r-header': header,
      'r-footer': footer,
      'r-loading': loading,
    },
    methods: {
      ...mapActions([types.USER_MINE]),
      show(){
        this.isLoading = !this.isLoading
      }
    },
    created() {
      let isError = false; //是否错误状态
      if (!this.isLogin && !isError) { //第一次未登录时
        this[types.USER_MINE]().then(() => {
          isError = false;
        }).catch(() => {
          isError = true;
        });
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  .home-container {
    background-color: rgb(244, 244, 244);
  }

  .content-wrap {
    margin: 0 7px;
  }


</style>

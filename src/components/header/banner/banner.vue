<template>
  <section class="banner-container swiper-container">
    <section class="banner-list swiper-wrapper">
      <section v-for="item in bannerList" class="swiper-slide">
        <a @click="goDetail(item.id)">
          <img :src="item.images[0].imgUrl" height="100%" width="100%">
        </a>
      </section>
    </section>
    <section class="swiper-pagination"></section>
  </section>

</template>

<script type="text/ecmascript-6">
  require('../../../../static/js/swiper-3.4.2.min');
  import api from '../../../api';
  import * as types from '../../../store/mutationsTypes';
  const ERR_OK = 0;
  export default {
    data(){
      return {
        bannerList: []
      }
    },
    methods: {
      goDetail(bookId) {
        if (bookId) {
          this.$router.push({path: '/detail', params: {bookId}});
          this.$store.commit(types.SET_BOOK_ID, bookId);
        }
      }
    },
    created() {
      api.bannerApi().then((res)=> {
        if (res.data.status === ERR_OK) {
          this.bannerList = res.data.data;
        }
      }).then(() => {
        new Swiper('.swiper-container', {
          direction: 'horizontal',
          loop: true,
          speed: 300,
          autoplay: 3500,
//        effect: 'flip',
//        flip: {
//          slideShadows: true,
//          limitRotation: true,
//        },
          autoplayDisableOnInteraction: false,
          pagination: '.swiper-pagination'
        });
      });
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  @import "../../../../static/css/swiper-3.4.2.min.css";

  .banner-list {
    width: 100%;
    height: 187.5px;
    font-size: 0;
    .banner-wrap {
      display: none;
      width: 100%;
    }
    /*.swiper-pagination {*/
    /*position: absolute;*/
    /*bottom: 10px;*/
    /*left: 50%;*/
    /*!*transform: translateX(-50%);*!*/
    /*}*/
  }
</style>

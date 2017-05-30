<template>
  <div class="category-container">
    <div class="category" v-for="(item,index) in list" @click="goDetailCategory(index)">
      <img :src="item.imgUrl" :alt="item.title" width="110" height="110">
      <h3 class="title">{{item.title}}</h3>
      <p class="num" v-if="item.num != 0">{{item.num}}部作品</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '../../../api';
  import * as types from '../../../store/mutationsTypes';
  export default {
    data() {
      return {
        list: []
      }
    },
    created() {
      api.categoryApi().then(data => {
        this.list = data.data.data.list;
      })
    },
    methods: {
      goDetailCategory(index) {
        let keyword = this.list[index].title;
        if (index === 0) {
          this.$router.push({name: 'last'})
        } else if (keyword === '签约') {
          this.$router.push({name: 'vip'})
        }
        else {
          this.$router.push({name: 'detailCategory', params: {keyword}})
        }
        this.$store.commit(types.CHANGE_TOP_STATE, keyword);
      }
    }
  }
</script>


<style lang="less" rel="stylesheet/less" scoped>
  .category-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px 0;
    margin-top: 44px;
    background-color: rgb(244, 244, 244);
    box-shadow: 10px 10px 5px #888888;
    .title {
      text-align: center;
      font-size: 17px;
      color: #333;
    }
    .num {
      color: rgb(138, 138, 138);
      font-size: 12px;
      line-height: 24px;
      text-align: center;
    }
  }
</style>

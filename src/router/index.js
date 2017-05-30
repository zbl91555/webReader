import Vue from 'vue';
import Router from 'vue-router';

const home = resolve => {
  require(['page/home/home'], resolve)
};
const content = resolve => {
  require(['page/home/children/content'], resolve)
};
const search = resolve => {
  require(['page/search/search'], resolve)
};
const detail = resolve => {
  require(['page/detail/detail'], resolve)
};
const bookrack = resolve => {
  require(['page/bookrack/bookrack'], resolve)
};
const catelog = resolve => {
  require(['page/catelog/catelog'], resolve)
};
const mine = resolve => {
  require(['page/mine/mine'], resolve)
};
const login = resolve => {
  require(['page/mine/children/login'], resolve)
};
const personal = resolve => {
  require(['page/mine/children/personal'], resolve)
};
const register = resolve => {
  require(['page/mine/children/register'], resolve)
};
const forget = resolve => {
  require(['page/mine/children/forget'], resolve)
};
const reader = resolve => {
  require(['page/reader/reader'], resolve)
};
const categories = resolve => {
  require(['page/categories/categories'], resolve)
};
const category = resolve => {
  require(['page/categories/children/category'], resolve)
};
const detailCategory = resolve => {
  require(['page/categories/children/detailCategory'], resolve)
};
const booklist = resolve => {
  require(['page/categories/children/booklist'], resolve)
};
const finished = resolve => {
  require(['page/categories/children/finished'], resolve)
};
const last = resolve => {
  require(['page/categories/children/last'], resolve)
};
const rank = resolve => {
  require(['page/categories/children/rank'], resolve)
};
const vip = resolve => {
  require(['page/categories/children/vip'], resolve)
};

Router.prototype.goBack = function () {
  this.isBack = true;
  this.go(-1);
};//返回上一步

Vue.use(Router);

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      redirect: '/home/content'
    },
    {
      path: '/home',
      component: home,
      children: [
        {
          path: 'content',
          component: content
        }]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/detail',
      component: detail
    },
    {
      path: '/bookrack',
      component: bookrack
    },
    {
      path: '/catelog',
      component: catelog
    },
    {
      path: '/mine',
      component: mine,
      children: [
        {
          path: 'login',
          name: 'login',
          component: login
        },
        {
          path: 'personal',
          name: 'personal',
          component: personal
        },
        {
          path: 'register',
          component: register
        },
        {
          path: 'forget',
          component: forget
        }
      ]
    },
    {
      path: '/reader',
      component: reader
    },
    {
      path: '/categories',
      component: categories,
      children: [
        {
          path: 'category',
          name: 'category',
          component: category
        },
        {
          path: 'detailCategory',
          name: 'detailCategory',
          component: detailCategory
        },
        {
          path: 'booklist',
          name: 'booklist',
          component: booklist
        },
        {
          path: 'finished',
          name: 'finished',
          component: finished
        },
        {
          path: 'last',
          name: 'last',
          component: last
        },
        {
          path: 'rank',
          name: 'rank',
          component: rank
        },
        {
          path: 'vip',
          name: 'vip',
          component: vip
        }]
    }
  ]
})

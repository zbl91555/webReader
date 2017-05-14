import Vue from 'vue';
import Router from 'vue-router';
import home from 'page/home/home';
import content from 'page/home/children/content';
// import detail from 'page/detail/detail';
// import bookrack from 'page/bookrack/bookrack';
// import catelog from 'page/catelog/catelog';
// import reader from 'page/reader/reader';
// import mine from 'page/mine/mine';
// import login from 'page/mine/children/login';
// import personal from 'page/mine/children/personal';
// import register from 'page/mine/children/register';
// import forget from 'page/mine/children/forget';

Router.prototype.goBack = function () {
  this.isBack = true
  this.go(-1)
} //返回上一步

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
      component: function (resolve) {
        require(['page/search/search'], resolve)
      }
    },
    {
      path: '/detail',
      component: function (resolve) {
        require(['page/detail/detail'], resolve)
      }
    },
    {
      path: '/bookrack',
      component: function (resolve) {
        require(['page/bookrack/bookrack'], resolve)
      }
    },
    {
      path: '/catelog',
      component: function (resolve) {
        require(['page/catelog/catelog'], resolve)
      }
    },
    {
      path: '/mine',
      component: function (resolve) {
        require(['page/mine/mine'], resolve)
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: function (resolve) {
            require(['page/mine/children/login'], resolve)
          }
        },
        {
          path: 'personal',
          name: 'personal',
          component: function (resolve) {
            require(['page/mine/children/personal'], resolve)
          }
        },
        {
          path: 'register',
          component: function (resolve) {
            require(['page/mine/children/register'], resolve)
          }
        },
        {
          path: 'forget',
          component: function (resolve) {
            require(['page/mine/children/forget'], resolve)
          }
        }
      ]
    },
    {
      path: '/reader',
      component: function (resolve) {
        require(['page/reader/reader'], resolve)
      }
    }
  ]
})

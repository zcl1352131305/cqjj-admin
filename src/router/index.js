import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home/init'
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'init',
        component: _import('home/index'),
        name: 'homeInit',
        meta: {
          title: '主页'
        }
      }
    ]
  },
  {
    path: '/sysAdmin',
    component: Layout,
    children: [
      {
        path: 'user',
        component: _import('sysAdmin/user/index'),
        redirect: '/sysAdmin/user/init',
        children: [
          {
            path: 'init',
            component: _import('sysAdmin/user/init'),
            name: 'sysAdminUser',
            meta: { title: '用户管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('sysAdmin/user/edit'),
            name: 'sysAdminUser',
            meta: { title: '用户编辑', isTag: false }
          },
          {
            path: 'add',
            component: _import('sysAdmin/user/edit'),
            name: 'sysAdminUser',
            meta: { title: '用户新增', isTag: false }
          }
        ]
      },
      {
        path: 'group',
        component: _import('sysAdmin/group/index'),
        redirect: '/sysAdmin/group/init',
        children: [
          {
            path: 'init',
            component: _import('sysAdmin/group/init'),
            name: 'sysAdminGroup',
            meta: { title: '组管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('sysAdmin/group/edit'),
            name: 'sysAdminGroup',
            meta: { title: '组编辑', isTag: false }
          },
          {
            path: 'add',
            component: _import('sysAdmin/group/edit'),
            name: 'sysAdminGroup',
            meta: { title: '组新增', isTag: false }
          }
        ]
      },
      {
        path: 'menu',
        component: _import('sysAdmin/menu/index'),
        redirect: '/sysAdmin/menu/init',
        children: [
          {
            path: 'init',
            component: _import('sysAdmin/menu/init'),
            name: 'sysAdminMenu',
            meta: { title: '菜单管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('sysAdmin/menu/edit'),
            name: 'sysAdminMenu',
            meta: { title: '菜单编辑', isTag: false }
          },
          {
            path: 'add',
            component: _import('sysAdmin/menu/edit'),
            name: 'sysAdminMenu',
            meta: { title: '菜单新增', isTag: false }
          }
        ]
      }
    ]
  },
  {
    path: '/cqjjTrade',
    component: Layout,
    children: [
      {
        path: 'merchant',
        component: _import('cqjjTrade/merchant/index'),
        redirect: '/cqjjTrade/merchant/init',
        children: [
          {
            path: 'init',
            component: _import('cqjjTrade/merchant/init'),
            name: 'cqjjTradeMerchant',
            meta: { title: '商户管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('cqjjTrade/merchant/edit'),
            name: 'cqjjTradeMerchant',
            meta: { title: '商户编辑', isTag: false }
          },
          {
            path: 'add',
            component: _import('cqjjTrade/merchant/edit'),
            name: 'cqjjTradeMerchant',
            meta: { title: '商户新增', isTag: false }
          }
        ]
      },
      {
        path: 'furnitureType',
        component: _import('cqjjTrade/furnitureType/index'),
        redirect: '/cqjjTrade/furnitureType/init',
        children: [
          {
            path: 'init',
            component: _import('cqjjTrade/furnitureType/init'),
            name: 'cqjjTradeFurnitureType',
            meta: { title: '家具类型管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('cqjjTrade/furnitureType/edit'),
            name: 'cqjjTradeFurnitureType',
            meta: { title: '家具类型编辑', isTag: false }
          },
          {
            path: 'add',
            component: _import('cqjjTrade/furnitureType/edit'),
            name: 'cqjjTradeFurnitureType',
            meta: { title: '家具类型新增', isTag: false }
          }
        ]
      },
      {
        path: 'furnitureRecycle',
        component: _import('cqjjTrade/furnitureRecycle/index'),
        redirect: '/cqjjTrade/furnitureRecycle/init',
        children: [
          {
            path: 'init',
            component: _import('cqjjTrade/furnitureRecycle/init'),
            name: 'cqjjTradeFurnitureRecycle',
            meta: { title: '回收发布管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('cqjjTrade/furnitureRecycle/edit'),
            name: 'cqjjTradeFurnitureRecycle',
            meta: { title: '回收发布详情', isTag: false }
          },
        ]
      },
      {
        path: 'furnitureSale',
        component: _import('cqjjTrade/furnitureSale/index'),
        redirect: '/cqjjTrade/furnitureSale/init',
        children: [
          {
            path: 'init',
            component: _import('cqjjTrade/furnitureSale/init'),
            name: 'cqjjTradeFurnitureSale',
            meta: { title: '销售发布管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('cqjjTrade/furnitureSale/edit'),
            name: 'cqjjTradeFurnitureSale',
            meta: { title: '销售发布详情', isTag: false }
          },
        ]
      },
      {
        path: 'wechatMenu',
        component: _import('cqjjTrade/wechatMenu/index'),
        redirect: '/cqjjTrade/wechatMenu/init',
        children: [
          {
            path: 'init',
            component: _import('cqjjTrade/wechatMenu/init'),
            name: 'cqjjTradeWechatMenuType',
            meta: { title: '微信菜单管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('cqjjTrade/wechatMenu/edit'),
            name: 'cqjjTradeWechatMenuType',
            meta: { title: '微信菜单编辑', isTag: false }
          },
          {
            path: 'add',
            component: _import('cqjjTrade/wechatMenu/edit'),
            name: 'cqjjTradeWechatMenuType',
            meta: { title: '微信菜单新增', isTag: false }
          }
        ]
      },
      {
        path: 'specialInfo',
        component: _import('cqjjTrade/specialInfo/index'),
        redirect: '/cqjjTrade/specialInfo/init',
        children: [
          {
            path: 'init',
            component: _import('cqjjTrade/specialInfo/init'),
            name: 'cqjjTradeSpecialInfo',
            meta: { title: '特殊信息管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('cqjjTrade/specialInfo/edit'),
            name: 'cqjjTradeSpecialInfo',
            meta: { title: '特殊信息编辑', isTag: false }
          },
          {
            path: 'add',
            component: _import('cqjjTrade/specialInfo/edit'),
            name: 'cqjjTradeSpecialInfo',
            meta: { title: '特殊信息新增', isTag: false }
          }
        ]
      },
      {
        path: 'market',
        component: _import('cqjjTrade/market/index'),
        redirect: '/cqjjTrade/market/init',
        children: [
          {
            path: 'init',
            component: _import('cqjjTrade/market/init'),
            name: 'cqjjTradeMarket',
            meta: { title: '市场管理', isTag: true }
          },
          {
            path: 'edit/:id',
            component: _import('cqjjTrade/market/edit'),
            name: 'cqjjTradeMarket',
            meta: { title: '市场编辑', isTag: false }
          },
          {
            path: 'add',
            component: _import('cqjjTrade/market/edit'),
            name: 'cqjjTradeMarket',
            meta: { title: '市场新增', isTag: false }
          }
        ]
      },
      {
        path: 'advice',
        component: _import('cqjjTrade/advice/index'),
        redirect: '/cqjjTrade/advice/init',
        children: [
          {
            path: 'init',
            component: _import('cqjjTrade/advice/init'),
            name: 'cqjjTradeAdvice',
            meta: { title: '意见管理', isTag: true }
          },
          {
            path: 'detail/:id',
            component: _import('cqjjTrade/advice/detail'),
            name: 'cqjjTradeAdvice',
            meta: { title: '意见查看', isTag: false }
          }
        ]
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: { role: ['admin'] },
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        role: ['admin']
      }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

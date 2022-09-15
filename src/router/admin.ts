import { DashboardOne } from '@icon-park/vue-next'
import { RouteRecordRaw } from 'vue-router'
export default {
  path: '/admin',
  redirect: '/admin/guardList',
  component: () => import('@/layouts/admin.vue'),
  meta: { order: 1, auth: true, menu: { title: '工作台', icon: DashboardOne } },
  children: [
    // {
    //   name: 'admin',
    //   path: '',
    //   component: () => import('@/views/admin/index.vue'),
    //   meta: { menu: { title: '工作台' }, enterClass: 'animate__fadeInRight', leaveClass: 'animate__fadeOutLeft' },
    // },
    // {
    //   name: 'admin.table',
    //   path: 'table',
    //   component: () => import('@/views/admin/table.vue'),
    //   meta: { menu: { title: '表格展示' } },
    // },
    // {
    //   name: 'admin.form',
    //   path: 'form',
    //   component: () => import('@/views/admin/form.vue'),
    //   meta: { menu: { title: '表单提交' } },
    // },
    // {
    //   name: 'admin.animateList',
    //   path: 'animateList',
    //   component: () => import('@/views/admin/animateList.vue'),
    //   meta: { menu: { title: '动态列表' } },
    // },
    {
      name: 'admin.guardList',
      path: 'guardList',
      component: () => import('@/views/admin/guardianList.vue'),
      meta: { menu: { title: '打卡人信息' }},
    },
    {
      name: 'admin.insurantList',
      path: 'insurantList',
      component: () => import('@/views/admin/insurantList.vue'),
      meta: { menu: { title: '被保险人信息' } },
    },
    {
      name: 'admin.wechatGroupInfos',
      path: 'wechatGroupInfo',
      component: () => import('@/views/admin/wechatGroupInfo.vue'),
      meta: { menu: { title: '微信群关系信息' } },
    },
    {
      name: 'admin.recordList',
      path: 'recordList',
      component: () => import('@/views/admin/recordList.vue'),
      meta: { menu: { title: '打卡记录' } },
    },
  ],
} as RouteRecordRaw

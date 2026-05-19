import type {RouteRecordRaw} from 'vue-router';

/**
 * 静态路由
 */
export const staticRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/tower'
    },
    {
        path: '/tower',
        name: 'tower',
        component: () => import('@/views/tower/index.vue'),
        meta: {
            title: '爬塔',
        },
    },
    {
        path: '/hero',
        name: 'hero',
        component: () => import('@/views/hero/index.vue'),
        meta: {
            title: '英雄',
        },
    },
    {
        path: '/team',
        name: 'team',
        component: () => import('@/views/team/index.vue'),
        meta: {
            title: '编队',
        },
    },
    {
        path: '/hiring',
        name: 'hiring',
        component: () => import('@/views/hiring/index.vue'),
        meta: {
            title: '招募',
        },
    },
];
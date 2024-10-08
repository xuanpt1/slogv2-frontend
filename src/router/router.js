/*
 * Router 配置
 */
import { createRouter, createWebHashHistory} from "vue-router"
import HomeView from "@/router/views/HomeView"
import SickView from "@/router/views/SickView";
import BlogView from "@/router/views/BlogView";
import AboutView from "@/router/views/AboutView";
import GroupView from "@/router/views/GroupView";

import ManagerView from "@/router/views/ManagerView";

import front from "@/manage/front";
import LoginView from "@/router/views/LoginView.vue";
import main from "@/manage/main.vue";
import l2dtest from "@/manage/components/l2dtest.vue";
import siteset from "@/manage/sitemanage/siteset.vue";
import group from "@/manage/groupmanage/group.vue";
import headerUsed from "@/manage/components/headerUsed.vue";
import editor from "@/manage/blogedit/editor.vue";
import jumpTest from "@/manage/components/jumpTest.vue";

//TODO 跳转前与后端校验登录状态

const routes = [
    {
        path:'/Blogger/',
        component: HomeView
    },
    // {
    //     path: '/Blogger/Sick',
    //     component: SickView
    // },
    {
        path:'/Blogger/Blog/:id',
        component: BlogView
    },
    {
        path:'/Blogger/About',
        component: AboutView
    },
    // {
    //     path:'/Blogger/Group',
    //     component: GroupView
    // },

    { path: '/',
        name: 'front',
        component: front,
    },
    { path: '/Login',
        name: 'login',
        component: LoginView,
    },
    { path: '/manage/main',
        name: 'main',
        component: main,
    },
    { path: '/test',
        name: 'l2dtest',
        component: l2dtest,
    },
    { path: '/manage/siteset',
        name: 'siteset',
        component: siteset,
    },
    { path: '/managerView',
        component: ManagerView,
    },
    { path: '/manage/editor',
        name: 'editor',
        component: editor,
    },
    { path: '/headertest',
        name: 'headertest',
        component: headerUsed,
    },
    { path: '/jumpTest',
        name: 'jumpTest',
        component: jumpTest,
    },
]


const router = createRouter({
    history:createWebHashHistory(),
    scrollBehavior(to,from,savedPosition){

        if(savedPosition){
            return savedPosition

        }
        else{
            if(from.meta.keepAlive){
                from.meta.savedPosition = document.body.scrollTop
            }
            return {
                x:0,
                y:to.meta.savedPosition || 0
            }
        }

    },
    routes
});


export default router;

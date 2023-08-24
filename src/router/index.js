import Vue from 'vue'
import VueRouter from 'vue-router'
import tempLayout from '@/views/templateLayout'
import TestElementUI from '@/views/TestElementUI'
import CoursePageLayout from "@/layout/CoursePageLayout";
import InitLayout from "@/layout/InitLayout";
import Main from "@/views/Main";
import gragh from '@/views/gragh'
import ranking from '@/views/ranking'
import personal from '@/views/personal'
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage.vue";
import activation from "@/views/activation"
import userSetting from "@/views/userSetting"
import ExercisePage from "@/views/exercisePage"
import AllCourses from "@/views/AllCourses"
import MessageList from "@/views/MessageList"
import PickedCourses from "@/views/PickedCourses"
// import uploadResource from "@/views/UploadResource"
import uploadKGPagefrom from "@/views/test_kg_upload"
// const Answer = () => import('@/views/AnswerCar');

Vue.use(VueRouter)

const routes = [
     {
        path: '/login',
        name: "login",
        component: LoginPage

     },
    {
        path: '/register',
        name: "register",
        component: RegisterPage

    },
    {
        path: '/activation/:id/:activationCode',
        name: "activation",
        component: activation

    },
    {
        path: '/home',
        name: 'InitLayout',
        component: InitLayout,
        redirect: '/home/allcourses',
        children: [
           
            {
                path:'allcourses',
                name:'allcourses',
                component:AllCourses
            },
            {
                path:'pickedCourses',
                name:'pickedCourses',
                component:PickedCourses
            },
            {
                path: 'personal',
                name: 'personal',
                component: personal
            },
            { 
                path: 'userSetting',
                name: 'userSetting',
                component: userSetting
            },
            {
                path:'messageList',
                name:'messageList',
                component:MessageList
            }
        
        ]
    },
    {
        path: '/coursehome/:courseId/:chapterId',
        name: 'CoursePageLayout',
        component: CoursePageLayout,
        redirect: '/coursehome/:courseId/:chapterId/main',
        children: [
            {
                path: 'main',
                name: 'Main',
                component: Main
            },
            {
                path: 'gragh',
                name: 'gragh',
                component: gragh
            },
            {
                path: 'ranking',
                name: 'ranking',
                component: ranking
            },
            {
                path: 'personal',
                name: 'personal',
                component: personal
            },
            { 
                path: 'userSetting',
                name: 'userSetting',
                component: userSetting
               
            }
        ]
    },
    {
        path: '/exercise/:courseId/:chapterId/:subChapterId',
        name: "exercise",
        component: ExercisePage

     },
    //  {
    //     path: '/upload/resource',
    //     name: "uploadResource",
    //     component: uploadResource

    //  },
     
     {
        path: '/upload',
        name: "uploadKGPagefrom",
        component: uploadKGPagefrom

     }
   
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // to代表将要跳转的路径
    // from代表从哪个路径跳转而来
    // next()是一个函数，表示放行，next('/login')表示强制跳转到login页面
    // console.log(to.path.substring(0, 11))
    // if(to.path==='/login'||to.path==='/register'||to.path.substring(0, 11) =='/activation'){
    //     return next()
    // }
    // // return next('/login')
    // const Token = window.sessionStorage.getItem('authorities')
    // console.log("authorities:",Token)
    // if(!Token){
    
    //     return next('/login')
    // }
    next()
    })

export default router

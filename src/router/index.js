import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/bookBar.vue'
// import ReadingByPdf from '@/front/readingByPdf'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'bookBar',
  //   component: () =>import('../views/bookBar'),
  //   redirect:"/login",
  //   children:[
  //     {path: 'home', name: '主页', component: () =>import('../views/Home.vue')} ,
  //     {path: 'ManageEbook', name: '图书管理/电子图书管理', component: () =>import('../views/ManageEbook')},
  //     {path: 'ManageBook', name: '图书管理/实体图书管理', component: () =>import('../views/ManageBook')},
  //     {path: 'ManageEmployee', name: '内务管理/员工管理', component: () =>import('../views/ManageEmployee')},
  //     {path: 'ManageFinance', name: '内务管理/财务管理', component: () =>import('../views/ManageFinance')},
  //     {path: 'AssignSeats', name: '座位分配', component: () =>import('../views/AssignSeats')},
  //     {path: 'ManageMember', name: '会员管理', component: () =>import('../views/ManageMember')},
  //     {path: 'File', name: '文件管理', component: () =>import('../views/File')},
  //     {path: 'storeorder', name: '订单管理/进货订单管理', component: () =>import('../views/StoreOrder')} ,
  //     {path: 'userorder', name: '订单管理/用户订单管理', component: () =>import('../views/UserOrder')},
  //     {path: '/person', name: '个人信息界面', component: () => import('../views/Person.vue'),},
  //     {path: '/Role', name: '角色管理', component: () => import('../views/Role.vue'),},
  //     {path: '/menu', name: '菜单管理', component: () => import('../views/Menu.vue'),},
  //
  //   ]
  // },
  {
    path: '/front',
    name: 'Front',
    component: () => import('../views/front/FrontFrame'),
    children:[
      {

        path: 'home',
        name: 'FrontHome',
        component:() => import("../views/front/Home.vue")

      },
      {
        path: 'bookSale',
        name: 'BookSale',
        component:() => import("../views/front/BookSale.vue")
      },
      {
        path: 'personalReadingHouse',
        name: 'PersonalReadingHouse',
        component:() => import("../views/front/PersonalReadingHouse.vue")
      },
      {
        path: 'memberBookcase',
        name: 'MemberBookcase',
        component:() => import("../views/front/MemberBookcase.vue")
      },
      {
        path: 'chooseSeat',
        name: 'ChooseSeat',
        component:() => import("../views/front/ChooseSeat.vue")
      },
      {
        path: 'remarks',
        name: 'Remarks',
        component:() => import("../views/front/Remarks.vue")
      },
      {
        path: 'blogDetail',
        name: 'BlogDetail',
        component:() => import("../views/front/BlogDetail")
      },
      {
        path: 'userBlog',
        name: 'UserBlog',
        component:() => import("../views/front/UserBlog")
      },
      {
        path: 'editBlog',
        name: 'EditBlog',
        component:() => import("../views/front/EditBlog")
      },
      {
        path: 'addBlog',
        name: 'AddBlog',
        component:() => import("../views/front/AddBlog")
      }

    ]

  },
  {
    path: '/test',
    name: 'Test',
    component:() => import("../views/Test.vue")
  },
  {
    path: '/person',
    name: 'Person',
    component:() => import("../views/Person.vue")
  },

  {
    path: '/readingByPdf',
    name: 'ReadingByPdf',
    component:() => import('../views/front/readingByPdf')
  },
  {
    path: '/login',
    name: 'Login',
    component:() => import('../views/Login')
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue')
  },


  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export const resetRouter =()=>{

  router.matcher = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes

  })

}

router.afterEach((to, from, next) => {
  document.querySelector("body").setAttribute("style", "overflow: auto !important;")
});



export const setRoutes =()=>{
  const  storemenus = localStorage.getItem("menus")
  if(storemenus){
    //拼装动态路由
    const manageRoute ={path: '/', name: 'bookBar', component: () =>import('../views/bookBar'), redirect:"/login",children:[
        // {
        //   path: 'person',
        //   name: 'Person',
        //   component:() => import("../views/front/Person.vue")
        // },
      ]}

    const  menus = JSON.parse(storemenus)

    menus.forEach(item =>{
      if(item.path){
        let itemMenu = {path: item.path.replace("/",""), name: item.name, component: () =>import('../views/'+item.pagePath + '.vue')}
        manageRoute.children.push(itemMenu)
      }else if(item.children.length) {
        item.children.forEach(item => {
          if (item.path) {
            let itemMenu = { path: item.path.replace("/", ""), name: item.name, component: () => import('../views/' + item.pagePath + '.vue')}
            manageRoute.children.push(itemMenu)
          }
        })
      }
    })

    const currencyRoutes = router.getRoutes().map(v=>v.name)
    if(!currencyRoutes.includes('bookBar')){
      router.addRoute(manageRoute)
    }

  }

}

// 重置我就再set一次路由
  setRoutes()

router.beforeEach((to,from,next)=>{

  localStorage.setItem("currentPathName",to.name)  //设置当前路由的名称



  if(!to.matched.length)
  {
    const  storeMenus = localStorage.getItem("menus")
    if(storeMenus){
    next("/404")
    } else {
      next("/login")
    }
  }
  next()



})

export default router

import router from "./router";

router.beforeEach((to,from,next) => {
  let token = localStorage.getItem('token')
  if(token || to.path == '/login'){
    next()
  }else{
    next({path:'/login'})
  }
})
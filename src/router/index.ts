import { createRouter, createWebHistory } from "vue-router";
import { ElLoading } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("~/components/views/MainView.vue")
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const loadingInstance = ElLoading.service({lock:true, fullscreen:true})
  
  const isAuthenticated = false // to manage authentication create new function
  
  // Check if user is authenticated before going to a view
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      next();
      loadingInstance.close()
      return;
    }
    next("/");
    loadingInstance.close()
    return
  }
  else if (to.name == 'login') {
    if (isAuthenticated) {
      next("/")
    }
    else {
      next();
      loadingInstance.close()
      return
    }
  }
  else {
    next()
  }
  loadingInstance.close()
});

export default router;

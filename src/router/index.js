import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// import Home from "@/pages/Home";
// import Search from "@/pages/Search";
// import Login from "@/pages/Login";
// import Register from "@/pages/Register";

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {}, () => {});
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => {}, () => {});
  }
};

export default new VueRouter({
  routes: [
    {
      path: "*",
      redirect:"/home",
    },
    {
      name: "home",
      path: "/home",
      component: () => import("@/pages/Home")
    },
    {
      name: "search",
      path: "/search",
      component: () => import("@/pages/Search"),
      // 1.將params參數作爲路由組件的屬性傳遞
      // props: true,
      // 2.使用對象形式指定屬性傳遞給路由組件
      // props: { a:1,b:2 }
      // 3.使用函數形式把params、query參數傳遞給路由組件
      // props: $route => ({ keyword: $route.params.keyword, k: $route.query.k })
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/pages/Login"),
      meta: { blockFooter: true }
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/pages/Register"),
      meta: { blockFooter: true }
    },
  ]
})
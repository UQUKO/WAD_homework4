import { createRouter, createWebHistory } from "vue-router";
import AllPosts from "../views/AllPosts.vue";
import APost from "../views/APost.vue";
import AddPost from "../views/AddPost.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import ContactsComponent from "../components/ContactsComponent.vue";
import auth from "../../auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: AllPosts,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: "/api/contacts",
    name: "Contacts",
    component: ContactsComponent,
  },
  {
    path: "/api/home",
    name: "AllPosts",
    component: AllPosts,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: "/api/apost/:id",
    name: "APost",
    component: APost,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: "/api/addpost",
    name: "AddPost",
    component: AddPost,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: "/api/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/api/login",
    name: "LogIn",
    component: LogIn,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Add the navigation guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth; // Check if the route requires authentication
  const isAuthenticated = await auth.authenticated(); // Check if the user is authenticated

  if (requiresAuth && !isAuthenticated) {
    next("/api/login"); // Redirect unauthenticated users to the login page
  } else {
    next(); // Allow access if authenticated or no auth required
  }
});

export default router;

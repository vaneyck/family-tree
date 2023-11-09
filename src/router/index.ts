import FamilyTreeContainer from "@/components/FamilyTreeContainer.vue";
import SignIn from "@/components/SignIn.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { firebaseAuth } from "@/firebase";
import ManagePersons from "@/components/ManagePersons.vue";
import ManageRelations from "@/components/ManageRelations.vue";

const routes = [
  { name: "signin", path: "/", component: SignIn },
  { name: "dashboard", path: "/dashboard", component: FamilyTreeContainer },
  { name: "manage-persons", path: "/manage-persons", component: ManagePersons },
  { name: "manage-relations", path: "/manage-relations", component: ManageRelations },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const getUser = function () {
  return new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject("User Not Available");
      }
    });
  });
};

/**
 * Redirect to the sign in page if user is not logged in
 */
router.beforeEach(async function (to, from, next) {
  if (to.name === "signin") {
    next();
    return;
  }
  try {
    const user = await getUser();
    console.log("ROUTER: user is logged in", user);
    next();
  } catch (error) {
    console.log("ROUTER: Error:", error);
    next({ name: "signin" });
  }
});

export default router;

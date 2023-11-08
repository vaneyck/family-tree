<template>
  <div>
    <div id="signin"></div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { firebaseAuth, signInUi } from "@/firebase";
import router from "@/router";
import firebaseui from "firebaseui";

@Options({
  mounted() {
    console.log("Mounted SignIn Page");
    const uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: ["password"],
      tosUrl: "/terms-of-service",
      privacyPolicyUrl: "/privacy-policy",
    } as firebaseui.auth.Config;
    signInUi.start("#signin", uiConfig);

    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("going to home");
        router.replace({ path: "/dashboard" });
      } else {
        console.log("going to signin");
        router.push({ path: "/" });
      }
    });
  },
})
export default class SignIn extends Vue {}
</script>

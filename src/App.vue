<template>
  <FamilyTreeContainer></FamilyTreeContainer>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import FamilyTreeContainer from "@/components/FamilyTreeContainer.vue";

// Import Bulma CSS
import "bulma/css/bulma.css";

@Options({
  components: {
    FamilyTreeContainer,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
}
</style>

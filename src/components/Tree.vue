<template>
  <div>
    <h1>Tree</h1>
    <div style="width: 100%; height: 700px" id="tree"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";

@Options({
  components: {},
  mounted() {
    // TODO draw tree for the first time
  },
  computed: {
    treeData: function () {
      return store.getters.getTreeData;
    },
  },
  watch: {
    treeData: function (newTreeData) {
      // TODO redraw tree since new information is received
      console.log(newTreeData);
    },
  },
})
export default class Tree extends Vue {}
</script>

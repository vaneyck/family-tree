<template>
  <div>
    <h1>Tree</h1>
    <div style="width: 100%; height: 700px" id="tree"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import FamilyTree from "@balkangraph/familytree.js";

@Options({
  components: {},
  mounted() {
    this.renderTree();
  },
  computed: {
    treeData: function () {
      return store.getters.getTreeData;
    },
  },
  methods: {
    renderTree: function () {
      new FamilyTree("#tree", {
        menu:{
          png: { text: "Export PNG" },
          svg: { text: "Export SVG" },
          csv: { text: "Export CSV" },
        },
        // enableTouch: true,
        orientation: FamilyTree.orientation.left,
        layout: FamilyTree.layout.mixed,
        orderBy: "yearOfBirth",
        toolbar: {
          fullScreen: true,
          zoom: true,
          fit: true,
          expandAll: true,
        },
        align: FamilyTree.align.orientation,
        dottedLines: [
          {from: 6, to: 1 }
        ],
        nodeBinding: {
          field_0: "name",
          field_1: "yearsRange",
          img_0: "headShotImage",
        },
        nodes: this.treeData,
      });
    },
  },
  watch: {
    treeData: function (newTreeData) {
      // TODO redraw tree since new information is received
      console.log(newTreeData);
      this.renderTree();
    },
  },
})
export default class Tree extends Vue {}
</script>

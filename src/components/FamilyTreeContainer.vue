<template>
  <div>
    <Tree></Tree>
    <TreeEditor></TreeEditor>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Tree from "@/components/Tree.vue";
import TreeEditor from "@/components/TreeEditor.vue";

@Options({
  components: { TreeEditor, Tree },
})
export default class FamilyTreeContainer extends Vue {}
</script>

<template>
  <div>
    <div class="columns">
      <div class="column">
        <Tree></Tree>
      </div>
      <div class="column is-one-third">
        <TreeEditor></TreeEditor>
      </div>
    </div>
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

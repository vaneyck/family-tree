<template>
  <div>
    <router-link to="/manage-persons">Manage Persons</router-link>
    || <router-link to="/manage-relations">Manage Relations</router-link>
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
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { firebaseAuth } from "@/firebase";
import { getPersonPath, getRelationsPath } from "@/utils/helpers";
import store from "@/store";
import { Person } from "@/types/Person";
import { Relationship } from "@/types/Relationship";

@Options({
  components: { TreeEditor, Tree },
  mounted() {
    try {
      const currentUser = firebaseAuth.currentUser;
      if (currentUser) {
        const collectionRef = collection(
          getFirestore(),
          getPersonPath(currentUser.uid),
        );
        const q = query(collectionRef);
        // TODO this variable allows us to unsubscribe
        onSnapshot(q, (querySnapshot) => {
          let persons = [] as Person[];
          querySnapshot.forEach((doc) => {
            let map = doc.data() as Person;
            map.person_uuid = doc.id;
            persons.push(map);
          });
          store.state.persons = persons;
        });
      }
    } catch (error) {
      console.log(error);
    }
    // trigger rendering of tree
    try {
      const currentUser = firebaseAuth.currentUser;
      if (currentUser) {
        const collectionRef = collection(
          getFirestore(),
          getRelationsPath(currentUser.uid),
        );
        const q = query(collectionRef);
        // TODO this variable allows us to unsubscribe
        onSnapshot(q, (querySnapshot) => {
          let relations = [] as Relationship[];
          querySnapshot.forEach((doc) => {
            let map = doc.data() as Relationship;
            map.relationship_uuid = doc.id;
            relations.push(map);
          });
          store.state.relationships = relations;
          store.dispatch("rebuildTreeData");
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
})
export default class FamilyTreeContainer extends Vue {}
</script>

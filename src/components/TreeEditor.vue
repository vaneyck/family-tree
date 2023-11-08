<template>
  <div>
    <h1>Tree Editor</h1>
    <AddPerson />
    <hr />
    <AddRelationship />
    <hr />
    <ol>
      <li v-for="(person, index) in persons" :key="index">
        {{ person.person_uuid }} // {{ person.names }}
      </li>
    </ol>
    <hr />
    <ol>
      <li v-for="(relation, index2) in relationships" :key="index2">
        {{ JSON.stringify(relation) }}
        <!--        SUBJ : {{ relation.subject_uuid }} = {{ relation.relationship_type }} = OBJ : {{ relation.object_uuid }}-->
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import AddPerson from "@/components/AddPerson.vue";
import AddRelationship from "@/components/AddRelationship.vue";

@Options({
  components: { AddRelationship, AddPerson },
  data() {
    return {
      treeJsonDataAsString: "",
    };
  },
  computed: {
    persons: function () {
      return store.getters.getPersons;
    },
    relationships: function () {
      return store.getters.getRelationships;
    },
  },
  methods: {
    addJsonData: function () {
      store.dispatch(
        "processJson",
        JSON.parse(this.treeJsonDataAsString).treeData,
      );
    },
  },
})
export default class TreeEditor extends Vue {}
</script>

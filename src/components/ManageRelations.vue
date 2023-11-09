<template>
  <div>
    <h1 class="is-size-1">Manage Family</h1>
    <div class="columns">
      <div class="column">
        <table class="table">
          <thead>
          <tr>
            <td>Subject</td>
            <td>Relation</td>
            <td>Object</td>
            <td>Action</td>
          </tr>
          </thead>
          <tr v-for="(relation, index2) in relationships" :key="index2">
            <td>{{ getPersonName(relation.subject_uuid) }}</td>
            <td>{{ relation.relationship_type }}</td>
            <td>{{ getPersonName(relation.object_uuid) }}</td>
            <td>
              <button @click="addToEditor(relation)">Edit</button>
            </td>
          </tr>
        </table>
      </div>
      <div class="column">
        <div v-if="relationToEdit.relationship_uuid != ''">
          <AddRelationship
              :editing="true"
              :editing-uuid="relationToEdit.relationship_uuid"
              :relation-ship-to-edit="relationToEdit"
          ></AddRelationship>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import { Person } from "@/types/Person";
import AddPerson from "@/components/AddPerson.vue";
import {Relationship} from "@/types/Relationship";
import AddRelationship from "@/components/AddRelationship.vue";

@Options({
  components: {AddRelationship, AddPerson },
  data() {
    return {
      relationToEdit: { relationship_uuid: "" },
    };
  },
  methods: {
    getPersonName: function (userId: string) {
      return this.persons.find((p : Person) => p.person_uuid === userId).names??'';
    },
    addToEditor: function (relationship: Relationship) {
      this.relationToEdit = relationship;
      console.log("Adding relation for editing", this.relationToEdit);
    },
  },
  computed: {
    persons: function () {
      return store.getters.getPersons;
    },
    relationships: function () {
      return store.getters.getRelationships;
    },
  },
})
export default class ManageRelations extends Vue {}
</script>

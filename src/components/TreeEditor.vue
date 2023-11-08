<template>
  <div>
    <h1>Tree Editor</h1>
    <AddPerson />
    <hr />
    <AddRelationship />
    <hr />
    <table class="table">
      <thead>
      <tr>
        <td>Name</td>
        <td>Gender</td>
        <td>Birth</td>
        <td>Death</td>
        <td>Action</td>
      </tr>
      </thead>
      <tr v-for="(person, index) in persons" :key="index">
        <td>{{ person.names}}</td>
        <td>{{ person.gender }}</td>
        <td>{{ person.yearOfBirth }}</td>
        <td>{{ person.yearOfDeath }}</td>
        <td>Action</td>
      </tr>
    </table>
    <hr />
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
        <td>Action</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import AddPerson from "@/components/AddPerson.vue";
import AddRelationship from "@/components/AddRelationship.vue";
import {Person} from "@/types/Person";

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
    getPersonName: function (userId: string) {
      return this.persons.find((p : Person) => p.person_uuid === userId).names??'';
    },
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

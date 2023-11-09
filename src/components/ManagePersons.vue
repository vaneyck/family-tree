<template>
  <div>
    <h1 class="is-size-1">Manage Family</h1>
    <div class="columns">
      <div class="column">
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
            <td>{{ person.names }}</td>
            <td>{{ person.gender }}</td>
            <td>{{ person.yearOfBirth }}</td>
            <td>{{ person.yearOfDeath }}</td>
            <td>
              <button @click="addToEditor(person)">Edit</button>
            </td>
          </tr>
        </table>
      </div>
      <div class="column">
        <div v-if="personToEdit.person_uuid != ''">
          <AddPerson
              :editing="true"
              :editing-uuid="personToEdit.person_uuid"
              :person-to-edit="personToEdit"
          ></AddPerson>
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

@Options({
  components: { AddPerson },
  data() {
    return {
      personToEdit: { person_uuid: "" },
    };
  },
  methods: {
    addToEditor: function (person: Person) {
      this.personToEdit = person;
      console.log(this.personToEdit);
    },
  },
  computed: {
    persons: function () {
      return store.getters.getPersons;
    },
  },
})
export default class ManagePersons extends Vue {}
</script>

<template>
  <div>
    <h1>Add Person</h1>
    <input class="input" type="text" v-model="personName" />
    <br />
    <br />
    <button @click="addPerson" class="button">Add Person</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import { Person } from "@/types/Person";
import { v4 as uuidv4 } from "uuid";

@Options({
  data() {
    return {
      personName: "",
    };
  },
  methods: {
    addPerson: function () {
      store.dispatch("addPerson", {
        person_uuid: uuidv4(),
        names: this.personName,
      } as Person);
      this.personName = "";
    },
  },
})
export default class AddPerson extends Vue {}
</script>

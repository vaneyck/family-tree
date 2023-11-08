<template>
  <div>
    <h1>Add Person</h1>

    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" v-model="personName" />
      </div>
    </div>

    <div class="field">
      <label class="label">Gender</label>
      <div class="control select">
        <select v-model="gender">
          <option>male</option>
          <option>female</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label class="label">Year of Birth</label>
      <div class="control">
        <input class="input" type="number" v-model="yearOfBirth" />
      </div>
    </div>

    <div class="field">
      <label class="label">Year of Death</label>
      <div class="control">
        <input class="input" type="number" v-model="yearOfDeath" />
      </div>
    </div>

    <div class="field">
      <label class="label">Link To Image</label>
      <div class="control">
        <input class="input" type="text" v-model="headShotImage" />
      </div>
    </div>

    <button @click="addPerson" class="button">Add Person</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import { Person } from "@/types/Person";
import { v4 as uuidv4 } from "uuid";

@Options({
  props: {
    editing: Boolean,
    editingUuid: String,
  },
  data() {
    return {
      personName: "",
      gender: "male",
      yearOfBirth: null,
      yearOfDeath: null,
      headShotImage: null,
    };
  },
  methods: {
    addPerson: function () {
      store.dispatch("addPerson", {
        person_uuid: this.editing ? this.editingUuid : uuidv4(),
        names: this.personName,
        gender: this.gender,
        yearOfBirth: this.yearOfBirth,
        yearOfDeath: this.yearOfDeath,
        headShotImage: this.headShotImage,
      } as Person);

      this.personName = "";
      this.yearOfBirth = null;
      this.yearOfDeath = null;
    },
  },
})
export default class AddPerson extends Vue {}
</script>

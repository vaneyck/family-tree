<template>
  <div>
    <h1>Add Relationship</h1>
    <div class="select">
      <select v-model="subjectId">
        <option
          v-for="(person, index) in persons"
          :key="index"
          :value="person.person_uuid"
        >
          {{ person.names }}
        </option>
      </select>
    </div>
    <br />
    <div class="select">
      <select v-model="relationshipType">
        <option
          v-for="(relationshipType, index) in relationshipTypes"
          :key="index"
          :value="relationshipType"
        >
          {{ relationshipType }}
        </option>
      </select>
    </div>
    <br />
    <div class="select">
      <select v-model="objectId">
        <option
          v-for="(person, index) in persons"
          :key="index"
          :value="person.person_uuid"
        >
          {{ person.names }}
        </option>
      </select>
    </div>
    <br />
    <button @click="addRelationship" class="button">
      Add <Relationship></Relationship>
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import { Relationship, RelationshipType } from "@/types/Relationship";
import { v4 as uuidv4 } from "uuid";

@Options({
  data() {
    return {
      subjectId: null,
      objectId: null,
      relationshipType: null,
    };
  },
  computed: {
    persons: function () {
      return store.getters.getPersons;
    },
    relationshipTypes: function () {
      return Object.values(RelationshipType);
    },
  },
  methods: {
    addRelationship: function () {
      const rel = {
        relationship_uuid: uuidv4(),
        subject_uuid: this.subjectId,
        object_uuid: this.objectId,
        relationship_type: this.relationshipType,
      } as Relationship;
      console.log("from component", rel);
      store.dispatch("addRelationship", rel);
    },
  },
})
export default class AddRelationship extends Vue {}
</script>

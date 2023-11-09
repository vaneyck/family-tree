<template>
  <div>
    <h1>Add Relationship</h1>
    <div class="columns">
      <div class="column">
        <div>{{ subjectId }}</div>
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
      </div>
      <div class="column">
        <div>{{ relationshipType }}</div>
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
      </div>
      <div class="column">
        <div class="select">
          <div>{{ objectId }}</div>
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
      </div>
    </div>
    <button @click="addRelationship" class="button">
      Add
    </button>
    <div v-if="editing">
      <button @click="deleteRelation">{{ deleteMessage }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import { Relationship, RelationshipType } from "@/types/Relationship";
import { v4 as uuidv4 } from "uuid";
import {firebaseAuth} from "@/firebase";
import {collection, doc, getFirestore, deleteDoc} from "firebase/firestore";
import { getRelationsPath} from "@/utils/helpers";

@Options({
  props: {
    editing: Boolean,
    editingUuid: String,
    relationShipToEdit: Object
  },
  data() {
    return {
      areYouSure: false,
      subjectId: null,
      objectId: null,
      relationshipType: null,
    };
  },
  watch:{
    editingUuid: function (newValue) {
      console.log("Managing = ", newValue);
      if (this.editing) {
        this.areYouSure = false;
        this.subjectId = this.relationShipToEdit.subject_uuid??null;
        this.objectId = this.relationShipToEdit.object_uuid??null;
        this.relationshipType = this.relationShipToEdit.relationship_type??null;
      }
    }
  },
  computed: {
    persons: function () {
      return store.getters.getPersons;
    },
    relationshipTypes: function () {
      return Object.values(RelationshipType);
    },
    deleteMessage: function () {
      if (this.areYouSure) {
        return "Click again to Delete"
      } else {
        return "Are you sure you want to delete. Click for Yes";
      }
    }
  },
  methods: {
    deleteRelation: function () {
      if (this.areYouSure) {
        this.doDeleteRelationWork();
        this.areYouSure = false;
      } else {
        this.areYouSure = true;
      }
    },
    doDeleteRelationWork: function () {
      try {
        const currentUser = firebaseAuth.currentUser;
        if (currentUser) {
          const relationRef = collection(
              getFirestore(),
              getRelationsPath(currentUser.uid),
          );
          deleteDoc(doc(relationRef, this.editingUuid));
        }
      } catch (e) {
        console.error("Error deleting document: ", e);
        alert("Could not deleting document");
      }
    },
    addRelationship: function () {
      const rel = {
        relationship_uuid: this.editing ? this.editingUuid : uuidv4(),
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

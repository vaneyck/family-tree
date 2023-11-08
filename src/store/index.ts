import { createStore } from "vuex";
import { Person } from "@/types/Person";
import { Relationship } from "@/types/Relationship";

export default createStore({
  state: {
    persons: [] as Person[],
    relationships: [] as Relationship[],
    treeData: {},
  },
  getters: {
    getPersons(state) {
      return state.persons;
    },
    getRelationships(state) {
      return state.relationships;
    },
    getTreeData(state) {
      return state.treeData;
    },
  },
  mutations: {
    addPerson(state, personToAdd: Person) {
      const foundPerson = state.persons.find((p) => {
        return p.person_uuid === personToAdd.person_uuid;
      });
      if (!foundPerson && personToAdd) {
        state.persons.push(personToAdd);
      }
    },
    addRelationship(state, relationshipToAdd: Relationship) {
      // TODO make this better
      if (state.relationships.length == 0) {
        state.relationships.push(relationshipToAdd);
        return;
      }
      const foundRelationship = state.relationships.find((relationship) => {
        return (
          relationship.subject_uuid === relationshipToAdd.subject_uuid &&
          relationship.object_uuid === relationshipToAdd.object_uuid
        );
      });
      if (!foundRelationship && relationshipToAdd) {
        state.relationships.push(relationshipToAdd);
      }
    },
  },
  actions: {
    addPerson(context, personToAdd: Person) {
      context.commit("addPerson", personToAdd);
    },
    addRelationship(context, relationshipToAdd: Relationship) {
      context.commit("addRelationship", relationshipToAdd);
    },
  },
  modules: {},
});

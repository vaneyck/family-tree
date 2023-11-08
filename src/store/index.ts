import { createStore } from "vuex";
import { Person } from "@/types/Person";
import { Relationship } from "@/types/Relationship";

export default createStore({
  state: {
    persons: [] as Person[],
    relationships: [] as Relationship[],
  },
  getters: {
    getPersons(state) {
      return state.persons;
    },
    getRelationships(state) {
      return state.relationships;
    },
  },
  mutations: {
    addPerson(state, personToAdd: Person) {
      const foundPerson = state.persons.find((p) => {
        return p.person_uuid === personToAdd.person_uuid;
      });
      if (!foundPerson) {
        state.persons.push(personToAdd);
      }
    },
    addRelationship(state, relationshipToAdd: Relationship) {
      const foundRelationship = state.relationships.find((relationship) => {
        return (
          relationship.subject_uuid === relationship.subject_uuid &&
          relationship.object_uuid === relationship.object_uuid
        );
      });
      if (!foundRelationship) {
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

import { createStore } from "vuex";
import { Person } from "@/types/Person";
import { Relationship, RelationshipType } from "@/types/Relationship";
import { FamilyTreeNode } from "@/types/FamilyTreeNode";

const prepareTreeData = function (
  persons: Person[],
  relationships: Relationship[],
) {
  const treeNodes = persons.map((p) => {
    return {
      name: p.names,
      id: p.person_uuid,
      pids: [],
      gender: p.gender,
    } as FamilyTreeNode;
  });

  const findTreeNodeIndex = function (uuid: string) {
    return treeNodes.findIndex((node) => node.id === uuid);
  };

  for (const relation of relationships) {
    if (relation.relationship_type === RelationshipType.MARRIED_TO) {
      // link husband and wife
      let index = findTreeNodeIndex(relation.subject_uuid);
      if (index >= 0) {
        treeNodes[index].pids?.push(relation.object_uuid);
      }
      index = findTreeNodeIndex(relation.object_uuid);
      if (index >= 0) {
        treeNodes[index].pids?.push(relation.subject_uuid);
      }
    }

    if (relation.relationship_type === RelationshipType.FATHER_TO) {
      const index = findTreeNodeIndex(relation.object_uuid);
      if (index >= 0) {
        treeNodes[index].fid = relation.subject_uuid;
      }
    }

    if (relation.relationship_type === RelationshipType.MOTHER_TO) {
      const index = findTreeNodeIndex(relation.object_uuid);
      if (index >= 0) {
        treeNodes[index].mid = relation.subject_uuid;
      }
    }
  }
  return treeNodes;
};

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

      // Update Tree Data
      state.treeData = prepareTreeData(state.persons, state.relationships);
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

      // Update Tree Data
      state.treeData = prepareTreeData(state.persons, state.relationships);
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

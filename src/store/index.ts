import { createStore } from "vuex";
import { Person } from "@/types/Person";
import { Relationship, RelationshipType } from "@/types/Relationship";
import { FamilyTreeNode } from "@/types/FamilyTreeNode";
import {
  collection,
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";
import { firebaseAuth } from "@/firebase";
import { getPersonPath, getRelationsPath } from "@/utils/helpers";

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
      yearsRange: `${p.yearOfBirth ?? ""}-${p.yearOfDeath ?? ""}`,
      headShotImage: p.headShotImage,
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
    async addPerson(state, personToAdd: Person) {
      const addToDatabase = async function (personToAdd: Person) {
        // Sync to firebase
        try {
          const currentUser = firebaseAuth.currentUser;
          if (currentUser) {
            const personsRef = collection(
              getFirestore(),
              getPersonPath(currentUser.uid),
            );
            await setDoc(doc(personsRef, personToAdd.person_uuid), personToAdd);
            // state.persons.push(personToAdd);
          }
        } catch (e) {
          console.error("Error adding document: ", e);
          alert("Could not get user");
        }
      };

      const foundPersonIndex = state.persons.findIndex((p) => {
        return p.person_uuid === personToAdd.person_uuid;
      });
      if (foundPersonIndex === -1 && personToAdd) {
        console.log("Adding New Person");
        await addToDatabase(personToAdd);
      }
      if (foundPersonIndex >= 0 && personToAdd) {
        console.log("Updating Existing Person");
        state.persons[foundPersonIndex] = personToAdd;
        await addToDatabase(personToAdd);
      }
    },
    async addRelationship(state, relationshipToAdd: Relationship) {
      const addToDatabase = async function (relationshipToAdd: Relationship) {
        try {
          const currentUser = firebaseAuth.currentUser;
          if (currentUser) {
            const relationsRef = collection(
              getFirestore(),
              getRelationsPath(currentUser.uid),
            );
            await setDoc(
              doc(relationsRef, relationshipToAdd.relationship_uuid),
              relationshipToAdd,
            );
            // state.relationships.push(relationshipToAdd);
          }
        } catch (error) {
          console.error("Error adding document: ", error);
          alert("Could not get user");
        }
      };

      // TODO make this better
      if (state.relationships.length == 0) {
        state.relationships.push(relationshipToAdd);
        return;
      }

      // TODO handle case when subject or object is missing

      // subject and object cant be same person
      if (relationshipToAdd.subject_uuid === relationshipToAdd.object_uuid) {
        alert("Ensure 2 different people are in the relationship");
        return;
      }
      const foundRelationship = state.relationships.find((relationship) => {
        return (
          relationship.subject_uuid === relationshipToAdd.subject_uuid &&
          relationship.object_uuid === relationshipToAdd.object_uuid
        );
      });
      // Add new relationship
      if (!foundRelationship && relationshipToAdd) {
        await addToDatabase(relationshipToAdd);
      }
    },
    rebuildTreeData(state) {
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
    rebuildTreeData(context) {
      context.commit("rebuildTreeData");
    },
  },
  modules: {},
});

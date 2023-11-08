<template>
  <div>
    <h1>Add Person</h1>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" v-model="personName" />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Gender</label>
          <div class="control select">
            <select v-model="gender">
              <option>male</option>
              <option>female</option>
            </select>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Year of Birth</label>
          <div class="control">
            <input class="input" type="number" v-model="yearOfBirth" />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Year of Death</label>
          <div class="control">
            <input class="input" type="number" v-model="yearOfDeath" />
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Link To Image</label>
      <div class="control">
        <input class="input" type="file" name="myImage" accept="image/*" @change="fileSelected" ref="myFile" />
      </div>
    </div>

    <button :disabled="uploadingImage" @click="addPerson" class="button">Add Person</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import { Person } from "@/types/Person";
import { v4 as uuidv4 } from "uuid";
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Options({
  props: {
    editing: Boolean,
    editingUuid: String,
  },
  data() {
    return {
      uploadingImage: false,
      personName: "",
      gender: "male",
      yearOfBirth: null,
      yearOfDeath: null,
      headShotImage: null,
    };
  },
  methods: {
    fileSelected: function (filePath: string) {
      console.log(filePath);
      const file = this.$refs.myFile.files[0] as File;

      const firebaseApp = getApp();
      const storage = getStorage(firebaseApp, "gs://family-tree-3772b.appspot.com");

      const storageRef = ref(storage, 'headshots/' + file.name);
      this.uploadingImage = true;
      uploadBytes(storageRef, file).then((snapshot) => {
        this.uploadingImage = false;
        console.log('Uploaded a blob or file!', snapshot);

        getDownloadURL(storageRef).then((url : string) => {
          this.headShotImage = url;
        });
      });
    },
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

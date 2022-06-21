<template>
  <div class="home">
    <el-row class="home-container">
      <el-col :span="8" class="home-container">
        <div class="home-container-left">
          <left-panel @getcontent="getContent"></left-panel>
        </div>
      </el-col>
      <el-col :span="16" class="home-container">
        <div class="home-container-main">
          <main-panel  :note-id="noteId" v-show="showMainPanel"></main-panel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LeftPanel from './panel/LeftPanel'
import MainPanel from './panel/MainPanel'

export default {
  name: 'Home',
  components: { LeftPanel, MainPanel },
  data() {
    return {
      noteContent: "",
      noteId: -1,
      showMainPanel: false
    }
  },
  methods: {
    getContent(noteId) {
      this.showMainPanel = true
      this.noteId = noteId;
    }
  }
}
</script>

<style scoped>
.home-container-left {
  height: 100%;
}

.home-container-main {
  height: 100%;
}
</style>>

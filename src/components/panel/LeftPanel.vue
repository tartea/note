<template>
  <div class="home-container">
    <el-row class="home-container">
      <el-col :span="12" class="home-container">
        <div class="note-folder">
          <div style="height:20%">个人信息</div>
          <div>
            <div>
              <span style="color: #7084A4;font-size: 12px;">个人笔记</span>
              <span style="color:greenyellow" @click="addNoteFolder">增加</span>
              <!-- 增加文件夹 -->
              <note-folder-dialog :folderVisible.sync="folderVisible" @updatodetree="updateNodeTree">
              </note-folder-dialog>
            </div>
            <list-component :note-data="noteFolderData" @clicknode="clickFolderNode"></list-component>
          </div>
        </div>
      </el-col>
      <!-- 笔记目录 -->
      <el-col :span="12" class="home-container">
        <div class="note-file">
          <span style="color:greenyellow" @click="addNoteFile">增加</span>
          <!-- 增加笔记 -->
          <note-file-dialog :fileVisible.sync="fileVisible" :selectedFolderId.sync="selectedFolderId"
            @updafiletree="updateFileTree"></note-file-dialog>
          <list-component :note-data="noteFileData" @clicknode="clickFileNode"></list-component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ListComponent from '../list/ListComponent.vue'
import NoteFolderDialog from '../note/NoteFolder.vue';
import NoteFileDialog from '../note/NoteFile.vue';
import axios from 'axios';
export default {
  name: "LeftPanel",
  components: { ListComponent, NoteFolderDialog, NoteFileDialog },
  data() {
    return {
      noteFolderData: [],
      noteFileData: [],
      folderVisible: false,
      fileVisible: false,
      selectedFolderId: '',
      selectedFileId: ''
    }
  },
  methods: {
    //增加文件夹
    addNoteFolder() {
      this.folderVisible = true;
    },
    //增加笔记
    addNoteFile() {
      this.fileVisible = true;
    },
    // 点击文件夹
    clickFolderNode(node) {
      if (this.selectedFolderId == node.id) {
        return;
      }
      this.selectedFolderId = node.id;
      //获取具体的笔记
      this.updateFileTree()
    },
    //获取笔记内容
    clickFileNode(note) {
      if(this.selectedFileId == note.id){
        return;
      }
      // 将笔记传给父组件
      this.$emit("getcontent", note.id)
    },
    //加载文件夹目录
    updateNodeTree() {
      const _self = this;
      axios.get('/api/queryFolderTree').then(function (response) {
        _self.noteFolderData = response.data;
      });
    },
    //加载笔记目录
    updateFileTree() {
      const _self = this;
      axios.get('/api/queryNoteFileList?folderId=' + this.selectedFolderId).then(function (response) {
        _self.noteFileData = response.data;
      });
    }
  },
  mounted() {
    this.updateNodeTree();
  }
}
</script>

<style scoped>
.note-folder {
  height: 100%;
  background: #222530;
}

.note-folder-content {
  height: 78%;
  background: #222530;
}
</style>

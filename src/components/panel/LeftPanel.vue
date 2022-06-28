<template>
  <div class="home-container">
    <el-row class="home-container">
      <el-col :span="12" class="home-container">
        <div class="note-folder">
          <div class="note-folder-info">
            <div @click="settingVisible=true">
              <img class="info-logo"
                src="https://images-1258301517.cos.ap-nanjing.myqcloud.com/images/%2F20220628110233354.png" />
            </div>
            <setting-dialog :settingVisible.sync="settingVisible"></setting-dialog>
            <div class="message-sync">同步消息</div>
          </div>
          <div class="note-folder-list">
            <div class="note-folder-list-header">
              <span>个人笔记</span>
              <span class="iconfont icon-add" @click="addNoteFolder"></span>
              <!-- 增加文件夹 -->
              <note-folder-dialog :folderVisible.sync="folderVisible" @updatodetree="updateNodeTree">
              </note-folder-dialog>
            </div>
            <list-component :note-data="noteFolderData" @clicknode="clickFolderNode">

              <template v-slot:default="slotProps">
                <div @contextmenu.prevent="folderContextMenu($event, slotProps.node)">
                  {{ slotProps.node.title }}
                </div>
              </template>
            </list-component>
          </div>
        </div>
      </el-col>
      <!-- 笔记目录 -->
      <el-col :span="12" class="home-container">
        <div class="note-file">
          <div class="note-file-header">
            <el-button type="primary" @click="addNoteFile">新建笔记</el-button>
          </div>
          <div>
            排序规则
          </div>
          <!-- 增加笔记 -->
          <note-file-dialog :fileVisible.sync="fileVisible" :selectedFolderId.sync="selectedFolderId"
            @updafiletree="updateFileTree"></note-file-dialog>

          <list-component :note-data="noteFileData" @clicknode="clickFileNode" class="note-file-list">
            <template v-slot:default="slotProps">
              <div class="note-file-content" @contextmenu.prevent="fileContextMenu($event, slotProps.node)">
                {{ slotProps.node.title }}
              </div>

            </template>
          </list-component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ListComponent from '../list/ListComponent.vue'
import NoteFolderDialog from '../dialog/NoteFolder.vue';
import NoteFileDialog from '../dialog/NoteFile.vue';
import SettingDialog from '../dialog/SettingDialog.vue';
import axios from 'axios';
export default {
  name: "LeftPanel",
  components: { ListComponent, NoteFolderDialog, NoteFileDialog, SettingDialog },
  data() {
    return {
      noteFolderData: [],
      noteFileData: [],
      folderVisible: false,
      fileVisible: false,
      settingVisible: false,
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
      if (this.selectedFileId == note.id) {
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
    },
    //文件夹右键菜单
    folderContextMenu(event, note) {
      const _self = this;
      this.$contextmenu({
        items: [
          {
            label: "删除",
            onClick: () => {
              axios.get('/api/deleteFolderTree?folderId=' + note.id).then(function (response) {
                _self.$message({
                  message: '删除成功',
                  type: 'success'
                });
                _self.updateNodeTree()
              });
            }
          },
          {
            label: "为文件夹重命名",
            onClick: () => {
              console.log("为文件夹重命名");
            }
          }
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        zIndex: 3,
        minWidth: 230
      });
      return false;
    },
    //文件右键菜单
    fileContextMenu(event, note) {
      const _self = this;
      this.$contextmenu({
        items: [
          {
            label: "删除",
            onClick: () => {
              axios.get('/api/deleteNoteFile?fileId=' + note.id).then(function (response) {
                _self.$message({
                  message: '删除成功',
                  type: 'success'
                });
                _self.updateFileTree()
              });
            }
          },
          {
            label: "重命名",
            onClick: () => {
              console.log("重命名");
            }
          },
          {
            label: "导出",
            onClick: () => {
              console.log("导出");
            }
          }
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        zIndex: 3,
        minWidth: 230
      });
      return false;
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

.note-folder .note-folder-info {
  height: 12%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 41px;
}

.note-folder .note-folder-info .message-sync {
  padding-top: 25px;
  color: white;
}

.note-folder .info-logo {
  width: 70px;
  height: 70px;
  border-radius: 100px;
  /* margin-top: 50px; */
  /* margin-left: 20px; */
}

.note-folder-list-header {
  display: flex;
  justify-content: flex-start;
  color: #7084A4;
  font-size: 18px;
  padding-left: 20px;
}

.note-folder-list-header .icon-add::before {
  font-size: 25px;
  margin-left: 70px;
}

.note-folder-list>>>.note-folder-content-list {
  margin-top: 15px;
}

.note-folder-list>>>.note-folder-content-node {
  line-height: 37px;
}


.note-folder-content {
  height: 78%;
  background: #222530;
}

.note-file {
  height: 100%;
  background: #F5F8FB;
}

.note-file-header {
  display: flex;
  justify-content: flex-end;
  padding-top: 42px;
  padding-left: 35px;
  padding-right: 21px;
}

.note-file .note-file-list {
  margin-top: 28px;
}

.note-file .note-file-list>>>.note-folder-content-node {
  border-bottom: 1px solid grey;
  line-height: 70px;
  border-radius: 6px;
}

.note-file .note-file-list>>>.note-folder-content-node-selected {
  background: #DAE6F2;
}
</style>

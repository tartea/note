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
              <note-folder-dialog :visible.sync="visible"></note-folder-dialog>
            </div>
            <list-component :note-data="noteFolderData" @clicknode="clickFolderNode"></list-component>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="home-container">
        <div class="note-file">
          <list-component :note-data="noteFileData" @clicknode="clickFileNode"></list-component>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ListComponent from '../list/ListComponent.vue'
import NoteFolderDialog from '../note/NoteFolder.vue';
import { mock, request } from '../../util/ajaxUtil';
import axios from 'axios';
export default {
  name: "LeftPanel",
  components: { ListComponent, NoteFolderDialog },
  data() {
    return {
      noteFolderData: [],
      noteFileData: [],
      visible: false

    }
  },
  methods: {
    //增加文件夹
    addNoteFolder() {
      this.visible = true;
    },
    // 点击文件夹
    clickFolderNode() {
      //获取具体的笔记
      mock('/noteFileTree.json').then(response => {
        this.noteFileData = response.data.noteFileTree
      }, response => {
        this.noteFileData = []
      });
    },

    clickFileNode() {
      //获取笔记内容
      mock('/noteContent.json').then(response => {
        this.$emit("getcontent", response.data)
      }, response => {
        this.$message({
          message: '请求失败',
          type: 'error'
        });
      });
    }
  },
  mounted() {
    //加载笔记目录
    const _self = this;
    axios.get('/api/queryFolderTree').then(function (response) {
      const res = response.data;
      if (res.success == true) {
        _self.noteFolderData = res.data;
      }
    }, response => {
      this.noteFolderData = [];
      this.$message({
        message: '请求失败',
        type: 'error'
      });
    });


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

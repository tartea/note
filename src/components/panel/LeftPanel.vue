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
import { mock, request } from '../../util/ajaxUtil';
import axios from 'axios';
export default {
  name: "LeftPanel",
  components: { ListComponent },
  data() {
    return {
      noteFolderData: [],
      noteFileData: []

    }
  },
  methods: {
    //增加文件夹
    addNoteFolder() {
      axios.post('/api/saveNoteFolder',{title:"测试"}).then(function (response) {
        console.log(response.data);
      }, response => {
        console.log("文件保存失败");
      });
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
        console.log("获取笔记失败");
      });
    }
  },
  mounted() {
    //加载笔记目录
    const _self = this;
    axios.get('/api/queryFolderTree').then(function (response) {
      const res = response.data;
      if(res.success == true){
        _self.noteFolderData = res.data;
      }
    }, response => {
      this.noteFolderData = []
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

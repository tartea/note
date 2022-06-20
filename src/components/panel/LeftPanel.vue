<template>
  <div class="home-container">
    <el-row class="home-container">
      <el-col :span="12" class="home-container">
        <div class="note-folder">
          <div style="height:20%">个人信息</div>
          <div>
            <div>
              <span style="color: #7084A4;font-size: 12px;">个人笔记</span>
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
import mock from '../../util/ajaxUtil';
export default {
  name: "LeftPanel",
  components: { ListComponent },
  data() {
    return {
      noteFolderData: [],
      noteFileData:[]

    }
  },
  methods: {
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
          this.$emit("getcontent",response.data)
        }, response => {
          console.log("获取笔记失败");
        });
    }
  },
  mounted() {
    //加载笔记目录
    mock('/noteFolderTree.json').then(response => {
      this.noteFolderData = response.data.noteFolderTree
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

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
                      <list-component :note-data="noteData" @clicknode="clickFolderNode"></list-component>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" class="home-container">
                <div class="note-file">
                   <list-component :note-data="noteData" @clicknode="clickFileNode"></list-component>
                </div>
            </el-col>
        </el-row>
  </div>
</template>

<script>
import ListComponent from '../list/ListComponent.vue'
export default {
    name:"LeftPanel",
    components:{ListComponent},
    data(){
        return {
              noteData: [{
                label: '一级 1'
              }, {
                label: '一级 2'
              }, {
                label: '一级 3'
            }],
          
        }
    },
    methods:{
      // 点击文件夹
      clickFolderNode(){
        console.log('clickFolderNode')
      },
      
      clickFileNode(){
        console.log('clickFileNode')
      }
    }
}
</script>

<style scoped>

.note-folder{
  height: 100%;
  background: #222530;
}
.note-folder-content{
  height: 78%;
  background: #222530;
}

</style>

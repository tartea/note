<template>
  <div class="home">
        <el-row class="home-container">
            <el-col :span="4" class="home-container">
                <div class="home-container-tree">第一层笔记</div>
            </el-col>
            <el-col :span="4" class="home-container">
                <div class="grid-content bg-purple-light">笔记列表</div>
            </el-col>
            <el-col :span="16" class="home-container">
                <div class="grid-content bg-purple-light">编辑页</div>
            </el-col>
        </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    
    }
  }
}
</script>

<style scoped>
.home-container{
    height: calc(97vh);
}
.home-container-tree{
    height: 100%;
    background: #222530;
}

</style>>

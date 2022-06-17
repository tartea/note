<template>
  <div class="home">
        <el-row class="home-container">
            <el-col :span="8" class="home-container">
                <div class="home-container-left">
                    <left-panel></left-panel>
                </div>
            </el-col>
            <el-col :span="16" class="home-container">
                <div class="home-container-main">
                   <main-panel></main-panel>
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
  components:{LeftPanel,MainPanel},
  data () {
    return {
    
    }
  }
}
</script>

<style scoped>

.home-container-left{
    height: 100%;
}
.home-container-main{
    height: 100%;
}

</style>>

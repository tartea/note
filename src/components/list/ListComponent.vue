<template>
  <div>
       <ul class="note-folder-content-list">
        <li v-for="(node,index) in noteData" :class="selectedNode==index?'note-folder-content-node-selected':''" 
        :key="node.id" class="note-folder-content-node" @click="handleNodeClick(node,index)">
            <slot v-bind:node="node">
              {{node.title}}
            </slot>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    name:"ListComponent",
    props: ['noteData'],
    data() {
        return {
            selectedNode: -1
        }
    },
    methods:{
         handleNodeClick(data,index) {
            this.selectedNode = index
            this.$emit('clicknode',data)
        }
    }

}
</script>

<style>
.note-folder-content-list{
  display: flex;
  flex-direction: column;
}
.note-folder-content-node{
  color: rgb(192, 210, 235);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.2rem;
  font-family: 'Open Sans', 'PingFang SC', 'Microsoft Yahei', Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
  line-height: 1.5;
}
.note-folder-content-node-selected{
  background: red;
}
.note-folder-content-node:hover{
  background: red;
}
</style>
<template>
  <div>
    <div class="note-folder-content-list">
      <div v-for="(node, index) in noteData" :class="selectedNode == index ? 'note-folder-content-node-selected' : ''"
        :key="node.id" class="note-folder-content-node" @click="handleNodeClick(node, index)">
        <slot v-bind:node="node">
          {{ node.title }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListComponent",
  props: ['noteData'],
  data() {
    return {
      selectedNode: -1
    }
  },
  methods: {
    handleNodeClick(data, index) {
      this.selectedNode = index
      this.$emit('clicknode', data)
    }
  }

}
</script>

<style>
.note-folder-content-list {
  display: flex;
  flex-direction: column;
}

.note-folder-content-node {
  color: rgb(192, 210, 235);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  line-height: 31px;
  padding-left: 46px;
  margin: 0px 6px;
}

.note-folder-content-node-selected {
  background: #5b5e68;
  border-radius: 3px;
}

.note-folder-content-node:hover {
  cursor: pointer
}
</style>
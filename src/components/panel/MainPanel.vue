<template>
  <div style="height:100%">
    <div>
      预留位置，做分享，推送博客
    </div>
    <edit-component :note-id="noteId"></edit-component>
  </div>
</template>

<script>
import EditComponent from '../md/EditComponent.vue'
export default {
  name: "MainPanel",
  props: ["noteId"],
  components: { EditComponent },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>>

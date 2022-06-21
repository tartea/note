<template>
  <div style="height:100%">
    <div>
      分享，推送博客{{ noteId }}
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

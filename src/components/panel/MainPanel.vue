<template>
  <div style="height:100%">
    <div>
      分享，推送博客
    </div>
    <edit-component :note-content="note.content"></edit-component>
  </div>
</template>

<script>
import EditComponent from '../md/EditComponent.vue'
export default {
    name:"MainPanel",
    props:["note"],
    components: {EditComponent},
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>

</style>>

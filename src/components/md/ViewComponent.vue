<template>
  <div>
    <v-md-editor :value="text" mode="preview"></v-md-editor>
  </div>
</template>

<script>
export default {
    name:"ViewComponent",
    data(){
        return {
            text:'v-md-preview'
        }
    }
}
</script>

<style>

</style>
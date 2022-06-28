<template>
    <div>
        <el-dialog title="" :visible.sync="folderVisible" :before-close="clearFormData">
            <el-form :model="form">
                <el-form-item label="新建文件夹" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addNoteFolder">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'NoteFolder',
    props: ['folderVisible'],
    data() {
        return {
            form: {
                name: ''
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        cancelAdd() {
            this.clearFormData()
        },
        addNoteFolder() {
            const _self = this;
            axios.post('/api/saveNoteFolder', this.form).then(function (response) {
                _self.$message({
                    message: '添加成功',
                    type: 'success'
                });
                _self.$emit("updatodetree")
            });
            this.clearFormData()
        },
        // 清空数据
        clearFormData() {
            this.$emit('update:folderVisible', false);
            this.form.title = ''

        }
    }
}
</script>

<style>
</style>
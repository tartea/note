<template>
    <div>
        <el-dialog title="新建笔记" :visible.sync="fileVisible" :before-close="clearFormData">
            <el-form :model="form">
                <el-form-item label="笔记名称" :label-width="formLabelWidth">
                    <el-input v-model="form.title" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="addNoteFile">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'NoteFile',
    props: ['fileVisible', 'selectedFolderId'],
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
        addNoteFile() {
            const _self = this;
            axios.post('/api/saveNoteFile', Object.assign(this.form, {folderId:this.selectedFolderId})).then(function (response) {
                _self.$message({
                    message: '添加成功',
                    type: 'success'
                });
                _self.$emit("updafiletree")
            });

            this.clearFormData()
        },
        // 清空数据
        clearFormData() {
            this.$emit('update:fileVisible', false);
            this.form.title = ''

        }
    }
}
</script>

<style>
</style>
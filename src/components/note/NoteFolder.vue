<template>
    <div>
        <el-dialog title="文件" :visible.sync="visible">
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
    props: ['visible'],
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
            this.$emit('update:visible', false);
            this.clearFormData()
        },
        addNoteFolder() {
            axios.post('/api/saveNoteFolder', this.form).then(function (response) {
                console.log(response.data);
            }, response => {
                this.$message({
                    message: '添加文件失败',
                    type: 'error'
                });
            });
            this.clearFormData()
        },
        // 清空数据
        clearFormData() {
            this.form.title = ''

        }
    }
}
</script>

<style>
</style>
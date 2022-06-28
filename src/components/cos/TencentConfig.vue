<template>
    <div>
        <el-form :model="form">
            <el-form-item label="设定SecretId" :label-width="formLabelWidth">
                <el-input v-model="form.accessKey" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="设定SecretKey" :label-width="formLabelWidth">
                <el-input v-model="form.secretKey" show-password></el-input>
            </el-form-item>
            <el-form-item label="设置存储空间名称" :label-width="formLabelWidth">
                <el-input v-model="form.bucketName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认存储区域" :label-width="formLabelWidth">
                <el-input v-model="form.regionName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="指定存储路径" :label-width="formLabelWidth">
                <el-input v-model="form.savePath" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="getCosConfig">重置</el-button>
            <el-button @click="useCos">使 用</el-button>
            <el-button type="primary" @click="saveCosConfig">确 定</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'TencentConfig',
    data() {
        return {
            form: {

            },
            cosId: '',
            formLabelWidth: '150px'
        }
    },
    methods: {
        useCos() {
            const _self = this;
            axios.get('/api/ensureUseConfig?configId='+this.cosId).then(function (response) {
                _self.$message({
                    message: '确认使用成功',
                    type: 'success'
                });
            });
        },
        saveCosConfig() {
            const _self = this;
            var param = {
                id: this.cosId,
                config: JSON.stringify(this.form)
            }
            axios.post('/api/updateCosConfig', param).then(function (response) {
                _self.$message({
                    message: '更新成功',
                    type: 'success'
                });
            });
        },
        getCosConfig() {
            const _self = this;
            axios.get('/api/getCosConfig?cosType=tencent').then(function (response) {
                _self.cosId = response.data.id;
                _self.form = JSON.parse(response.data.config)
            });
        }
    },
    mounted() {
        this.getCosConfig();
    }
}
</script>

<style>
</style>
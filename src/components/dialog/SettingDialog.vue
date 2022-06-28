<template>
    <div>
        <el-dialog title="" :visible.sync="settingVisible" :before-close="clearFormData">
            <el-tabs tab-position="left" style="height: 500px;">
                <el-tab-pane label="用户管理">用户管理</el-tab-pane>
                <el-tab-pane label="配置管理">
                    <div>
                        <el-tabs style="height: 490px;">
                            <el-tab-pane label="腾讯云">
                                <tencent-config></tencent-config>
                            </el-tab-pane>
                            <el-tab-pane label="gitee">gitee</el-tab-pane>
                        </el-tabs>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import TencentConfig from '../cos/TencentConfig.vue';
export default {
  
    name: 'SettingDialog',
    props: ['settingVisible'],
    components: { TencentConfig },
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
        // 清空数据
        clearFormData() {
            this.$emit('update:settingVisible', false);
        }
    }
}
</script>

<style>
</style>
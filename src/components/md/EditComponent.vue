<template>
    <div style="height:100%">
        <v-md-editor v-model="content" class="mark-editor"
            left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code tip | save "
            @upload-image="handleUploadImage" :disabled-menus="[]" @save="saveContent"
            :include-level="[1, 2, 3, 4, 5, 6]">

        </v-md-editor>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "EditComponent",
    props: ['noteId'],
    data() {
        //自定义工具栏插入内容
        // this.toolbar = {
        //     customToolbar1: {
        //         title: '基础工具栏',
        //         icon: 'v-md-icon-tip',
        //         action(editor) {
        //         editor.insert(function (selected) {
        //             const prefix = '(((';
        //             const suffix = ')))';
        //             const placeholder = '请输入文本';
        //             const content = selected || placeholder;

        //             return {
        //             text: `${prefix}${content}${suffix}`,
        //             selected: content,
        //             };
        //         });
        //         },
        //     }
        // };
        return {
            titles: [],
            content: ''
        }
    },
    methods: {
        // 上传图片
        handleUploadImage(event, insertImage, files) {
            // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
            if (files && files.length > 0) {
                axios.post('/api/uploadImage', { image: files[0] }, { headers: { 'Content-Type': 'multipart/form-data' } }).then(function (response) {
                    insertImage({
                        url: response.data.url,
                        desc: response.data.title,
                        width: 'auto',
                        height: 'auto'
                    });

                });

            }
        },
        handleAnchorClick(anchor) {
            const { preview } = this.$refs;
            const { lineIndex } = anchor;

            const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

            if (heading) {
                preview.scrollToTarget({
                    target: heading,
                    scrollContainer: window,
                    top: 60,
                });
            }
        },
        // 保存数据
        saveContent(text, html) {
            var note = {
                id: this.noteId,
                content: this.content
            }
            const _self = this;
            axios.post('/api/saveNoteContent', note).then(function (response) {
                _self.$message({
                    message: '保存成功',
                    type: 'success'
                });
            });
        },
        getNoteContent() {
            const _self = this;
            axios.get('/api/getNoteContent?noteId=' + this.noteId).then(function (response) {
                _self.content = response.data || ""
            });
        }
    },
    mounted() {
        // //获取导航
        // const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
        // const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());

        // if (!titles.length) {
        // this.titles = [];
        // return;
        // }

        // const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

        // this.titles = titles.map((el) => ({
        // title: el.innerText,
        // lineIndex: el.getAttribute('data-v-md-line'),
        // indent: hTags.indexOf(el.tagName),
        // }));
    },
    watch: {
        noteId: function (n, o) {
            //获取笔记内容
            this.getNoteContent();
        }
    }
}
</script>

<style>
.mark-editor {
    height: 100%;
}
</style>
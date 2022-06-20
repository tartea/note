<template>
  <div style="height:100%">
    <v-md-editor v-model="noteContent" class="mark-editor"
        left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code tip | save " 
        @upload-image="handleUploadImage" :disabled-menus="[]"
        @save="saveContent"
        :include-level="[1,2,3,4,5,6]"
        >
    
    </v-md-editor>
  </div>
</template>

<script>
export default {
    name: "EditComponent",
    props:['noteContent'],
    data(){
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
            titles: []
        }
    },
    methods:{
        // 上传图片
         handleUploadImage(event, insertImage, files) {
            // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
            console.log(files);

            // 此处只做示例
            insertImage({
                url:
                'https://images-1258301517.cos.ap-nanjing.myqcloud.com/images/202202101658880.png',
                desc: '七龙珠',
                width: 'auto',
                height: 'auto'
            });
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
        saveContent(text, html){
            console.log(text)
            console.log(html)

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
    }
}
</script>

<style>
.mark-editor{
    height: 100%;
}

</style>
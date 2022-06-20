// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入md
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

//高亮
import Prism from 'prismjs';

//ajax请求
import axios from 'axios'

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  // 扩展语法类型
  codeHighlightExtensionMap: {
    vue: 'html',
  },
  config: {
    toc: {
      includeLevel: [1, 2, 3, 4, 5, 6]
    },
  },
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  }
});
VueMarkdownEditor.use(createCopyCodePlugin());
Vue.use(ElementUI);
Vue.use(VueMarkdownEditor);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

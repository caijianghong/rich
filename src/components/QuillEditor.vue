<template>
<div>
  <el-upload v-show="false" id="quill-upload" action name="upload_file" multiple :limit="3" list-type="picture" :show-file-list="false" :file-list="fileList" :on-remove="remove" :http-request="requestFile">
    <el-button size="small" type="primary"></el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png/bpm格式图片，且不超过2MB</div>
  </el-upload>
  <el-row v-loading="uillUpdateImg">
    <quillEditor ref="myQuillEditor" @change="onEditorChange($event)" v-model="value" :options="editorOption" />
  </el-row>
</div>
</template>

<script>
import Quill from 'quill' //引入编辑器
var fonts = ['Microsoft-YaHei', 'SimSun', 'SimHei', 'KaiTi', 'Arial', 'Times-New-Roman'];
var Font = Quill.import('formats/font');
Font.whitelist = fonts; //将字体加入到白名单

import {
  quillEditor
} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: "richText",
  components: {
    quillEditor
  },
  props: ['content'], //父组件传过来的，将传过来的渲染到富文本编辑器
  data() {
    return {
      fileList: [],
      file: "",
      uillUpdateImg: false, //根据图片上传状态来确定是否显示loading动画
      serverUrl: 'https://jsonplaceholder.typicode.com/posts/', //上传的图片服务器地址
      value: this.content, //富文本内容
      editorOption: { //符文本编辑器的配置
        placeholder: '',
        theme: 'snow',
        modules: {
          toolbar: {
            container: [ // 工具栏配置, 默认是全部
              [{
                'font': fonts
              }],
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{
                header: 1
              }, {
                header: 2
              }],
              [{
                list: "ordered"
              }, {
                list: "bullet"
              }],
              [{
                indent: "-1"
              }, {
                indent: "+1"
              }],
              [{
                size: ['12px', '14px', false, '18px', '20px', '22px', '24px', '26px', '32px', '48px']
              }],
              [{
                header: [1, 2, 3, 4, 5, 6, false]
              }],
              [{
                color: []
              }, {
                background: []
              }],
              [{
                align: []
              }],
              ["clean"],
              ["image"]
            ],
            handlers: {
              'image': function (value) {
                if (value) {
                  // 给个点击触发Element-ui，input框选择图片文件
                  document.querySelector('#quill-upload input').click()
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    onEditorChange({
      quill,
      html,
      text
    }) { //富文本编辑器内容发生改变的时候
      this.value = html;
      this.$emit('textChange', html) //将富文本编辑器输入的文本发送给父组件，父组件涉及提交添加或者更改
    },
    clearHtml() {
      this.$refs.myQuillEditor.quill.setText('');
    },
    beforeUpload(file) { //上传图片之前开启loading
      let testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg === "jpg" ||
        testmsg === "JPG" ||
        testmsg === "png" ||
        testmsg === "PNG" ||
        testmsg === "bpm" ||
        testmsg === "BPM";
      if (!extension) {
        this.$message({
          message: "上传图片只能是jpg / png / bpm 格式!",
          type: "error"
        });
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过2MB");
        return false;
      }
      if (extension && isLt2M) {
        this.uillUpdateImg = false;
        return true;
      }
    },
    uploadError() { //图片上传失败,关闭loading
      this.uillUpdateImg = false
      this.$message.error('图片插入失败')
    },
    requestFile(param) {
      this.file = param.file;
      let isUpload = this.beforeUpload(this.file);
      if (!isUpload) {
        return;
      }
      let quill = this.$refs.myQuillEditor.quill
      let length = quill.getSelection().index;
      // 插入图片 response.data.url为服务器返回的图片地址
      var reader = new FileReader(); //这是核心,读取操作就是由它完成.
      reader.addEventListener("load", function () {
        quill.insertEmbed(length, 'image', reader.result);
      }, false);

      if (this.file) {
        reader.readAsDataURL(this.file);
      }
      // 调整光标到最后
      quill.setSelection(length + 1)
      this.uillUpdateImg = false;
    },
    remove() {
      this.uillUpdateImg = false
      this.file = "";
    },
    handleExceed(response, file, fileList) { //图片添加成功
      let quill = this.$refs.myQuillEditor.quill
      console.log(response)
      if (response.status === 0) {
        let length = quill.getSelection().index;
        // 插入图片 response.data.url为服务器返回的图片地址
        quill.insertEmbed(length, 'image', response.data.url)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      this.fileList = fileList
      this.uillUpdateImg = false
    },
  }
}
</script>

<style lang="scss" scoped>
.quill-editor /deep/ .ql-container {
  height: 220px;
}
</style>

<template>
<div class="tinymce-editor">
  <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick">
  </editor>
</div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'

// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/textcolor'

export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table wordcount'
    },
    toolbar: {
      type: Array,
      required: false,
      default () {
        return [
          'undo redo | formatselect | bold italic underline strikethrough subscript superscript | forecolor | backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image table | fontsizeselect | fontselect | removeformat'
        ] // 修改后 第一步
      }
    },
  },
  data() {
    return {
      init: {
        language_url: `${this.baseUrl}tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `${this.baseUrl}tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}tinymce/skins/content/default/content.css`,

        // skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide-dark`, // 暗色系
        // content_css: `${this.baseUrl}/tinymce/skins/content/dark/content.css`, // 暗色系
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        fontsize_formats: "12px 14px 18px 24px 36px", // 第二步
        font_formats: `微软雅黑=微软雅黑;宋体=宋体;黑体=黑体;仿宋=仿宋;楷体=楷体;隶书=隶书;幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,sans-serif;
            Arial Black=arial black, avant garde;`,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          let img = URL.createObjectURL(blobInfo.blob());
          success(img);
          // const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          // success(img)

          //调接口上传获取路径
          // let formData = new FormData()
          // formData.append('file', blobInfo.blob())
          // this.$api.fileUpload(formData).then(res => { 
          //   if (res.resultCode == 0) {
          //     success(res.data.fileUrl)
          //   } else {
          //     this.$message.error(res.resultMessage);
          //   }
          // });
        }
      },
      myValue: this.value
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

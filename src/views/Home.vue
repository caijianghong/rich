<template>
<div class="home">
  <RadioChange></RadioChange>
  <div class="button-box">
    <el-button @click="openDia" type="primary" size="small">Tinyme</el-button>
    <el-button @click="openDia2" type="success" size="small">quill</el-button>
    <el-button @click="openDia3" type="info" size="small">wangEditor</el-button>
  </div>

  <el-dialog title="Tinyme富文本编辑器" :visible.sync="dialogFormVisible" width="800px">
    <div>
      <tinymce-editor ref="editor" v-model="msg" :disabled="disabled" :baseUrl="baseUrl" @onClick="onClick" v-if="dialogFormVisible">
      </tinymce-editor>
      <el-button @click="keepData">保存</el-button>
    </div>
  </el-dialog>
  <el-dialog title="quill富文本编辑器" :visible.sync="dialogFormVisible2" width="800px">
    <div>
      <QuillEditor :content="quillhtml" :options="editorOption" @textChange="onEditorChange" ref="quillEdit">
      </QuillEditor>
      <el-button @click="keepData">保存</el-button>
    </div>
  </el-dialog>
  <el-dialog title="wangEditor富文本编辑器" :visible.sync="dialogFormVisible3" width="800px">
    <div>
      <WangEditor v-model="detail" :isClear="isClear" @wangeChange="wangeEChange"></WangEditor>
      <el-button @click="keepData">保存</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import WangEditor from '@/components/WangEditor.vue'
import QuillEditor from '@/components/QuillEditor.vue'
import TinymceEditor from '@/components/TinymceEditor.vue'
import RadioChange from "@/components/RadioChange.vue";
export default {
  name: "home",
  components: {
    QuillEditor,
    RadioChange,
    TinymceEditor,
    WangEditor
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      msg: '',
      disabled: false,
      baseUrl: process.env.BASE_URL,
      quillhtml: "",
      editorOption: {
        placeholder: "",
        modules: {}
      },
      isClear: false,
      detail: ""
    }
  },
  mounted() {},
  methods: {
    openDia() {
      this.dialogFormVisible = true;
    },
    openDia2() {
      this.dialogFormVisible2 = true;
    },
    openDia3() {
      this.isClear = false;
      this.dialogFormVisible3 = true;
    },
    onEditorChange(html) { //富文本编辑器  文本改变时 设置字段值
      this.quillhtml = html;
    },
    wangeEChange(val) {
      // console.log(val)
    },
    onClick(e, editor) {
      // console.log('Element clicked')
      // console.log(e)
      // console.log(editor)
    },
    keepData() {

    }
  },
  watch: {
    dialogFormVisible() {
      if (!this.dialogFormVisible) {
        this.msg = '';
      }
    },
    dialogFormVisible2() {
      if (!this.dialogFormVisible2) {
        this.$refs.quillEdit.clearHtml();
      }
    },
    dialogFormVisible3() {
      if (!this.dialogFormVisible3) {
        this.isClear = true;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.button-box {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
</style>

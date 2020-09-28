<template>
<div class="hello">
  <el-radio-group v-model="radio" size="small" @change="changeColor" text-color="#E30A0A" fill="#E30A0A">
    <el-radio label="0">正常</el-radio>
    <el-radio label="1">异常</el-radio>
  </el-radio-group>
</div>
</template>

<script>
export default {
  name: "RadioChange",
  props: {
    msg: String
  },
  data() {
    return {
      radio: "0"
    };
  },
  methods: {
    changeColor(val) {

      if (val == "0") {
        $("label.is-checked+label .el-radio__inner").css({
          "border-color": "#DCDFE6",
          'background': "#fff"
        });
        $(".el-radio__input+.el-radio__label").css({
          'color': "#409EFF"
        });
      } else if (val == "1") {
        $(".el-radio__input.is-checked+.el-radio__label").css({
          'color': "red"
        });
        $(".el-radio__input.is-checked .el-radio__inner").css({
          "border-color": "red",
          'background': "red"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-radio-group {
  margin-left: 70px;
}

.hello /deep/ .el-radio__input {
  margin-right: -110px;
}

.hello /deep/ .el-radio {
  margin-right: 70px;
}

.hello /deep/ .el-radio__label {
  margin-left: 50px;
  padding-left: 0;
}
</style>

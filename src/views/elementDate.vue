<template>
  <div class="date">
    <el-date-picker v-model="year" type="year" placeholder="选择年" @change="getYear"></el-date-picker>
  </div>
</template>
<script>
export default {
  name: "elementDate",
  data() {
    return { year: "" };
  },
  methods: {
    formatTen(num) {
      return num > 9 ? num + "" : "0" + num;
    },
    formatDate(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      // var hour = date.getHours();
      // var minute = date.getMinutes();
      // var second = date.getSeconds();
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    },
    getYear(val) {
      console.log(this.formatDate(val));
    }
  }
};
</script>

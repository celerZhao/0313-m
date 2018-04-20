<template lang="html">
  <div class="header">
    <i class="back icon-left" @click="back" v-show="showBlack"></i>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '光汇云油'
    },
    showBlack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  // watch: {
  //   '$route'(to,from) {
  //     if(to.path == '/home' || to.path == '/product' || to.path == '/find' || to.path == '/me') {
  //       this.showTip = false;
  //     }else {
  //       this.showTip = true;
  //     }
  //     this.name = to.name;
  //   }
  // }
}
</script>

<style lang="css">
</style>

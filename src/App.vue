<template>
  <div id="app">
    <keep-alive include="home,product,find,me,note">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(function() {
    })
  },
  computed: {
  }
}
</script>

<style lang="css" scoped>
#app {
  width: 100%;
  max-width: 750px;
  height: 100%;
}
.footer {
    background-color: #fff;
    border-top: 1px solid #e8e8e8;
    text-align: center;
    padding: 0.2rem 0;
}
.footer>ul {
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer>ul>li {
  flex: 1;
  /* display: flex; */
}
.footer>ul>li {
  color: #999;
}
.footer>ul>li a.active {
  color: #ff9d28;
}
.footer>ul>li i {
  font-size: 0.6rem;
}
.footer>ul>li p {
  font-size: 0.3rem;
  margin-top: 0.1rem;
}
/*隐藏滚动条的样式*/
.main::-webkit-scrollbar {
    width: 0;
    height: 0;
}

</style>

<template lang="html">
  <div class="footer">
    <ul>
      <li>
        <router-link to="/home">
          <i :class="($route.path == '/home' ? 'icon-home' : 'icon-home1')"></i>
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link to="/product">
          <i :class="($route.path == '/product' ? 'icon-oil' : 'icon-oil1')"></i>
          <p>产品</p>
        </router-link>
      </li>
      <li>
        <router-link to="/find">
          <i :class="($route.path == '/find' ? 'icon-find' : 'icon-find1')"></i>
          <p>发现</p>
        </router-link>
      </li>
      <li>
        <router-link to="/me">
          <i :class="($route.path == '/me' ? 'icon-me' : 'icon-me1')"></i>
          <p>我的</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFooter: true
    }
  },
  // watch: {
  //   '$route'(to,from) {
  //     if(to.path == '/home' || to.path == '/product' || to.path == '/find' || to.path == '/me') {
  //       this.showFooter = true;
  //     }else {
  //       this.showFooter = false;
  //     }
  //   }
  // },
  // activated() {
  //   if(this.$route.path == '/home' || this.$route.path == '/product' || this.$route.path == '/find' || this.$route.path == '/me') {
  //     this.showFooter = true;
  //   }else {
  //     this.showFooter = false;
  //   }
  // }
}
</script>

<style lang="css">
.wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #f6f6f6;
  box-sizing: border-box;
  padding: 0 0.5rem 1rem;
}
.footer {
    background-color: #fff;
    border-top: 1px solid #e8e8e8;
    text-align: center;
    padding: 0.2rem 0 0.2rem;
    /* height: 1.33rem; */
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

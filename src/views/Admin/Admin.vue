<template>
  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" >後台管理</a>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/user/products">回首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">訂單</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav> -->
  <Navbar/>
  <!-- Router View -->
   <ToastMessages/>
  <router-view/>
    <div class="bg-dark">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between text-white py-4">
        <p class="mb-0">© 2021 Mark All Rights Reserved.</p>
        <ul class="d-flex list-unstyled mb-0 h4">
          <!-- <li>
            <a href="#" class="text-white mx-3"><i class="fab fa-facebook"></i></a>
          </li>
          <li>
            <a href="#" class="text-white mx-3"><i class="fab fa-instagram"></i></a>
          </li>
          <li>
            <a href="#" class="text-white ms-3"><i class="fab fa-line"></i></a>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/NavBarAdm.vue';
import emitter from '@/assets/util/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: { ToastMessages, Navbar },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');  // 從 cookie 取出 Token
    if (token === '') {   // 檢查是否未登入
      this.$router.push('/login');
    }
    this.$http.defaults.headers.common['Authorization'] = token; // token 寫入 header
    const url = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(url, this.user)
      .then((res) => {
        // this.$httpMessageState(res, '登入');
        if (!res.data.success) {
          this.$httpMessageState(res, '登入');
          this.$router.push('/login');
        }
      });
  },
  methods: {
    logout() {
        document.cookie = `hexToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;  // clean cookie
        this.$http.defaults.headers.common['Authorization'] = '';  // clean header's token
        this.$router.push('/login');
    },
  }

}
</script>

<style lang="scss">
.pagination > li > a,
.pagination > li > span {
    color: rgb(1, 5, 1); // use your own color here
}

.pagination > .active > a,
.pagination > .active > a:focus,
.pagination > .active > a:hover,
.pagination > .active > span,
.pagination > .active > span:focus,
.pagination > .active > span:hover {
    background-color: rgb(1, 5, 1);
    border-color: rgb(1, 5, 1);
}

.page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: rgb(1, 5, 1); //your color
    border-color: rgb(1, 5, 1); //your color
}
</style>


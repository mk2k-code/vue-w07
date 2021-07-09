<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
            <router-link class="nav-link" to="/admin/coupons">優惠券</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
// import emitter from '@/assets/util/emitter';

export default {
  data() {
    return {
    };
  },
  methods: {
    logout() {
        document.cookie = `hexToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;  // clean cookie
        this.$http.defaults.headers.common['Authorization'] = '';  // clean header's token
        this.$router.push('/login');
    },
  },
  mounted() {
  },
};
</script>

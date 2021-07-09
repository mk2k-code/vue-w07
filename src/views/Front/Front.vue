 <!-- <template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" >前台客戶</a>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/user/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/cart">購物車</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    <Navbar/>
  <ToastMessages/>
  <router-view/>
</template> -->

<template>
  <Navbar/>
  <ToastMessages/>
  <!-- <router-view/> -->
  <div style="height: 15vh">
    <!-- <div class="position-absolute" style="top:0; right:0; left:0; bottom:0; background-image: url(https://images.unsplash.com/photo-1598867388068-a9e7b49de06d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80);background-position: center center; opacity: 0.6;"></div> -->
    <!-- <div class="position-absolute" style="top:0; right:0; left:0; bottom:0;
         background-image: url(https://images.unsplash.com/photo-1598867388068-a9e7b49de06d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80);
         background-position: no-repeat center center fixed;
         background-size: cover;
         height: 100%;
         overflow: hidden;
         opacity: 0.1;">
    </div> -->
  </div>

  <!-- <router-view/> -->

  <div id="main"></div>
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
import Navbar from '@/components/NavBarUsr01.vue';
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
  },
  methods: {
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

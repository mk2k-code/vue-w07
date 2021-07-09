<template>
  <div class="fixed-top" id="navbar-top" :class="classList.navbarTop">
    <div class="container">
      <nav class="navbar px-0 navbar-expand-lg navbar-light"
           :class="classList.navbarInner">
        <!-- <a class="navbar-brand position-absolute"
           href="./index.html"
           style="left: 50%; transform: translate(-50%, -50%); top: 50%;">
           Navbar
        </a> -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" ></span>
        </button>
        <div class="collapse navbar-collapse custom-header-md-open" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active" >
              <router-link class="nav-link" to="/user/products"><b>產品列表</b></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/user/cart"><b>購物車</b></router-link>
              <!-- <a class="nav-link" href="./detail.html">購物車</a> -->
            </li>
          </ul>
        </div>
        <div class="d-flex position-relative">
          <a href="#"><i class="fas fa-heart me-3"></i></a>
          <router-link  to="/user/cart">
            <i class="bi bi-cart-fill"
               :class="classList.navbarCart"
               style="font-size: 1.75rem;"></i>
          </router-link>
          <!-- <a href="./cart-2.html">
            <i class="bi bi-cart-fill "
               :class="classList.navbarCart"
               style="font-size: 1.5rem;"></i>
          </a> -->
          <div
            class="rounded-pill  top-0 start-100 bg-danger text-white position-absolute px-2">
            {{ cart?.carts?.length }}
          </div>
            <!-- <div
            class="rounded-pill bg-danger text-white position-absolute px-2"
            style="right: -12px; top: -4px;">
            {{ cart?.carts?.length }}
          </div> -->
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import emitter from '@/assets/util/emitter';

export default {
  data() {
    return {
      cart: {},
      classList: {
        navbarTop: '',
        navbarInner: '',
        navbarCart: '',
      },
    };
  },
  methods: {
    getShoppingCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          // console.log('購物車:', res);
          if (res.data.success) {
            this.cart = res.data.data;
          } else {
            alert(res.data.message);
          }
        }).catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.classList = {
      navbarTop: '',
      navbarInner: 'navbar-light',
      navbarCart: 'text-dark',
    };
    this.getShoppingCart();
    emitter.on('update-cart', () => {
      this.getShoppingCart();
    });
    window.addEventListener('scroll', () => {
      const windowY = window.scrollY;

      const main = document.querySelector('#main');

      if (windowY > main.offsetTop) {
        this.classList = {
          navbarTop: 'bg-dark',
          navbarInner: 'navbar-dark',
          navbarCart: 'text-white',
        };
      } else {
        this.classList = {
          navbarTop: '',
          navbarInner: 'navbar-light',
          navbarCart: 'text-dark',
        };
      }
    });
  },
};
</script>

<style scoped>
#navbar-top {
  transition: .5s background-color;
}
</style>

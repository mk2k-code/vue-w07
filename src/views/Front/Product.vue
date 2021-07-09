<template>
  <Loading :active="isLoading" :z-index="8888"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <!-- <a @click="$router.back()">回產品列表</a> -->
        <li class="breadcrumb-item"><router-link to="/user/products">回產品列表</router-link></li>
        <!-- <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li> -->
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ product.title }}</h2>
        <div>產品描述:{{ product.description }}</div>
        <img :src="product.imageUrl" class="img-fluid mb-3">
        <div>產品內容:{{ product.content }}</div>
        <div v-for="item in product.imagesUrl" :key="item.id">
          <img :src="item" class="img-fluid mt-4">
        </div>
      </article>
      <div class="col-4">
        <div class="h5" v-if="!product.price">{{ $filters.currency(product.origin_price) }} 元</div>
        <del class="h6" v-if="product.price">原價 {{ $filters.currency(product.origin_price) }} 元</del>
        <div class="h5" v-if="product.price">現在只要 {{ $filters.currency(product.price) }} 元</div>
        <hr>
        <button type="button" class="btn btn-outline-danger"
                @click="addToCart(product.id)">
                加到24d購物車
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      product: {},
      id: '',
    };
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.isLoading = true;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data.product);
            this.product = res.data.product;
          }
          this.isLoading = false;
        }).catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart })
        .then((res) => {
          this.isLoading = false;
          this.$httpMessageState(res, '加入購物車');
          // this.$router.push('/user/cart');
          this.$router.back(-1);
        }).catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
  created() {
    // console.log(this.$route);
    // console.log(this.$router.params);
    this.id = this.$route.params.productId;
    this.getProduct();
  },
};
</script>

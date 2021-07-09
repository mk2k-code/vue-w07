<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="8888"></Loading>
    <div class="mt-4">
      <!-- 產品列表 -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                   :style="{ backgroundImage: `url(${item.imageUrl})` }">
            </div>
            </td>
            <td>{{item.title}}</td>
            <td>{{ $filters.currency(item.price) }}</td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary"
                        @click="getProduct(item.id)">
                        查看內容
                </button>
                <button type="button" class="btn btn-outline-danger"
                        @click="addToCart(item.id)">
                        加入24d購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 分頁元件 -->
      <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
      <!-- 分頁元件 -->

      <!-- 購物車列表 -->
      <!-- <div class="text-end">
        <button class="btn btn-outline-danger" type="button"
                @click="delShoppingCarts">
                清空購物車
        </button>
      </div>

      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm"
                        @click="delCartItem(item.id)">
                        <i class="fas fa-spinner fa-pulse"></i>
                        x
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <input min="1" type="number"
                           @change="updateShoppingCart(item)"
                           v-model.number="item.qty" class="form-control">
                    <span class="input-group-text" id="basic-addon2">
                          {{ item.product.unit }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                {{ $filters.currency(item.final_total) }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ $filters.currency(cart.total) }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">套用優惠碼總計</td>
            <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
          </tr>
        </tfoot>
      </table>

      <div class="input-group mb-3 input-group-sm">
        <input type="text"
               class="form-control"
               v-model="coupon_code"
               placeholder="請輸入優惠碼"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary"
                  type="button"
                  @click="addCoupon">
                  套用優惠碼
          </button>
        </div>
      </div> -->
      <!-- 購物車列表 -->

    </div>

    <!-- ShoppingCartForm -->
    <!-- <div class="my-5 row justify-content-center">
      <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field id="email" name="email" type="email" class="form-control"
                 :class="{ 'is-invalid': errors['email'] }"
                 placeholder="請輸入 Email" rules="email|required"
                 v-model="form.user.email">
          </Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field id="name" name="姓名" type="text" class="form-control"
                 :class="{ 'is-invalid': errors['姓名'] }"
                 placeholder="請輸入姓名" rules="required"
                 v-model="form.user.name">
          </Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field id="tel" name="電話" type="text" class="form-control"
                 :class="{ 'is-invalid': errors['電話'] }"
                 placeholder="請輸入電話" rules="required|min:8|max:10"
                 v-model="form.user.tel">
          </Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field id="address" name="地址" type="text" class="form-control"
                 :class="{ 'is-invalid': errors['地址'] }"
                 placeholder="請輸入地址" rules="required"
                 v-model="form.user.address">
          </Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="" id="message" class="form-control" cols="30" rows="10"
                    v-model="form.message">
          </textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
    </div> -->
    <!-- ShoppingCartForm -->

    <!-- <UserProdModal ref="userProdModal" :product="product" @add-to-cart="addToCart"/> -->

  </div>
</template>

<script>
import emitter from '@/assets/util/emitter';
// import UserProdModal from '@/components/UserProdModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      isLoading: false, // 讀取效果 2
      products: [], // 產品列表
      product: {}, // props 傳遞到內層"userProdModal"的暫存資料
      form: { // 表單結構
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {},
      pagination: {},
      currentPage: 1,
      coupon_code: '',
    };
  },
  components: {
    // UserProdModal,
    Pagination,
  },
  computed: {
    page() {
      console.log(this.$router.params);
      return this.$router.params.page;
    },
  },
  methods: {
    getProducts(page = 1) {
      this.currentPage = page;
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      // console.log(url);
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data.products);
            // this.$httpMessageState(res, `第${ this.currentPage }頁載入`);
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          } else {
            // alert(res.data.message);
            this.$httpMessageState(res, '取得產品項目');
          }
          this.isLoading = false;
        }).catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    // getProduct(item) {
    //   this.isLoading = true;
    //   // this.loadingStatus.loadingItem = item.id;

    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${item.id}`;
    //   this.$http.get(url)
    //     .then((res) => {
    //       if (res.data.success) {
    //         this.$httpMessageState(res, '取得單項產品');
    //         // 取完資料再打開 openModal()
    //         this.product = res.data.product;
    //         // this.$http 結束時清空 loadingStatus.loadingItem
    //         // this.loadingStatus.loadingItem = '';
    //         this.isLoading = false;
    //         this.$refs.userProdModal.openModal();
    //       } else {
    //         // alert(res.data.message);
    //        this.$httpMessageState(res, '取得單項產品');
    //       }
    //     }).catch((err) => {
    //       console.log(err);
    //     });
    // },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
      // console.log(this.currentPage);
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.post(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            // alert(res.data.message);
            this.$httpMessageState(res, '加入購物車');
            // this.$refs.userProdModal.hideModal();
            this.getProducts(this.currentPage);
            this.getShoppingCart();
          } else {
            // alert(res.data.message);
            this.$httpMessageState(res, '加入購物車');
          }
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    // 取得購物車資料
    getShoppingCart() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            this.cart = res.data.data;
            // this.$httpMessageState(res, '取得購物車資料');
            emitter.emit('update-cart');
          } else {
            // alert(res.data.message);
            this.$httpMessageState(res, '取得購物車資料');
          }
          this.isLoading = false;
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    // 更新單筆數量 carts.id
    updateShoppingCart(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product.id, // 產品ID
        qty: item.qty,
      };
      this.$http.put(url, { data: cart })
        .then((res) => {
          if (res.data.success) {
            // this.getProducts(this.currentPage);
            this.$httpMessageState(res, '更新單筆數量');
            this.getShoppingCart();
          } else {
            // alert(res.data.message);
            this.$httpMessageState(res, '更新單筆數量');
          }
          this.isLoading = false;
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    addCoupon() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(url, { data: coupon })
        .then((res) => {
          this.$httpMessageState(res, '加入優惠券');
          this.getShoppingCart();
          this.isLoading = false;
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    // 送出訂單
    createOrder() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order })
        .then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, '送出訂單');
            this.$refs.form.resetForm();
            this.$router.push(`/user/checkout/${res.data.orderId}`);
          } else {
            this.$httpMessageState(res, '送出訂單');
          }
          this.isLoading = false;
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    // 清空購物車
    delShoppingCarts() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            // alert(res.data.message);
            this.$httpMessageState(res, '清空購物車');
            this.getShoppingCart();
          } else {
            // alert(res.data.message);
            this.$httpMessageState(res, '清空購物車');
          }
          this.isLoading = false;
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    // 刪除單項
    delCartItem(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, '刪除單項');
            this.getShoppingCart();
          } else {
            this.$httpMessageState(res, '刪除單項');;
          }
          this.isLoading = false;
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
  },
  created() {
    // this.$refs.userProdModal.getProduct();
    this.getProducts();
    this.getShoppingCart();
  },
};
</script>

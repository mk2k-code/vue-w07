<template>
    <div id="app">
      <Loading :active="isLoading" :z-index="8888"></Loading>
      <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-dark" @click="openModal('new')">建立新產品</button>
          <!-- <button class="btn btn-danger" @click="openModal('logout')">登出</button> -->
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th width="240">產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>
                {{ $filters.currency(item.origin_price) }}
              </td>
              <td>
                {{ $filters.currency(item.price) }}
              </td>
              <td>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`prodSwitch${item.id}`"
                    :true-value="1"
                    :false-value="0"
                    v-model="item.is_enabled"
                    @change="update(item)"/>
                  <label class="form-check-label" :for="`prodSwitch${item.id}`">
                    <span v-if="item.is_enabled === 1">啟用</span>
                    <span v-else>未啟用</span>
                  </label>
                </div>
                <!-- <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span> -->
              </td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-outline-dark btn-sm"
                          @click="openModal('edit', item)">編輯
                  </button>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          @click="openModal('delete', item)">刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ProdModal :product="tempProduct" :isNew="isNew" @update-product="updateProduct"
                 ref="prodModal"/>
      <DelModal :item="tempProduct" @del-item="delProduct" ref="delModal"/>
      <pagination :pages="pagination" @emit-pages="getProducts"/>
      <!-- Modal -->
  </div>
</template>

<script>
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/Pagination.vue';
import ProdModal from '@/components/ProdModal.vue';

export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,  // 新增/編輯
      isLoading: false,
      pagination: {},
      // modal: {
      //   editModal: '',
      //   delModal: '',
      // },
      currentPage: 1,
    }
  },
  components: { ProdModal, DelModal, Pagination },
  // inject: ['emitter'],
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      console.log(url);
      this.isLoading = true;
      this.$http.get(url)
        .then((res) => {
          if (res.data.success) {
            // this.$httpMessageState(res, `第${ this.currentPage }頁載入`);
            const { products, pagination } = res.data;
            this.products = products;
            this.pagination = pagination;
            this.isLoading = false;
          } else {
            alert(res.data.message);
            this.$httpMessageState(res, `第${ this.currentPage }頁載入`);
            this.isLoading = false;
          }
        }).catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    openModal(editMod, item) {
      // editMod: new / edit / delete
      if (editMod === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.prodModal.showModal();
      } else if (editMod === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.prodModal.showModal();
      } else if (editMod === 'delete') {
        this.tempProduct = { ...item };
        this.$refs.delModal.showModal();
      }
    },
    update(item) {
      this.tempProduct = { ...item };
      this.updateProduct(this.tempProduct);
    },
    updateProduct() {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;  // new
      let httpMethod = 'post';
      let state = '新增產品';

      if (!this.isNew) {  // update
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
        state = '更新產品';
      }
      this.$http[httpMethod](url, { data: this.tempProduct })
        .then((res) => {
          if(res.data.success) {
            // alert(res.data.message);
            this.$httpMessageState(res, state);
            this.$refs.prodModal.hideModal();
            this.getProducts(this.currentPage);
            this.isLoading = false;
          } else {
            // alert(res.data.message);
            this.$httpMessageState(res, state);
            this.isLoading = false;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    delProduct() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, '刪除產品');
            this.$refs.delModal.hideModal();
            this.getProducts(this.currentPage);
            this.isLoading = false;
          } else {
            // alert(res.data.message);
            this.$httpMessageState(res);
            this.isLoading = false;
          }
        }).catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
}
</script>

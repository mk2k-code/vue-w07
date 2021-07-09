<template>
  <Loading :active="isLoading" :z-index="8888"></Loading>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
        <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ $filters.currency(item.total) }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${item.id}`"
                v-model="item.is_paid"
                @change="updatePaid(item)"/>
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal('edit', item)">檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openModal('delete', item)">刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal :order="tempOrder" @update-paid="updatePaid" ref="orderModal"/>
  <DelModal :item="tempOrder" @del-item="delOrder" ref="delModal"/>
  <Pagination :pages="pagination" @emitPages="getOrders"/>
</template>

<script>
import OrderModal from '@/components/OrderModal.vue';
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      orders: {},
      isNew: false,
      isLoading: false,
      tempOrder: {},
      pagination: {},
      currentPage: 1,
    };
  },
  components: { OrderModal, DelModal, Pagination },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        }).catch((err) => {
          console.log(err);
        });
    },
    // openModal(item) {
    //   this.tempOrder = { ...item };
    //   this.isNew = false;
    //   this.$refs.orderModal.showModal();
    // },
    // orderDelModal(item) {
    //   this.tempOrder = { ...item };
    //   this.$refs.delModal.showModal();
    // },
    openModal(editMod, item) {
      // editMod: new / edit / delete
      if (editMod === 'new') {
        this.isNew = true;
        this.$refs.orderModal.showModal();
      } else if (editMod === 'edit') {
        this.isNew = false;
        this.tempOrder = { ...item };
        this.$refs.orderModal.showModal();
      } else if (editMod === 'delete') {
        this.tempOrder = { ...item };
        this.$refs.delModal.showModal();
      }
    },
    updatePaid(item) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      const paid = {
        is_paid: item.is_paid,
      };
      this.$http.put(url, { data: paid })
        .then((res) => {
          this.isLoading = false;
          this.$refs.orderModal.hideModal();
          this.getOrders(this.currentPage);
          this.$httpMessageState(res, '更新付款狀態');
        }).catch((err) => {
          console.log(err);
        });
    },
    delOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.isLoading = true;
      this.$http.delete(url)
        .then(() => {
          this.$refs.delModal.hideModal();
          this.getOrders(this.currentPage);
          this.$httpMessageState(res, '刪除一筆訂單');
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>


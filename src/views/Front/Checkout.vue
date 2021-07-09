<template>
  <Loading :active="isLoading" :z-index="8888"></Loading>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="Pay">
      <h4 class="panel-title clearfix">
          <span><b>我的購買清單：</b></span>
      </h4>
      <table class="table align-middle">
        <thead>
        <th>品名</th>
        <th>數量</th>
        <th class="text-end">單價</th>
        </thead>
        <tbody>
        <tr v-for="item in order.products" :key="item.id">
          <td>{{ item.product.title }}</td>
          <td>{{ item.qty }}/{{ item.product.unit }}</td>
          <!-- <td>{{ item.final_total }}</td> -->
          <td class="text-end">{{ $filters.currency(item.final_total) }}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="2" class="text-end">總計</td>
          <td class="text-end">{{ $filters.currency(order.total) }}</td>
        </tr>
        </tfoot>
      </table>
      <br/><br/><br/>

      <h4 class="panel-title clearfix">
          <span><b>我的寄送資訊：</b></span>
      </h4>

      <table class="table">
        <tbody>
        <tr>
          <th width="100">Email</th>
          <td>{{ order.user.email }}</td>
        </tr>
        <tr>
          <th>姓名</th>
          <td>{{ order.user.name }}</td>
        </tr>
        <tr>
          <th>收件人電話</th>
          <td>{{ order.user.tel }}</td>
        </tr>
        <tr>
          <th>收件人地址</th>
          <td>{{ order.user.address }}</td>
        </tr>
        <tr>
          <th>付款狀態</th>
          <td>
            <span v-if="!order.is_paid">尚未付款</span>
            <span v-else class="text-success">付款完成</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
import emitter from '@/assets/util/emitter';

export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
    };
  },
  methods: {
    getOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.isLoading = true;
      this.$http.get(url)
        .then((res) => {
          this.order = res.data.order;
          this.isLoading = false;
          this.$httpMessageState(res, '取得訂單');
          emitter.emit('update-cart');
        }).catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    Pay() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.isLoading = true;
      this.$http.post(url)
        .then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, '付款');
            this.getOrder();
          } else {
            this.$httpMessageState(res, '付款');
          }
          this.isLoading = false;
        }).catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    // createOrder() {
    //   this.isLoading = true;
    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
    //   const order = this.form;
    //   this.$http.post(url, { data: order })
    //     .then((res) => {
    //       if (res.data.success) {
    //         this.$httpMessageState(res, '送出訂單');
    //         this.$refs.form.resetForm();
    //         this.$router.push(`/user/checkout/${res.data.orderId}`);
    //       } else {
    //         this.$httpMessageState(res, '送出訂單');
    //       }
    //       this.isLoading = false;
    //     }).catch((err) => {
    //       this.isLoading = false;
    //       console.log(err);
    //     });
    // },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>

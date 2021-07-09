<template>
  <div>
    <Loading :active="isLoading" :z-index="8888"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal('new', item)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>優惠碼</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ item.code }}</td>
        <td>{{ $filters.date(item.due_date) }}</td>
        <td>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              :id="`couponSwitch${item.id}`"
              :true-value="1"
              :false-value="0"
              v-model="item.is_enabled"
              @change="update(item)"/>
            <label class="form-check-label" :for="`couponSwitch${item.id}`">
              <span v-if="item.is_enabled === 1">啟用</span>
              <span v-else>未啟用</span>
            </label>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
                    @click="openModal('edit', item)"
            >編輯</button>
            <button class="btn btn-outline-danger btn-sm"
                    @click="openModal('delete', item)"
            >刪除</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <CouponModal :coupon="tempCoupon" :is-new="isNew" @update-coupon="updateCoupon"
                 ref="couponModal"/>
    <DelModal :item="tempCoupon" @del-item="delCoupon" ref="delModal"/>
    <Pagination :pages="pagination" @emitPages="getCoupons"/>
  </div>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/Pagination.vue';

// function pushMessageState(res, title = '更新') {
//   if (res.data.success) {
//     this.emitter.emit('push-message', {
//       style: 'success',
//       title: `${title}成功`,
//     });
//   } else {
//     this.emitter.emit('push-message', {
//       style: 'danger',
//       title: `${title}失敗`,
//       content: res.data.message.join('、'),
//     });
//   }
// }

export default {
  components: { CouponModal, DelModal, Pagination },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      isLoading: false,
      isNew: false,
      pagination: {},
      currentPage: 1,
    };
  },
  methods: {
    openModal(editMod, item) {
      // editMod: new / edit / delete
      if (editMod === 'new') {
        this.tempCoupon = {
          due_date: (new Date().getTime()/1000 + 864000)
        };
        this.isNew = true;
        this.$refs.couponModal.showModal();
      } else if (editMod === 'edit') {
        this.isNew = false;
        this.tempCoupon = { ...item };
        this.$refs.couponModal.showModal();
      } else if (editMod === 'delete') {
        this.tempCoupon = { ...item };
        this.$refs.delModal.showModal();
      }
    },
    getCoupons(page = 1 ) {
      this.isLoading = true;
      this.currentPage = page;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`;
      this.$http.get(url)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        }).catch((err) => {
          console.log(err);
        });
    },
    update(item) {
      this.tempCoupon = { ...item };
      this.updateCoupon(this.tempCoupon);
    },
    updateCoupon() {
      this.isLoading = true;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;  // new
      let httpMethod = 'post';
      let state = '新增優惠券';

      if (!this.isNew) {  // update
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        httpMethod = 'put';
        state = '更新優惠券';
      }
      this.$http[httpMethod](url, { data: this.tempCoupon })
        .then((res) => {
          if(res.data.success) {
            this.$httpMessageState(res, state);
            this.$refs.couponModal.hideModal();
            this.getCoupons(this.currentPage);
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
    delCoupon() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.isLoading = true;
      this.$http.delete(url)
        .then((res) => {
          if (res.data.success) {
            this.$httpMessageState(res, '刪除優惠券');
            this.$refs.delModal.hideModal();
            this.isLoading = false;
            this.getCoupons(this.currentPage);
          } else {
            this.$httpMessageState(res, '刪除優惠券');
            this.isLoading = false;
          }
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

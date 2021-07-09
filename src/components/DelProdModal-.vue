<template>
  <div
    class="modal fade"
    id="delProdModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content border-1">
        <div class="modal-header bg-danger text-white text-center">
          <h4 id="delProdModalLabel" class="modal-title w-100">刪除產品</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">是否刪除
          <strong class="text-danger">{{ item.title }}</strong>商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-outline-danger btn-sm" @click="delProduct">確認刪除</button>
          <!-- <button type="button" class="btn btn-outline-danger btn-sm" @click="$emit('del-item')">確認刪除</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Modal from 'bootstrap/js/dist/modal';
import modalMixin from '@/mixins/modalMixin';

export default {
  props: {
    item: {},
    // item: {
    //   type: Object,
    //   default() {
    //     return {
    //     }
    //   }
    // }
  },
  data() {
    return {
      modal: null,
    };
  },
  emits: ['del-item'],
  mixins: [modalMixin],
  mounted() {
    // this.modal = new Modal(this.$refs.modal);
    // this.modal = new Modal(this.$refs.modal, {
    // keyboard: false,
    // backdrop: 'static'
    // });
  },
  methods: {
    // delProduct() {
    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.item.id}`;
    //   this.$http.delete(url)
    //     .then((res) => {
    //       if (res.data.success) {
    //         alert(res.data.message);
    //         this.modal.hide();
    //         this.$emit('update');
    //       } else {
    //         alert(res.data.message);
    //       }
    //     }).catch((err) => {
    //       console.log(err);
    //     });
    // },
    // openModal() {
    //   this.modal.show();
    // },
    // hideModal() {
    //   this.modal.hide();
    // },
  },
}

</script>

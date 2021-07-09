<template>
  <ToastMessages/>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="login">
      <div class="col-md-3">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
            <div class="mb-2">
              <label for="inputEmail" class="sr-only">Email address</label>
              <input
                type="email"
                v-model="user.username"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                required
                autofocus/>
            </div>
            <div class=" mb-2">
              <label for="inputPassword" class="sr-only">Password</label>
              <input
                type="password"
                v-model="user.password"
                class="form-control"
                id="password"
                placeholder="Password"
                required/>
            </div>
            <div class="text-end mt-4">
              <button class="btn btn-lg btn-primary btn-block w-100 mt-3" type="submit">
                登入
              </button>
            </div>
      </div>
    </form>
  </div>
</template>

<script>
import emitter from '@/assets/util/emitter';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: { ToastMessages },
  provide() {
    return {
      emitter,
    };
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    login() {
      const loginApi = `${process.env.VUE_APP_API}admin/signin`; // login URL
      this.$http
        .post(loginApi, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`; // add cookie to browser
            this.$router.push('/admin/products');
          } else {
            // alert(res.data.message + '\n' + '請檢查帳號與密碼是否正確!!');
            this.$httpMessageState(res, '請檢查帳號與密碼是否正確，登入');
            this.$router.push('/login');
          }
        })
        .catch((err) => {
          console.log(err);
          this.$router.push('/login');
        });
    },
  },
};
</script>

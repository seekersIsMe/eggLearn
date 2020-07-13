<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
       <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
       <el-input v-model="form.psw"></el-input>
    </el-form-item>
     <el-form-item label="验证码">
       <el-input v-model="form.code"></el-input>
        <el-image v-show="codePicSrc" :src="codePicSrc" @click="refreshCode"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        psw: '',
        code: ''
      },
      codePicSrc: '/api/user/getCode',
    }
  },
  methods: {
    login() {

    },
     refreshCode() {
      this.codePicSrc = '/api/user/getCode?_t=' + new Date().getTime()
    }
  },
}
</script>

<style>
.el-form{
  width: 300px;
}
</style>
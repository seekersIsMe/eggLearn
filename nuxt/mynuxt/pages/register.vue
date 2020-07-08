<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="邮箱">
       <el-input v-model="form.email"></el-input>
       <el-button type="primary" :disabled="disabled" @click.native.prevent="getEmailCode">获取邮箱验证码</el-button>
    </el-form-item>
    <el-form-item label="邮箱验证码">
       <el-input v-model="form.emailCode"></el-input>
    </el-form-item>
    <el-form-item label="用户名">
       <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
       <el-input v-model="form.psw" placeholder="请设置密码"></el-input>
    </el-form-item>
    <el-form-item label="重新输入密码">
       <el-input v-model="form.repsw"></el-input>
    </el-form-item>
     <el-form-item label="图片验证码">
       <el-input v-model="form.code"></el-input>
       <el-image v-show="codePicSrc" :src="codePicSrc" @click="refreshCode"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '1213344190@qq.com',
        name: Math.random().toString().slice(2,8),
        psw: '123456',
        repsw: '123456',
        code: '',
        emailCode: '',
      },
      codePicSrc: '/api/user/getCode',
      disabled: false
    }
  },
  methods: {
    register() {
      let params = {
        email: this.form.email,
        name: this.form.name,
        psw: this.form.psw,
        code: this.form.code,
        emailCode: this.form.emailCode
      }
      this.$axios.post('/user/register', {
        params
      }, res => {

        })
    },
    getEmailCode(s) {
      console.log(this)
      // debugger
      let result =  this.$axios.get('/user/getEmailCode',{
        params: {
          email: this.form.email
        }
      },res =>{
        console.log(res)
      })
      // this.disabled = result.code === 1
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
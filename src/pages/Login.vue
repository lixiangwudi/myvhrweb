<template>
    <div class="loginContains">
      <el-form :rules="rules"
               :model="loginForm"
               v-loading="loading"
               element-loading-text="正在登陆中..."
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)"
               ref="loginForm">
        <h3 class="loginTitle">系统登录</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="false" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="false" placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
        </el-form-item>
       <el-checkbox v-model="checked" class="loginRemeber"></el-checkbox>
        <el-button type="primary" style="width: 100%;" @click="submitLogin()">登录</el-button>
      </el-form>
    </div>
</template>

<script>
  import {postKeyValueRequest} from "../utils/api";
  export default {
      name: "login",
      data() {
        return {
          loading:false,
          rules: {
            username: [{required: true, message: "请输入用户名", trigger: 'blur'}],
            password: [{required: true, message: "请输入密码", trigger: 'blur'}]
          },
          loginForm: {
            username: 'admin',
            password: '123'
          },
          checked: true,
        }
      },
      methods: {
        submitLogin() {
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
              this.loading = true;
              this.postKeyValueRequest('/doLogin',this.loginForm).then(resp =>{
                this.loading = false;
                if(resp){
                  window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
                  let path=this.$route.query.redirect;

                  this.$router.replace((path =='/'||path ==undefined)?'/home':path);
                }
              })
            } else {
              this.$message.error("请将账号密码填写完整")
            }
          })
        }
      }
    }
</script>

<style>
  .loginContains{
    border-radius: 15px;
    /*background-clip: padding-box;*/
    margin:180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .loginTitle{
    margin: 10px auto 20px auto;
    text-align: center;
    color: #505458;
  }
  .loginRemeber{
    text-align: left;
    margin: 0px 0px 15px 0px;
  }

</style>

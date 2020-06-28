<template>
    <div>
      <el-container>
        <el-header class="home-header"><div class="title">微人事</div>
        <el-dropdown class="userinfo" @command="handleCommand">
        <span class="el-dropdown-link">
          {{user.name}}<i ><img :src="user.userface"/></i>
        </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="userinfo">個人中心</el-dropdown-item>
                  <el-dropdown-item command="setting">設置</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                </el-dropdown-menu>
        </el-dropdown>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu  router unique-opened>
              <el-submenu :index="index+''" v-for="(item,index) in routers" v-if="!item.hidden" :key="index">
                <template slot="title">
                  <i :class="item.iconcls" style="color: #409eff;"></i>
                  <span style="margin-left:5px">{{item.name}}</span>
                </template>
                <el-menu-item-group :index="child.path" v-for="(child,index1) in item.children" :key="index1">
                  <el-menu-item :index="child.path" :key="index">{{child.name}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="border-content" v-if="this.$router.currentRoute.path == '/home'">
              欢迎来到微人事
            </div>
            <router-view class="RouterView"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "home.vue",
        data(){
            return {
              user:JSON.parse(window.sessionStorage.getItem('user'))
            }
        },
      computed:{
          routers(){
            return this.$store.state.routers;
          }
      },
      methods:{
        handleCommand(cmd){
          console.log(cmd)
          if(cmd == 'logout'){
            this.$confirm('此操作将注销登录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.getRequest('/logout');
              window.sessionStorage.removeItem('user');
              this.$store.commit('initRoutes',[]);
              this.$router.replace('/')
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
          }
        },
      }
    }
</script>

<style scoped>
  .home-header{
    background-color: #409aef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    box-sizing: border-box;
  }

  .home-header .title{
    font-size: 30px;
    color: #f1fafa;
  }

  .home-header .userinfo{
    cursor: pointer;
  }
  .el-dropdown-link img{
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-left:8px ;
  }
  .el-dropdown-link{
    display: flex;
    align-items: center;
  }
  .border-content{
    text-align: center;
    font-size: 30px;
    font-family: 华为行楷;
    color: aqua;
    margin-top:150px;
  }
  .RouterView{
    margin-top: 10px;
  }
</style>

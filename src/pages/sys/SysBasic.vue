<template>
    <div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="部门管理" name="first"><DepMana></DepMana></el-tab-pane>
        <el-tab-pane label="职位管理" name="second"><PosMana></PosMana></el-tab-pane>
        <el-tab-pane label="职称管理" name="third"><JobLevelMana></JobLevelMana></el-tab-pane>
        <el-tab-pane label="奖惩管理" name="fourth"><EcMana></EcMana></el-tab-pane>
        <el-tab-pane label="权限设置" name="five"><PermissionMana></PermissionMana></el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import DepMana from '../../components/sys/basic/DepMana'
  import EcMana from '../../components/sys/basic/EcMana'
  import JobLevelMana from '../../components/sys/basic/JobLevelMana'
  import PermissionMana from '../../components/sys/basic/PermissionMana'
  import PosMana from '../../components/sys/basic/PosMana'
    export default {
        name: "sys-basic",
        data(){
          return{
            activeName:'second',
          }
        },
        components:{
          DepMana, EcMana,JobLevelMana,PermissionMana,PosMana
        }
    }
</script>

<style scoped>

</style>

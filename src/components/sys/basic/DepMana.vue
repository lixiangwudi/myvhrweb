<template>
      <div style="width: 500px;">
        <el-input size="small"   prefix-icon="el-icon-search" v-model="filterText"
                  placeholder="请输入部门名称进行查询..."></el-input>
        <el-tree
          :data="depts"
          :props="defaultProps"
          accordion
          ref="tree"
          style="margin-top: 8px"
          :filter-node-method="filterNode"
          :expand-on-click-node="false">
           <span class="custom-tree-node" style="display: flex;justify-content: space-between;width:100%;" slot-scope="{ node, data }">
            <span>{{ data.name }}</span>
            <span>
              <el-button size="mini" type="primary" class="depbtn" @click="addDept(data)">添加部门</el-button>
              <el-button size="mini" type="danger"  class="depbtn" @click="deleteDep(data)">删除部门</el-button>
            </span>
          </span>
        </el-tree>

        <el-dialog
          title="添加部门"
          :visible.sync="dialogVisible"
          width="30%">
          <div>
            <table>
              <tr>
                <td>
                  <el-tag>上级部门</el-tag>
                </td>
                <td>{{pname}}</td>
              </tr>
              <tr>
                <td>
                  <el-tag>部门名称</el-tag>
                </td>
                <td>
                  <el-input v-model="dep.name" placeholder="请输入部门名称..." @keydown.enter.native="doAddDep(dep)"></el-input>
                </td>
              </tr>
            </table>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddDep(dep)">确 定</el-button>
  </span>
        </el-dialog>
      </div>
</template>

<script>
    export default {
        name: "depmana",
        data(){
          return{
            depts: [],
            pname:'',
            filterText:'',
            dep: {
              name: '',
              parentId: -1
            },
            dialogVisible:false,
            defaultProps: {
              children: 'children',
              label: 'name'
            }
          }
        },
        mounted() {
          this.initDeps();
        },
        watch:{
            filterText(val){
              this.$refs.tree.filter(val);
            }
          },
        methods:{
          initDeps(){
              this.getRequest("/system/basic/department/").then(resp=>{
                if(resp){
                  this.depts = resp;
                }
              })
          },
          addDept(data){
            this.pname = data.name;
            this.dep.parentId = data.id;
            this.dialogVisible = true;
          },
            deleteDep(data) {
            console.log(data)
              if (data.isparent) {
                this.$message.error("父部门删除失败");
              } else {
                this.$confirm('此操作将永久删除【' + data.name + '】部门, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.deleteRequest("/system/basic/department/"+data.id).then(resp=>{
                    if (resp) {
                      this.initDeps();
                    }
                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });
                });
              }
            },
          doAddDep(data){
              if(data.name){
                this.putRequest("/system/basic/department/",this.dep).then(resp =>{
                  if(resp){
                    this.dep.name = '';
                    this.dialogVisible = false;
                    this.initDeps();
                  }
                })
              }
          },
          filterNode(value, data) {
            console.log(data)
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
          }
        }
    }
</script>

<style scoped>
  .depbtn{
    padding: 2px;
  }
</style>

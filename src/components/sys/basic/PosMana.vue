<template>
    <div>
      <div>
        <el-input
          size="small"
          style="width: 300px;margin-right: 8px;margin-bottom: 10px"
          placeholder="请输入职位"
          prefix-icon="el-icon-plus"
          @keydown.enter.native="addPosition"
          v-model="pos.name">
        </el-input>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addPosition">添加</el-button>
      </div>
      <div>
        <el-table
          :data="positions"
          border
          size="small"
          stripe
          @selection-change="handleSelectionChange"
          style="width: 70%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="职位"
            width="180">
          </el-table-column>
          <el-table-column
            prop="createDate"
            width="180"
            label="创建时间">
          </el-table-column>
          <el-table-column
            label="是否启用">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
              <el-tag type="danger" v-else>未启用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="danger" :disabled="multipositions.length==0" style="margin-top: 8px" size="small" @click="multiDelete">批量删除</el-button>
      </div>
      <el-dialog
        title="修改职位"
        :visible.sync="updateposVisible"
        width="30%"
        >
      <div>
        <el-tag>职位名称</el-tag>
        <el-input class="updatePosInput" size="small" v-model="updatePos.name" @keydown.enter.native="doUpdate"></el-input>
      </div>
        <div>
          <el-tag>是否启用</el-tag>
          <el-switch
            v-model="updatePos.enabled"
            active-text="启用"
            inactive-text="禁用">
          </el-switch>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="updateposVisible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "pos-mana",
        data(){
          return{
            pos:{
              name:''
            },
            multipositions:[],
            updatePos:{
              name:'',
              enabled:false,
            },
            updateposVisible:false,
            positions:[],
          }
        },
      methods:{
        initPositions(){
          this.getRequest("/system/basic/pos/").then(resp =>{
            if(resp){
              this.positions = resp;
            }
          })
        },
        handleEdit(index,data){
          Object.assign(this.updatePos,data);
          this.updateposVisible=true;
        },
        handleDelete(index,data){
          this.$confirm('此操作将永久删除【'+data.name+'】, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRequest("/system/basic/pos/"+data.id).then(resp=>{
              if(resp){
                this.initPositions();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        doUpdate(){
          this.putRequest("/system/basic/pos/",this.updatePos).then(resp=>{
            if(resp){
              this.updateposVisible=false;
              this.updatePos.name = '';
              this.initPositions();
            }
          })
        },
        addPosition(){
          if(this.pos.name && this.pos.name.trim()!= ''){
            this.postRequest("/system/basic/pos/",this.pos).then(resp =>{
              if(resp){
                this.pos.name = '';
                this.initPositions();
              }
            })
          }else{
            this.$message.error("职位名称不能为空");
          }
        },
        handleSelectionChange(data){
          this.multipositions = data;
        },
        multiDelete(){
          this.$confirm('此操作将永久删除这些数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRequest("/system/basic/pos/many",this.multipositions).then(resp=>{
              if(resp){
                this.initPositions();
                console.log(this.multipositions )
                this.multipositions = [];
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
      mounted(){
          this.initPositions();
      }
    }
</script>

<style scoped>
  .updatePosInput{
    width: 200px;
    margin-left: 10px;
  }
</style>

<template>
    <div>
      <div style="display: flex;justify-content: space-between">
        <div>
          <el-input placeholder="通过员工名搜索员工,回车查询" @keydown.enter.native="initemps" @clear="initemps" clearable v-model="keyword" prefix-icon="el-icon-search" style="width:350px;margin-right:10px"></el-input>
          <el-button icon="el-icon-search" type="primary" @click="initemps">搜索</el-button>
          <el-button type="primary"><i class="fa fa-angle-double-down" style="margin-right:3px"></i>高级搜索</el-button>
        </div>
        <div>
          <el-button type="success"><i class="fa fa-level-up" style="margin-right:3px"></i>导入数据</el-button>
          <el-button type="success" @click="exportData"><i class="fa fa-level-down" style="margin-right:3px"></i>导出数据</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
        </div>
      </div>
      <div>
        <div style="margin-top: 10px">
          <el-table
            :data="emps"
            stripe
            border
            @selection-change="handleSelectionChange"
            v-loading="loading"
            element-loading-text="正在加载..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              fixed
              align="left"
              label="姓名"
              width="90">
            </el-table-column>
            <el-table-column
              prop="workID"
              label="工号"
              align="left"
              width="85">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别"
              align="left"
              width="85">
            </el-table-column>
            <el-table-column
              prop="birthday"
              width="95"
              align="left"
              label="出生日期">
            </el-table-column>
            <el-table-column
              prop="idCard"
              width="150"
              align="left"
              label="身份证号码">
            </el-table-column>
            <el-table-column
              prop="wedlock"
              width="70"
              label="婚姻状况">
            </el-table-column>
            <el-table-column
              prop="nation.name"
              width="50"
              label="民族">
            </el-table-column>
            <el-table-column
              prop="nativePlace"
              width="80"
              label="籍贯">
            </el-table-column>
            <el-table-column
              prop="politicsstatus.name"
              label="政治面貌">
            </el-table-column>
            <el-table-column
              prop="email"
              width="180"
              align="left"
              label="电子邮件">
            </el-table-column>
            <el-table-column
              prop="phone"
              width="100"
              align="left"
              label="电话号码">
            </el-table-column>
            <el-table-column
              prop="address"
              width="220"
              align="left"
              label="联系地址">
            </el-table-column>
            <el-table-column
              prop="department.name"
              width="100"
              align="left"
              label="所属部门">
            </el-table-column>
            <el-table-column
              prop="position.name"
              width="100"
              label="职位">
            </el-table-column>
            <el-table-column
              prop="jobLevel.name"
              width="100"
              label="职称">
            </el-table-column>
            <el-table-column
              prop="engageForm"
              width="100"
              align="left"
              label="聘用形式">
            </el-table-column>
            <el-table-column
              prop="tiptopDegree"
              width="80"
              align="left"
              label="最高学历">
            </el-table-column>
            <el-table-column
              prop="specialty"
              width="150"
              align="left"
              label="专业">
            </el-table-column>
            <el-table-column
              prop="school"
              width="150"
              align="left"
              label="毕业院校">
            </el-table-column>
            <el-table-column
              prop="beginDate"
              width="95"
              align="left"
              label="入职日期">
            </el-table-column>
            <el-table-column
              prop="conversionTime"
              width="95"
              align="left"
              label="转正日期">
            </el-table-column>
            <el-table-column
              prop="beginContract"
              width="95"
              align="left"
              label="合同起始日期">
            </el-table-column>
            <el-table-column
              prop="endContract"
              width="95"
              align="left"
              label="合同截止日期">
            </el-table-column>
            <el-table-column
              width="100"
              align="left"
              label="合同期限">
              <template slot-scope="scope">
                <el-tag>{{scope.row.contractTerm}}</el-tag>
                年
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              width="200"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="showEditEmpView(scope.row)" style="padding: 3px" size="mini">编辑</el-button>
                <el-button style="padding: 3px" size="mini" type="primary">查看高级资料</el-button>
                <el-button @click="deleteEmp(scope.row)" style="padding: 3px" size="mini" type="danger">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="justify-content:space-between;display: flex">
            <el-button type="danger" size="mini" @click="batchDelete">批量删除</el-button>
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page.sync="page"
            layout="sizes, prev, pager, next, jumper, ->, total, slot"
            :total="total">
          </el-pagination>
          </div>
        </div>
      </div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="80%">
        <div>
          <el-form :model="emp" :rules="rules" ref="emp">
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓名:" prop="name">
                  <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.name"
                            placeholder="请输入员工姓名"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="性别:" prop="gender">
                  <el-radio-group v-model="emp.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出生日期:" prop="birthday">
                  <el-date-picker
                    v-model="emp.birthday"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 150px;"
                    placeholder="出生日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="政治面貌:" prop="politicId">
                  <el-select v-model="emp.politicId" placeholder="政治面貌" size="mini" style="width: 200px;">
                    <el-option
                      v-for="item in politicsstatus"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="民族:" prop="nationId">
                  <el-select v-model="emp.nationId" placeholder="民族" size="mini" style="width: 150px;">
                    <el-option
                      v-for="item in nations"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="籍贯:" prop="nativePlace">
                  <el-input size="mini" style="width: 120px" prefix-icon="el-icon-edit"
                            v-model="emp.nativePlace" placeholder="请输入籍贯"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电子邮箱:" prop="email">
                  <el-input size="mini" style="width: 150px" prefix-icon="el-icon-message"
                            v-model="emp.email" placeholder="请输入电子邮箱"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="联系地址:" prop="address">
                  <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                            v-model="emp.address" placeholder="请输入联系地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="职位:" prop="posId">
                  <el-select v-model="emp.posId" placeholder="职位" size="mini" style="width: 150px;">
                    <el-option
                      v-for="item in positions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="职称:" prop="jobLevelId">
                  <el-select v-model="emp.jobLevelId" placeholder="职称" size="mini" style="width: 150px;">
                    <el-option
                      v-for="item in joblevels"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属部门:" prop="departmentId">
                  <el-popover
                    placement="right"
                    title="所属部门"
                    width="200"
                    v-model="popVisible"
                    trigger="manual">
                    <el-tree default-expand-all :data="depts" :props="defaultProps"
                             @node-click="handleNodeClick"></el-tree>
                    <div slot="reference"
                         style="width: 150px;display: inline-flex;font-size: 13px;border: 1px solid #dedede;height: 26px;border-radius: 5px;cursor: pointer;align-items: center;padding-left: 8px;box-sizing: border-box"
                         @click="showDepView">{{inputDepName}}
                    </div>
                  </el-popover>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="电话号码:" prop="phone">
                  <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                            v-model="emp.phone" placeholder="电话号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="工号:" prop="workID">
                  <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                            v-model="emp.workID" placeholder="工号" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="学历:" prop="tiptopDegree">
                  <el-select v-model="emp.tiptopDegree" placeholder="学历" size="mini"
                             style="width: 150px;">
                    <el-option
                      v-for="item in tiptopDegrees"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="毕业院校:" prop="school">
                  <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                            v-model="emp.school" placeholder="毕业院校名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="专业名称:" prop="specialty">
                  <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                            v-model="emp.specialty" placeholder="请输入专业名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="入职日期:" prop="beginDate">
                  <el-date-picker
                    v-model="emp.beginDate"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 130px;"
                    placeholder="入职日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="转正日期:" prop="conversionTime">
                  <el-date-picker
                    v-model="emp.conversionTime"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 130px;"
                    placeholder="转正日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同起始日期:" prop="beginContract">
                  <el-date-picker
                    v-model="emp.beginContract"
                    size="mini"
                    :picker-options="pickerOptionsStart"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 130px;"
                    @change="changeEnd"
                    placeholder="合同起始日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="合同终止日期:" prop="endContract">
                  <el-date-picker
                    v-model="emp.endContract"
                    :picker-options="pickerOptionsEnd"
                    size="mini"
                    type="date"
                    @change="changeStart"
                    value-format="yyyy-MM-dd"
                    style="width: 150px;"
                    placeholder="合同终止日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="身份证号码:" prop="idCard">
                  <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                            v-model="emp.idCard" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="聘用形式:" prop="engageForm">
                  <el-radio-group v-model="emp.engageForm">
                    <el-radio label="劳动合同">劳动合同</el-radio>
                    <el-radio label="劳务合同">劳务合同</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="婚姻状况:" prop="wedlock">
                  <el-radio-group v-model="emp.wedlock">
                    <el-radio label="已婚">已婚</el-radio>
                    <el-radio label="未婚">未婚</el-radio>
                    <el-radio label="离异">离异</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addEmp">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>


  export default {
        name: "emp-basic",
        data(){
          var validatePass = (rule, value, callback) => {
            if (value === 'hanhan') {
              callback(new Error('你真的是个憨憨'));
            }else{
              callback();
            }
          };
          return {
            loading:false,
            inputDepName:'',
            emps:[],
            total:0,
            page:1,
            size:10,
            keyword:'',
            pickerOptionsStart:{},
            selectedData:[],
            pickerOptionsEnd:{},
            dialogVisible:false,
            popVisible:false,
            nations: [],
            joblevels: [],
            depts:[],
            title:'',
            politicsstatus: [],
            positions: [],
            tiptopDegrees: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他'],
            defaultProps: {
              children: 'children',
              label: 'name'
            },
            emp: {
              name: "javaboy",
              gender: "男",
              birthday: "1989-12-31",
              idCard: "610122199001011256",
              wedlock: "已婚",
              nationId: 1,
              nativePlace: "陕西",
              politicId: 13,
              email: "laowang@qq.com",
              phone: "18565558897",
              address: "深圳市南山区",
              departmentId: null,
              jobLevelId: 9,
              posId: 29,
              engageForm: "劳务合同",
              tiptopDegree: "本科",
              specialty: "信息管理与信息系统",
              school: "深圳大学",
              beginDate: "2017-12-31",
              workState: "在职",
              workID: "00000057",
              contractTerm: 2,
              conversionTime: "2018-03-31",
              notworkDate: null,
              beginContract: "2017-12-31",
              endContract: "2019-12-31",
              workAge: null
            },
            rules: {
              name: [{required: true, message: '请输入用户名', trigger: 'blur'}, {validator: validatePass, trigger: 'blur'}],
              gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
              birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
              idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
                pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                message: '身份证号码格式不正确',
                trigger: 'blur'
              }],
              wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
              nationId: [{required: true, message: '请输入您组', trigger: 'blur'}],
              nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
              politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
              email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
                type: 'email',
                message: '邮箱格式不正确',
                trigger: 'blur'
              }],
              phone: [{required: true, message: '请输入电话号码', trigger: 'blur'},{
                pattern: /^1[34578]\d{9}$/,
                message: '电话号码格式不正确',
                trigger: 'blur'
              }],
              address: [{required: true, message: '请输入员工地址', trigger: 'blur'}],
              departmentId: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
              jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur'}],
              posId: [{required: true, message: '请输入职位', trigger: 'blur'}],
              engageForm: [{required: true, message: '请输入聘用形式', trigger: 'blur'}],
              tiptopDegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
              specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
              school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
              beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
              workState: [{required: true, message: '请输入工作状态', trigger: 'blur'}],
              workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
              contractTerm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
              conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
              notworkDate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
              beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
              endContract: [{required: true, message: '请输入合同结束日期', trigger: 'blur'}],
              workAge: [{required: true, message: '请输入工龄', trigger: 'blur'}],
            }
          }
        },
      mounted() {
          this.initemps();
          this.initData();
          this.initPositions();
      },
      methods:{
        addEmp(){
          if(!this.emp.id){
          console.log("添加新员工");
          this.$refs['emp'].validate(valid => {
            if(valid){
              this.postRequest("/employee/basic/",this.emp).then(resp => {
                  if (resp){
                    this.dialogVisible = false;
                    this.initemps();
                  }
                }
              )
            }else {
              this.$message.error("请将信息填写完整")}
          })
          }else{
            this.$refs['emp'].validate(valid => {
              if(valid){
                this.putRequest("/employee/basic/",this.emp).then(resp => {
                    if (resp){
                      this.dialogVisible = false;
                      this.initemps();
                    }
                  }
                )
              }else {
                this.$message.error("请将信息填写完整")}
            })
          }
        },
        deleteEmp(data){
          this.$confirm('此操作将永久删除' + data.name + ', 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteRequest("/employee/basic/"+data.id).then(resp=>{
              if(resp){
                this.initemps();
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        exportData() {
          window.open('/employee/basic/export', '_parent');
        },
        showEditEmpView(data){
          this.emp = data;
          this.title = '编辑员工信息';
          this.dialogVisible = true;
          this.inputDepName = data.department.name;
          console.log(data.id)
        },
        batchDelete(){
          console.log(this.selectedData);
          if(this.selectedData.length >0){
          this.$confirm('此操作将永久删除' + this.selectedData.length + '条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let url= "/employee/basic/?";
            this.selectedData.forEach(item =>{
              url += 'ids=' + item.id + '&';
            })
            this.deleteRequest(url).then(resp=>{
              if(resp){
                this.selectedData = [];
                this.initemps();
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
        handleSelectionChange(data){
          this.selectedData = data;
        },
        changeStart() {
          if (!this.emp.endContract) {
            this.pickerOptionsStart = {
              disabledDate: {}
            }
            return
          }
          this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
            // 可通过箭头函数的方式访问到this
            disabledDate: (time) => {
              var times = ''
              times = time.getTime() > Date.parse(this.emp.endContract);
               return times
            }
          })
        },
        // 开始时间 控制结束时间
        changeEnd() {
          if (!this.emp.beginContract) {
            this.pickerOptionsEnd = {
              disabledDate: {}
            }
            return
          }
          this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
            disabledDate: (time) => {
              return time.getTime() < (Date.parse(this.emp.beginContract) - 1 * 24 *60 *60 * 1000 )
            }
          })
        },
        showDepView() {
          this.popVisible = !this.popVisible
        },
        handleNodeClick(data) {
          this.inputDepName = data.name;
          this.emp.departmentId = data.id;
          this.popVisible = !this.popVisible
        },
        sizeChange(currentSize){
          this.size = currentSize;
          this.initemps();
        },
        currentChange(currentPage){
          this.page = currentPage;
          this.initemps();
        },
          initemps(){
            this.loading = true;
            this.getRequest("/employee/basic/?page="+this.page+"&size="+this.size+'&keyword='+this.keyword).then(resp=>{
              this.loading = false;
              if(resp){
                this.emps = resp.data;
                this.total=resp.total;
              }
            })
          },
        initPositions() {
          this.getRequest('/employee/basic/positions').then(resp => {
            if (resp) {
              this.positions = resp;
            }
          })
        },
        showAddEmpView(){
          this.dialogVisible = true;
          this.title = "添加员工";
          this.getMaxWorkId();
          this.emptyEmp();
        },
        getMaxWorkId(){
          this.getRequest('employee/basic/maxWorkId').then(resp=>{
            if(resp){
              this.emp.workID = resp.obj;
              console.log(this.emp.workID)
            }
          })
        },
        emptyEmp() {
          this.emp = {
            name: "",
            gender: "",
            birthday: "",
            idCard: "",
            wedlock: "",
            nationId: 1,
            nativePlace: "",
            politicId: 13,
            email: "",
            phone: "",
            address: "",
            departmentId: null,
            jobLevelId: 9,
            posId: 29,
            engageForm: "",
            tiptopDegree: "",
            specialty: "",
            school: "",
            beginDate: "",
            workID: "",
            contractTerm: 2,
            conversionTime: "",
            notworkDate: null,
            beginContract: "",
            endContract: "",
            workAge: null
          }
          this.inputDepName = '';
        },
        initData() {
          if (!window.sessionStorage.getItem("nations")) {
            this.getRequest('/employee/basic/nations').then(resp => {
              if (resp) {
                this.nations = resp;
                window.sessionStorage.setItem("nations", JSON.stringify(resp));
              }
            })
          } else {
            this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
          }
          if (!window.sessionStorage.getItem("joblevels")) {
            this.getRequest('/employee/basic/joblevels').then(resp => {
              if (resp) {
                this.joblevels = resp;
                window.sessionStorage.setItem("joblevels", JSON.stringify(resp));
              }
            })
          } else {
            this.joblevels = JSON.parse(window.sessionStorage.getItem("joblevels"));
          }
          if (!window.sessionStorage.getItem("politicsstatus")) {
            this.getRequest('/employee/basic/politicsstatus').then(resp => {
              if (resp) {
                this.politicsstatus = resp;
                window.sessionStorage.setItem("politicsstatus", JSON.stringify(resp));
              }
            })
          } else {
            this.politicsstatus = JSON.parse(window.sessionStorage.getItem("politicsstatus"));
          }
          if (!window.sessionStorage.getItem("depts")) {
            this.getRequest('/system/basic/department/').then(resp => {
              if (resp) {
                this.depts = resp;
                window.sessionStorage.setItem("depts", JSON.stringify(resp));
              }
            })
          } else {
            this.depts = JSON.parse(window.sessionStorage.getItem("depts"));
          }
        },
      }
    }
</script>

<style scoped>

</style>

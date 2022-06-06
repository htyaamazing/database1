<template>
  <div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>工资管理</el-breadcrumb-item>
            <el-breadcrumb-item>计算项目管理</el-breadcrumb-item>
          </el-breadcrumb>
          <!--卡片视图 -->
          <el-card class="card">
            <!--搜索与添加区 -->
            <el-row :gutter="20">
              <el-col :span="5"><el-input placeholder="请输入员工id" v-model="searchParams.employeeId" ></el-input></el-col>
              <el-col :span="5"><el-select v-model="searchParams.employeeName" placeholder="请选择员工">
                <el-option
                  v-for="item in tableData"
                  :key="item"
                  :label="item.employeeName"
                  :value="item.employeeName">
                </el-option>
              </el-select></el-col>
              <el-col :span="3"><el-input placeholder="最小值" v-model="searchParams.minValue" ></el-input></el-col>
              <el-col :span="3"><el-input placeholder="最大值" v-model="searchParams.maxValue" ></el-input></el-col>
              <el-col :span="3"><el-button icon="el-icon-search" @click="clearListSearch"></el-button></el-col>
              <el-col :span="3"><el-button size="small" type="danger" @click="dialogVisible = true">生成计算项目</el-button></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 4px; margin-bottom: 4px" >
              <el-date-picker
                v-model="searchParams.startDate"
                type="month"
                placeholder="选择起始月"  style="width: 196px">
              </el-date-picker>
              <el-date-picker
                v-model="searchParams.endDate"
                type="month"
                placeholder="选择终止月"  style="width: 196px">
              </el-date-picker>
            </el-row>
            <el-table :data="tableData">
              <el-table-column type="index">
              </el-table-column>
              <el-table-column label="员工id" prop="employeeId">
              </el-table-column>
              <el-table-column label="员工姓名" prop="employeeName">
              </el-table-column>
              <el-table-column label="部门id" prop="departmentId">
              </el-table-column>
              <el-table-column label="部门名" prop="departmentName">
              </el-table-column>
              <el-table-column label="岗位id" prop="stationId">
              </el-table-column>
              <el-table-column label="岗位" prop="stationName">
              </el-table-column>
              <el-table-column label="项目名" prop="itemName">
              </el-table-column>
              <el-table-column label="数值" prop="value">
              </el-table-column>
              <el-table-column label="月份" prop="date">
              </el-table-column>
              <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                  <el-button size="small" type="danger" @click="Edit(scope.row.id)">修改</el-button>
                  <el-button  size="small" class="delete" type="danger" @click="Delete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
    <!--面包屑导航区 -->
    <el-dialog
      title="生成新的计算项目"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span><el-input v-model="addParams.employeeId" placeholder="请输入员工id"></el-input>
      <el-input v-model="addParams.date" placeholder="请输入月份"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="enter()">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="修改岗位"
      :visible.sync="editDialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" label-width="80px" >
        <el-form-item label="修改数值">
          <el-input v-model="editParams.value"></el-input>
        </el-form-item>
        <el-form-item label="修改月份">
          <el-input v-model="editParams.date"></el-input>
        </el-form-item>
      </el-form>
      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click=editEnter()>确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      editDialogVisible: false,
      dialogVisible: false,
      deleteParams: {
        id: null
      },
      addParams: {
        date: null,
        employeeId: null
      },
      editParams: {
        id: null,
        value: null,
        date: null
      },
      searchParams: {
        employeeId: null,
        stationName: null,
        employeeName: null,
        minValue: null,
        maxValue: null,
        startDate: null,
        endDate: null
      },
      tableData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      const _this = this
      _this.$http.post('/api/salary/calculateItem/selectByCondition', this.searchParams).then(
        function (res1) {
          console.log('--------******--------')
          console.log(res1.data.data.data)
          _this.tableData = res1.data.data.data
        }
      )
    },
    clearListSearch () {
      this.loadCategories()
    },
    async loadCategories () {
      console.log(this.searchParams)
      const _this = this
      const response = await _this.$http.post('/api/salary/calculateItem/selectByCondition', this.searchParams)
      console.log(response)
      this.tableData = response.data.data.data
      _this.getList()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    enter () {
      this.dialogVisible = false
      console.log(this.addParams)
      const _this = this
      const response = _this.$http.post('api/salary/calculateItem/calculateOneEmployee', this.addParams)
      console.log(response)
      _this.getList()
    },
    Edit (id) {
      this.editDialogVisible = true
      this.editParams.id = id
    },
    editEnter () {
      this.editDialogVisible = false
      console.log(this.editParams)
      const _this = this
      const response = _this.$http.post('/api/salary/calculateItem/changeRecord', this.editParams)
      console.log(response)
      _this.getList()
    },
    Delete (id) {
      console.log(id)
      this.deleteParams.id = id
      console.log(this.deleteParams)
      const _this = this
      _this.$http.post('/api/salary/calculateItem/deleteRecord', this.deleteParams).then(
        function (res1) {
          console.log(res1.data.success)
          if (res1.data.success === true) {
            console.log('删除成功')
          } else {
          }
          _this.getList()
        }
      )
    }
  }
}

</script>

<style lang="less" scoped>
  .el-breadcrumb{
    margin-bottom: 15px;
    font-size: 12px;}
  .el-card{
    box-shadow: 0 1px 1px rgba(0,0,0,0.15) !important;
  }

</style>

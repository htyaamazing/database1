<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区域-->
    <el-card >
      <!--      搜索与添加区域-->
      <el-row :gutter="2">
        <el-col :span="5">
          <el-input placeholder="请输入员工名字" v-model="peopleSerch">
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="请输入部门名字" v-model="departmentSerch">
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-input placeholder="请输入岗位名字" v-model="stationSerch">
            <el-button slot="append" icon="el-icon-search" @click="getDetail"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getIdList">
            添加员工
          </el-button>
        </el-col>
      </el-row>

      <!--      用户列表区域-->
      <el-table :data="userList"  border stripe @row-click="handdle" >-->
        <!--        索引列的设置-->
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="id"
          label="id"
          width="180"
        >
        </el-table-column>

        <el-table-column
          prop="name"
          label="名字"
          width="180">
        </el-table-column>

        <el-table-column
          prop="sex"
          label="性别"
          width="180">
        </el-table-column>

        <el-table-column
          prop="departmentName"
          label="所在部门"
          width="180">
        </el-table-column>

        <el-table-column
          prop="stationName"
          label="所在岗位"
          width="180">
        </el-table-column>

        <el-table-column
          prop="employDate"
          label="入职日期"
          width="180">
        </el-table-column>

        <el-table-column
          prop="idcard"
          label="身份证"
          width="180">
        </el-table-column>

        <el-table-column
          prop="folk"
          label="民族"
          width="180">
        </el-table-column>

        <el-table-column
          prop="phone"
          label="电话"
          width="180">
        </el-table-column>

        <el-table-column
          prop="email"
          label="电邮"
          width="180">
        </el-table-column>

        <el-table-column
          prop="status"
          label="婚姻状况"
          width="180">
        </el-table-column>

        <el-table-column
          prop="seat"
          label="所在地"
          width="180">
        </el-table-column>

        <el-table-column
          prop="eduBack"
          label="最高学历"
          width="180">
        </el-table-column>

        <el-table-column
          prop="graSchool"
          label="毕业院校"
          width="180">
        </el-table-column>

        <el-table-column
          prop="speciality"
          label="所学专业"
          width="180">
        </el-table-column>

        <el-table-column
          prop="date"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="handleEdit(scope.row.id)">修改</el-button>
            <el-button  size="small" class="delete" type="danger" @click="handleDelete( scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--    新增员工对话框-->
    <el-dialog
      title="添加员工"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @close=" closeForm">
      <el-form ref="form"  label-width="80px" >
        <el-form-item label="姓名" prop="out.department">
          <el-input v-model="out.name"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form"  label-width="80px" >
        <el-form-item label="性别" prop="out.department">
          <el-input v-model="out.sex"></el-input>
        </el-form-item>
      </el-form>

      <el-form label="部门名称">
        <el-select v-model="out.departmentName" placeholder="选择部门">
          <el-option v-for="item in idList" :label="item.name" :value="item.name" :key="item"></el-option>
        </el-select>
      </el-form>
      <div>

      </div>
      <el-select v-model="out.stationName" placeholder="选择岗位">
        <el-option v-for="item in iIdList" :label="item.name" :value="item.name" :key="item"></el-option>
      </el-select>

      <el-form ref="form"  label-width="80px" >
        <el-form-item label="入职日期" prop="out.department">
          <el-input v-model="out.employDate"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form"  label-width="80px" >
        <el-form-item label="身份证" prop="out.department">
          <el-input v-model="out.idcard"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form"  label-width="80px" >
        <el-form-item label="电话" prop="out.department">
          <el-input v-model="out.phone"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form"  label-width="80px" >
        <el-form-item label="电邮" prop="out.department">
          <el-input v-model="out.email"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form"  label-width="80px" >
        <el-form-item label="婚姻状况" prop="out.department">
          <el-input v-model="out.status"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form"  label-width="80px" >
        <el-form-item label="所在地" prop="out.department">
          <el-input v-model="out.seat"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form"  label-width="80px" >
        <el-form-item label="最高学历" prop="out.department">
          <el-input v-model="out.eduBack"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form"  label-width="80px" >
        <el-form-item label="毕业院校" prop="out.department">
          <el-input v-model="out.graSchool"></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="form"  label-width="80px" >
        <el-form-item label="所学专业" prop="out.department">
          <el-input v-model="out.speciality"></el-input>
        </el-form-item>
      </el-form>

      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
    <el-button @click=clearFormS>取 消</el-button>
    <el-button type="primary" @click=clearForm>确 定</el-button>
  </span>
    </el-dialog>
    <!--    修改员工信息对话框-->
    <el-dialog
      title="修改员工信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close=" closeForm">
      <el-form ref="form" label-width="80px" >
        <el-form-item label="员工名字">
          <el-input v-model="station.name"/>
        </el-form-item>
      </el-form>

      <el-form ref="form" label-width="80px" >
        <el-form-item label="部门">
          <el-input v-model="station.departmentName"/>
        </el-form-item>
      </el-form>

      <el-form ref="form" label-width="80px" >
        <el-form-item label="岗位">
          <el-input v-model="station.stationName"/>
        </el-form-item>
      </el-form>

      <el-form ref="form" label-width="80px" >
        <el-form-item label="入职日期">
          <el-input v-model="station.employDate"/>
        </el-form-item>

        <el-form ref="form" label-width="80px" >
          <el-form-item label="电话">
            <el-input v-model="station.phone"/>
          </el-form-item>
        </el-form>

        <el-form ref="form" label-width="80px" >
          <el-form-item label="电邮">
            <el-input v-model="station.email"/>
          </el-form-item>
        </el-form>

        <el-form ref="form" label-width="80px" >
          <el-form-item label="婚姻状况">
            <el-input v-model="station.status"/>
          </el-form-item>
        </el-form>

        <el-form ref="form" label-width="80px" >
          <el-form-item label="所在地">
            <el-input v-model="station.seat"/>
          </el-form-item>
        </el-form>

        <el-form ref="form" label-width="80px" >
          <el-form-item label="最高学历">
            <el-input v-model="station.eduBack"/>
          </el-form-item>
        </el-form>

        <el-form ref="form" label-width="80px" >
          <el-form-item label="毕业院校">
            <el-input v-model="station.graSchool"/>
          </el-form-item>
        </el-form>

        <el-form ref="form" label-width="80px" >
          <el-form-item label="所学专业">
            <el-input v-model="station.speciality"/>
          </el-form-item>
        </el-form>

      </el-form>

      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
    <el-button @click=clearFormEditS>取 消</el-button>
    <el-button type="primary" @click=clearFormEdit>确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表格显示的数据
      userList: [],
      queryInfo: {
        query: '',
        name: ''
      },
      // 输出给后端的增加数据
      out: {
        id: '',
        name: '',
        sex: '',
        departmentId: '',
        departmentName: '',
        stationId: '',
        stationName: '',
        employDate: '',
        idcard: '',
        folk: '',
        phone: '',
        email: '',
        status: '',
        seat: '',
        eduBack: '',
        graSchool: '',
        speciality: ''
      },
      total: 4,
      // 新增对话框的显示与隐藏
      dialogVisible: false,
      // 修改对话框的显示与隐藏
      editDialogVisible: false,
      // 搜索的关键字
      peopleSerch: '',
      departmentSerch: '',
      stationSerch: '',
      // 修改对话框的内容
      station: {},
      idList: [],
      iIdList: []
    }
  },
  computed: {

  },

  created () {
    this.getTable()
  },

  methods: {
    open1 () {
      const h = this.$createElement

      this.$notify({
        title: '标题名称',
        message: h('i', { style: 'color: teal' }, '操作成功')
      })
    },
    open2 () {
      const h = this.$createElement

      this.$notify({
        title: '标题名称',
        message: h('i', { style: 'color: teal' }, '操作失败')
      })
    },

    // 获取新的列表数据
    getTable () {
      const _this = this
      _this.$http.get('/api/employee/getAllEmployee').then(
        function (res1) {
          console.log('--------******--------')
          console.log(res1.data.data.list)
          _this.userList = res1.data.data.list
          console.log('--------******--------')
          console.log(this.userList)
        }
      )
    },
    // 通过id获取新的列表数据
    getTableById (id) {
      const _this = this
      _this.$http.get('/api/employee/getEmployeeById/' + id).then(
        function (res1) {
          console.log('--------******--------')
          _this.station = res1.data.data.employee
        }
      )
    },
    // 获取部门信息
    getIdList () {
      this.dialogVisible = true
      const _this = this
      _this.$http.get('/api/department/getAllDepartment').then(
        function (res1) {
          console.log('--------****333**--------')
          console.log(res1.data.data.list)
          _this.idList = res1.data.data.list
        }
      )
      _this.getIIdList()
    },
    // 获取岗位信息
    getIIdList () {
      this.dialogVisible = true
      const _this = this
      _this.$http.get('/api/station/getAllStation').then(
        function (res1) {
          console.log('--------****333**--------')
          console.log(res1.data.data.items)
          _this.iIdList = res1.data.data.items
        }
      )
    },
    // 向后端传送一个对象
    addStation () {
      // this.queryInfo.dialogVisible = false
    },
    clearFormS () {
      this.out.name = ''
      this.out.sex = ''
      this.out.departmentId = ''
      this.out.departmentName = ''
      this.out.stationId = ''
      this.out.stationName = ''
      this.out.employDate = ''
      this.out.idcard = ''
      this.out.folk = ''
      this.out.phone = ''
      this.out.email = ''
      this.out.status = ''
      this.out.seat = ''
      this.out.eduBack = ''
      this.out.graSchool = ''
      this.out.speciality = ''

      this.dialogVisible = false
    },
    // 增加表单添加部门
    clearForm () {
      const param = {
        // id: this.station.id,
        name: this.out.name,
        sex: this.out.sex,
        // departmentId: this.out.departmentId,
        departmentName: this.out.departmentName,
        // stationId: this.out.stationId,
        stationName: this.out.stationName,
        employDate: this.out.employDate,
        idcard: this.out.idcard,
        folk: this.out.folk,
        phone: this.out.phone,
        email: this.out.email,
        status: this.out.status,
        seat: this.out.seat,
        eduBack: this.out.eduBack,
        graSchool: this.out.graSchool,
        speciality: this.out.speciality

      }
      console.log(param)
      const _this = this
      _this.$http.post('/api/employee/addEmployee', param).then(
        function (res1) {
          console.log(param)
          _this.out.addName = ''
          _this.out.addDepartment = ''
          _this.dialogVisible = false
          _this.getTable()
          _this.open1()
        }
      )
    },
    clearFormEditS () {
      this.editDialogVisible = false
    },
    // 清空修改表单
    clearFormEdit () {
      const param = {
        id: this.station.id,
        name: this.station.name,
        sex: this.station.sex,
        departmentId: this.station.departmentId,
        departmentName: this.station.departmentName,
        stationId: this.station.stationId,
        stationName: this.station.stationName,
        employDate: this.station.employDate,
        idcard: this.station.idcard,
        folk: this.station.folk,
        phone: this.station.phone,
        email: this.station.email,
        status: this.station.status,
        seat: this.station.seat,
        eduBack: this.station.eduBack,
        graSchool: this.station.graSchool,
        speciality: this.station.speciality

      }
      console.log(param)
      const _this = this
      // _this.$http.post("/api/employee/updateEmployee",param).then(
      _this.$http.post('/api/employee/updateEmployee', param).then(
        function (res1) {
          console.log('>>>>>>>>')
          console.log(res1)
          _this.editDialogVisible = false
          if (res1.data.success === true) {
            console.log('修改成功')
            _this.open1()
          } else {
            _this.open2()
          }
          _this.getTable()
        }
      )
    },
    // 删除表格某一行，取到下标，通过下标去删除
    handleDelete (id) {
      // console.log(index)
      console.log(id)
      const _this = this
      _this.$http.get('/api/employee/removeEmployee/' + id).then(
        function (res1) {
          console.log(res1.data.success)
          if (res1.data.success === true) {
            console.log('删除成功')
            _this.open1()
          } else {
            _this.open2()
          }
          _this.getTable()
        }
      )
    },
    // 修改表格某一行
    handleEdit (id) {
      this.editDialogVisible = true
      // console.log(this.tableData.get(index).name)
      this.getTableById(id)
      // console.log(id)
    },
    // 搜索框向后端获取数据
    getDetail () {
      const param = {
        name: this.peopleSerch,
        deptName: this.departmentSerch,
        stationName: this.stationSerch
      }
      // console.log(param)
      const _this = this
      _this.$http.post('/api/employee/getEmployeeByCondition', param).then(
        function (res1) {
          console.log(res1)
          _this.userList = res1.data.data.employeeList
          _this.peopleSerch = ''
          _this.peopleSerch = ''
          _this.peopleSerch = ''
        }
      )
    }
    // open1() {
    //   this.$notify({
    //     title: '成功',
    //     message: '这是一条成功的提示消息',
    //     type: 'success'
    //   });
    // },
  }
}
</script>

<style scoped>
  .el-breadcrumb {
    margin-bottom:5px;
  }
  .el-card {
    box-shadow: 0 3px 3px rgba(0,0,0,0.15) !important;
  }
</style>

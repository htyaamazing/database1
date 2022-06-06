<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区域-->
    <el-card >
      <!--      搜索与添加区域-->
      <el-row :gutter="2">
        <el-col :span="7">
          <!--          <el-input placeholder="请输入内容" v-model="peopleSerch">-->
          <!--            <el-button slot="append" icon="el-icon-search" @click="getDetail"></el-button>-->
          <!--          </el-input>-->
          <div>

          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible= true">
            添加部门
          </el-button>
        </el-col>
      </el-row>

      <!--      用户列表区域-->
      <el-table :data="userList"  border stripe @row-click="handdle" >-->
        <!--        索引列的设置-->
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="部门名称"
          width="180"
        >
        </el-table-column>

        <el-table-column
          prop="telephone"
          label="部门电话"
          width="180">
        </el-table-column>

        <el-table-column
          prop="description"
          label="部门描述"
          width="180">
        </el-table-column>

        <el-table-column
          prop="date"
          label="创立日期"
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
    <!--    新增岗位对话框-->
    <el-dialog
      title="添加部门"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @close=" closeForm">
      <el-form ref="form"  label-width="80px" >
        <el-form-item label="部门名称" prop="out.addName">
          <el-input v-model="out.addName"></el-input>
        </el-form-item>

        <el-form-item label="部门电话" prop="out.addTelephone">
          <el-input v-model="out.addTelephone"></el-input>
        </el-form-item>

        <el-form-item label="日期" prop="out.addDate">
          <el-input v-model="out.addDate"></el-input>
        </el-form-item>

        <el-form-item label="描述信息" prop="out.addDscript">
          <el-input v-model="out.addDscript"></el-input>
        </el-form-item>

      </el-form>
      <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
    <el-button @click=clearFormS>取 消</el-button>
    <el-button type="primary" @click=clearForm>确 定</el-button>
  </span>
    </el-dialog>
    <!--    修改岗位对话框-->
    <el-dialog
      title="修改信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close=" closeForm">
      <el-form ref="form" label-width="80px" >
        <el-form-item label="电话">
          <el-input v-model="station.telephone"/>
        </el-form-item>
      </el-form>

      <el-form ref="form" label-width="80px" >
        <el-form-item label="日期">
          <el-input v-model="station.date"/>
        </el-form-item>
      </el-form>

      <el-form ref="form" label-width="80px" >
        <el-form-item label="描述">
          <el-input v-model="station.description"/>
        </el-form-item>
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
        // 修改用的数据
        newStation: '',
        // 新增用的数据
        addName: '',
        addTelephone: '',
        addDscript: '',
        addDate: ''

      },
      // 搜索框输出给后端的数据
      outSearch: {
        name: ''
      },
      // 新增对话框的显示与隐藏
      dialogVisible: false,
      // 修改对话框的显示与隐藏
      editDialogVisible: false,
      // 搜索的关键字
      peopleSerch: '',
      // 修改对话框的内容
      station: {}
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
      _this.$http.get('/api/department/getAllDepartment').then(
        function (res1) {
          console.log('--------******--------')
          _this.userList = res1.data.data.list
          console.log(res1.data.data.list)
        }
      )
    },
    // 通过id获取新的列表数据
    getTableById (id) {
      const _this = this
      _this.$http.get('/api/department/getDepartmentById/' + id).then(
        function (res1) {
          console.log('--------******2222--------')
          console.log(res1.data)
          _this.station = res1.data.data.department
        }
      )
    },

    clearFormS () {
      this.out.addName = ''
      this.out.addDepartment = ''
      this.dialogVisible = false
    },
    // 增加表单添加部门
    clearForm () {
      //  this.out= {}
      // this.dialogVisible=false
      const param = {
        name: this.out.addName,
        telephone: this.out.addTelephone,
        discription: this.out.addDscript,
        date: this.out.addDate
      }
      console.log(param)
      const _this = this
      _this.$http.post('/api/department/addDepartment', param).then(
        function (res1) {
          console.log(param)
          this.out.addName = ''
          this.out.addTelephone = ''
          this.out.addDscript = ''
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
        telephone: this.station.telephone,
        description: this.station.description,
        date: this.station.date
      }
      console.log(this.telephone)
      const _this = this
      _this.$http.post('/api/department/updateDepartment', param).then(
        function (res1) {
          console.log('--------------')
          console.log(param)
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
      _this.$http.get('/api/department/delete/' + id).then(
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
      this.getTableById(id)
    },
    getDetail () {
      console.log(1)
    }
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

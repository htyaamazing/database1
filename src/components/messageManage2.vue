<template>
  <div>
    <!--    面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>岗位管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    卡片视图区域-->
    <el-card >
      <!--      搜索与添加区域-->
      <el-row :gutter="3">
        <el-col :span="10">
          <!--            <el-input placeholder="请输入内容" v-model="peopleSerch">-->
          <!--              <el-button slot="append" icon="el-icon-search" @click="getDetail"></el-button>-->
          <!--            </el-input>-->
          <div>

          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getIdList">
            添加岗位
          </el-button>
        </el-col>
      </el-row>

      <!--      用户列表区域-->
      <el-table :data="userList"  border stripe @row-click="handdle" >-->
        <!--        索引列的设置-->
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="岗位"
          width="180"
        >
        </el-table-column>

        <el-table-column
          prop="departmentid"
          label="部门id"
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
      title="添加岗位"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @close=" closeForm">
      <el-form ref="form"  label-width="80px" >
        <el-form-item label="新增岗位" prop="out.department" inline="true">
          <el-input v-model="out.addName"></el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-select v-model="out.addDepartment" placeholder="选择部门">
            <el-option v-for="item in idList" :label="item.name" :value="item.name" :key="item"></el-option>
            <!--            <el-option label="开发部" value="开发部"></el-option>-->
          </el-select>
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
      title="修改岗位"
      :visible.sync="editDialogVisible"
      width="50%"
      @close=" closeForm">
      <el-form ref="form" label-width="80px" >
        <el-form-item label="修改岗位">
          <el-input v-model="station.name"/>
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
        addDepartment: ''

      },
      // 搜索框输出给后端的数据
      outSearch: {
        name: ''
      },

      total: 4,
      // 新增对话框的显示与隐藏
      dialogVisible: false,
      // 修改对话框的显示与隐藏
      editDialogVisible: false,
      // 搜索的关键字
      peopleSerch: '',
      // 修改对话框的内容
      station: {},

      idList: []
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
      _this.$http.get('/api/station/getAllStation').then(
        function (res1) {
          console.log('--------****1**--------')
          console.log(res1)
          _this.userList = res1.data.data.items
        }
      )
    },
    // 通过id获取新的列表数据
    getTableById (id) {
      const _this = this
      _this.$http.get('/api/station/getStationById/' + id).then(
        function (res1) {
          console.log('--------******--------')
          _this.station = res1.data.data.station
          // console.log(this.station.id);
          // console.log(this.station.name);
          // console.log(this.station.departmentid);
        }
      )
    },
    // 获取部门对象
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
    },
    // 向后端传送一个对象
    addStation () {
      // this.queryInfo.dialogVisible = false
    },
    // 监听用户对话框的关闭事件
    closeForm () {
      this.$refs.form.resetFields()
    },
    clearFormS () {
      this.out.addName = ''
      this.out.addDepartment = ''
      this.dialogVisible = false
    },
    // 取消增加表单的添加部门

    // 增加表单添加岗位
    clearForm () {
      //  this.out= {}
      // this.dialogVisible=false
      const param = {
        name: this.out.addName,
        deptName: this.out.addDepartment
      }
      console.log(param)
      const _this = this
      _this.$http.post('/api/station/saveStation', param).then(
        function (res1) {
          _this.out.addName = ''
          _this.out.addDepartment = ''
          _this.dialogVisible = false
          _this.getTable()
          console('后端返回：')
          console.log(res1.data)
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
        departmentid: this.station.departmentid
      }
      const _this = this
      _this.$http.post('/api/station/updateStation', param).then(
        function (res1) {
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
      _this.$http.get('/api/station/removeStation/' + id).then(
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

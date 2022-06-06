<template>
  <div>
<!--    <el-container>-->
<!--      <el-aside width="200px">Aside</el-aside>-->
<!--      <el-container>-->
<!--        <el-header>Header</el-header>-->
<!--        <el-main>-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>工资管理</el-breadcrumb-item>
          <el-breadcrumb-item>工资项目列表</el-breadcrumb-item>
        </el-breadcrumb>
          <!--卡片视图 -->
          <el-card>
            <!--搜索与添加区 -->
            <el-row :gutter="20">
              <el-col :span="7"><el-select v-model="searchParams.name" placeholder="请选择工资项目"><el-option
                v-for="item in tableData"
                :key="item"
                :label="item.name"
                :value="item.name">
              </el-option></el-select></el-col>
              <el-col :span="7">
              <el-select v-model="searchParams.type" placeholder="请选择类型"><el-option
                v-for="item in tableData"
                :key="item"
                :label="item.type"
                :value="item.type">
              </el-option></el-select>
              </el-col>
              <el-col :span="3"><el-button icon="el-icon-search" @click="clearListSearch"></el-button></el-col>
            </el-row>
            <!--搜索与添加区 -->
            <el-table :data="tableData">
              <el-table-column type="index">
              </el-table-column>
              <el-table-column label="工资项目" prop="name">
              </el-table-column>
              <el-table-column label="类型" prop="type">
              </el-table-column>
              <el-table-column label="具体描述" prop="description">
              </el-table-column>
            </el-table>
          </el-card>
<!--    </el-main>-->
<!--      </el-container>-->
<!--    </el-container>-->
    <el-dialog
      title="修改工资项目"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchParams: {
        name: null,
        type: null
      },
      tableData: [],
      dialogVisible: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      const _this = this
      _this.$http.post('/api/salary/item/selectByCondition', this.searchParams).then(
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
      const response = await _this.$http.post('/api/salary/item/selectByCondition', this.searchParams)
      console.log(response)
      this.tableData = response.data.data.data
      _this.getList()
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

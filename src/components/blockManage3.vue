<template>
    <el-container style="background-color : white">
        <el-main>
            <el-card class="card">
                <el-row gutter="10">
                    <el-col :span="6">
                        <div>部门名:
                            <el-select v-model="select1" placeholder="（全部）" @change="givemecc1" style="width: 240px" disabled>
                                <el-option
                                        v-for="item in department"
                                        :key="item"
                                        :label="item.name"
                                        :value="item.name">
                                    <!--                  {{item.id+item.name}}-->
                                    <div v-if="item.Iid==''&&item.Iname=='(全部)'"><div style="color: #B3C0D1">{{item.Iid+item.Iname}}</div></div>
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <!--                                <el-col :span="5">-->
                    <!--                                    <div>员工编号姓名:-->
                    <!--                                        <el-select v-model="select2" placeholder="（全部）" @change="givemecc2" style="width: 120px"disabled>-->
                    <!--                                            <el-option-->
                    <!--                                                    class="ub main-center"-->
                    <!--                                                    v-for="item in idList"-->
                    <!--                                                    :key="item"-->
                    <!--                                                    :label="item.id+item.name"-->
                    <!--                                                    :value="item.id"-->
                    <!--                                            >-->
                    <!--                                                &lt;!&ndash;                  {{"id:"+item.id+" name:"+item.name}}&ndash;&gt;-->
                    <!--                                                <div v-if="item.Iid==''&&item.Iname=='(全部)'"><div style="color: #B3C0D1">{{item.Iid+item.Iname}}</div></div>-->
                    <!--                                            </el-option>-->
                    <!--                                        </el-select>-->
                    <!--                                    </div>-->
                    <!--                                </el-col>-->
                    <el-col span="8">
                        <div class="block">开始月:
                            <span class="demonstration"></span>
                            <el-date-picker
                                    @change="startC"
                                    value-format="yyyy-MM"
                                    v-model="startTime"
                                    type="month"
                                    placeholder="（全部）"
                                    style="width: 240px">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col span="8">
                        <div class="block">结束月:
                            <span class="demonstration"></span>
                            <el-date-picker
                                    @change="endC"
                                    value-format="yyyy-MM"
                                    v-model="endTime"
                                    type="month"
                                    placeholder="（全部）"
                                    style="width: 240px">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col span="2">
                        <el-button type="primary" @click="reset" class="el-icon-refresh" >

                        </el-button>
                    </el-col>
                </el-row>
                <el-table
                        header-cell-style=""
                        id="4396"
                        :data="tableDataTset"
                        border
                        stripe
                        highlight-current-row
                        height="510"
                        style="width: 110%">
                    <!--                                sumActualSalary": 3250,-->
                    <el-table-column
                            prop="sumActualSalary"
                            label="基本工资总和"
                            width="180">
                    </el-table-column>
                    <!--                                "avgActualSalary": 3250,-->
                    <el-table-column
                            prop="avgActualSalary"
                            label="平均基本工资"
                            width="180">
                    </el-table-column>
                    <!--                                "minActualSalary": 3250,-->
                    <el-table-column
                            prop="minActualSalary"
                            label="最低基本工资"
                            width="180">
                    </el-table-column>
                    <!--                                "maxActualSalary": 3250-->
                    <el-table-column
                            prop="maxActualSalary"
                            label="最高基本工资"
                            width="180">
                    </el-table-column>

                </el-table>
                <div class="anniu ub main-right">
                    <el-button type="primary" @click="excel" >
                        导出报表Excel
                    </el-button>
                    <el-button type="primary" v-print="'#4396'">
                        打印报表
                    </el-button>
                </div>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      addDialogVisible: false,
      department: [],
      temp: [],
      select1: '',
      select2: '',
      tableDataTset: [],
      idList: [],
      startTime: '',
      endTime: '',
      emptykong: [{ Iid: '', Iname: '(全部)', name: '' }],
      jia: { departmentName: '', employeeId: '', start: '?start=1970-01', end: '&end=2099-12' }
    }
  },
  methods: {
    givemecc1 (val) {
      const _this = this
      if (val === '') {
        _this.jia.departmentName = val
      } else {
        _this.jia.departmentName = '?deptName=' + val
        _this.jia.start = '&start=1970-01'
      }
      _this.$http.get('/api/report/getcompanystatistic' + _this.jia.departmentName + _this.jia.start + _this.jia.end).then(
        function (res4) {
          console.log('输出测试')
          console.log(res4)
          _this.tableDataTset = res4.data.data.companyStatistic
        }
      )
    },
    // givemecc2(val) {
    //     const _this=this
    //     _this.jiade.deptName=''
    //     _this.jiade.name=''
    //     _this.jiade.stationName=''
    //     _this.jiade.employeeId=val
    //     if(val===''){
    //         _this.jia.employeeId=''
    //     }else {
    //         _this.jia.employeeId="&"+val
    //     }
    //     _this.$http.post("//api/employee/getEmployeeByCondition",_this.jiade).then(
    //         function (res1) {
    //             _this.idList= res1.data.data.employeeList
    //         }
    //     )
    //     _this.$http.get("/api/report/getcompanystatistic"+_this.jia.departmentName+_this.jia.start+_this.jia.end).then(
    //         function (res4) {
    //             console.log("-------日期一--------");
    //             console.log(res4)
    //             _this.tableDataTset=res4.data.data.companyStatistic
    //         }
    //     )
    // },
    startC (val) {
      const _this = this
      _this.jia.start = '?start=' + val
      console.log('-------日期一--------')
      console.log('/api/report/getcompanystatistic' + _this.jia.departmentName + _this.jia.start + _this.jia.end)
      _this.$http.get('/api/report/getcompanystatistic' + _this.jia.start + _this.jia.end).then(
        function (res4) {
          _this.tableDataTset = res4.data.data.companyStatistic
        }
      )
    },
    endC (val) {
      const _this = this
      _this.jia.end = '&end=' + val
      _this.$http.get('/api/report/getcompanystatistic' + _this.jia.start + _this.jia.end).then(
        function (res4) {
          console.log('-------日期二--------')
          console.log(res4)
          _this.tableDataTset = res4.data.data.companyStatistic
        }
      )
    },
    excel () {
      const _this = this
      window.location = ('/api/report/getcompanystatistic' + _this.jia.departmentName + _this.jia.start + _this.jia.end)
    },
    reset () {
      const _this = this
      _this.select1 = ''
      _this.select2 = ''
      _this.jia.departmentName = ''
      _this.jia.employeeId = '&'
      _this.startTime = ''
      _this.endTime = ''
      _this.jia.start = '?start=1970-01'
      _this.$http.get('/api/report/getcompanystatistic' + _this.jia.departmentName + _this.jia.start + _this.jia.end).then(
        function (res4) {
          console.log('-------日期二--------')
          console.log(res4)
          _this.tableDataTset = res4.data.data.companyStatistic
          _this.jia.employeeId = ''
        }
      )
    }
  },
  created () {
    const _this = this
    _this.$http.get('/api/department/getAllDepartment').then(
      function (res2) {
        console.log('--------读取部门列表--------')
        console.log(res2.data.data.list)
        _this.temp = res2.data.data.list
        _this.department = _this.emptykong.concat(_this.temp)
      }
    )
    _this.$http.get('/api/employee/getAllEmployee').then(
      function (res3) {
        console.log('--------读取员工id列表--------')
        console.log(res3.data.data.list)
        _this.temp = res3.data.data.list
        _this.idList = _this.emptykong.concat(_this.temp)
      }
    )
    _this.$http.get('/api/report/getcompanystatistic').then(
      function (res4) {
        console.log('--------读取总的表格数据--------')
        console.log(res4)
        _this.tableDataTset = res4.data.data.companyStatistic
      }

    )
  }
}
</script>

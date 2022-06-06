<template>
    <el-container style="background-color : white">
        <el-main>
            <el-card class="card">
                <el-row gutter="10">
                    <el-col :span="6">
                        <div>部门名:
                            <el-select v-model="select1" placeholder="（全部）" @change="givemecc1" style="width: 240px">
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
                    <!--                                        <el-select v-model="select2" placeholder="（全部）" @change="givemecc2" style="width: 120px">-->
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
                    <!--                "id": 1,-->
                    <!--                "employeeId": 43,-->
                    <el-table-column
                            prop="employeeId"
                            label="员工编号"
                            width="180">
                    </el-table-column>
                    <!--                "actualSalary": null,-->
                    <el-table-column
                            prop="actualSalary"
                            label="实发工资"
                            width="180">
                    </el-table-column>
                    <!--                "basicSalary": 3000,-->
                    <el-table-column
                            prop="basicSalary"
                            label="基本工资"
                            width="180">
                    </el-table-column>
                    <!--                "hotSalary": 0,-->
                    <el-table-column
                            prop="hotSalary"
                            label="高温补贴"
                            width="180">
                    </el-table-column>
                    <!--                "coldSalary": 0,-->
                    <el-table-column
                            prop="coldSalary"
                            label="采暖补贴"
                            width="180">
                    </el-table-column>
                    <!--                "trafficSalary": 0,-->
                    <el-table-column
                            prop="trafficSalary"
                            label="交通补贴"
                            width="180">
                    </el-table-column>
                    <!--                "houseSalary": 0,-->
                    <el-table-column
                            prop="houseSalary"
                            label="住房补贴"
                            width="180">
                    </el-table-column>
                    <!--                "lateCount": 0,-->
                    <el-table-column
                            prop="lateCount"
                            label="迟到次数"
                            width="180">
                    </el-table-column>
                    <!--                "lateFine": 0,-->
                    <el-table-column
                            prop="lateFine"
                            label="迟到扣款"
                            width="180">
                    </el-table-column>
                    <!--                "sickLeaveCount": 0,-->
                    <el-table-column
                            prop="sickLeaveCount"
                            label="病假次数"
                            width="180">
                    </el-table-column>
                    <!--                "sickLeaveFine": 0,-->
                    <el-table-column
                            prop="sickLeaveFine"
                            label="病假扣款"
                            width="180">
                    </el-table-column>
                    <!--                "eventLeaveCount": 0,-->
                    <el-table-column
                            prop="eventLeaveCount"
                            label="事假次数"
                            width="180">
                    </el-table-column>
                    <!--                "eventLeaveFine": 0,-->
                    <el-table-column
                            prop="eventLeaveFine"
                            label="事假扣款"
                            width="180">
                    </el-table-column>
                    <!--                "extraWorkCount": 0,-->
                    <el-table-column
                            prop="extraWorkCount"
                            label="加班次数"
                            width="180">
                    </el-table-column>
                    <!--                "extraWorkSalary": 0,-->
                    <el-table-column
                            prop="extraWorkSalary"
                            label="加班工资"
                            width="180">
                    </el-table-column>
                    <!--                "companyPaidOldIsurance": 0,-->
                    <el-table-column
                            prop="companyPaidOldIsurance"
                            label="单位缴纳养老保险"
                            width="180">
                    </el-table-column>
                    <!--                "employeePaidOldIsurance": 0,-->
                    <el-table-column
                            prop="employeePaidOldIsurance"
                            label="个人缴纳养老保险"
                            width="180">
                    </el-table-column>
                    <!--                "companyPaidMedicalIsurance": 0,-->
                    <el-table-column
                            prop="companyPaidMedicalIsurance"
                            label="单位缴纳医疗保险"
                            width="180">
                    </el-table-column>
                    <!--                "employeePaidMedicalIsurance": 0,-->
                    <el-table-column
                            prop="employeePaidMedicalIsurance"
                            label="个人缴纳医疗保险"
                            width="180">
                    </el-table-column>
                    <!--                "companyPaidUnemploymentIsurance": 0,-->
                    <el-table-column
                            prop="companyPaidUnemploymentIsurance"
                            label="单位缴纳失业保险"
                            width="180">
                    </el-table-column>
                    <!--                "employeePaidUnemploymentIsurance": 0,-->
                    <el-table-column
                            prop="employeePaidUnemploymentIsurance"
                            label="个人缴纳失业保险"
                            width="180">
                    </el-table-column>
                    <!--                "companyPaidInjuryIsurance": 0,-->
                    <el-table-column
                            prop="companyPaidInjuryIsurance"
                            label="单位缴纳工伤保险"
                            width="180">
                    </el-table-column>
                    <!--                "companyPaidPregnantIsurance": 0,-->
                    <el-table-column
                            prop="companyPaidPregnantIsurance"
                            label="单位缴纳剩余保险"
                            width="180">
                    </el-table-column>
                    <!--                "compamyPaidHousefund": 0,-->
                    <el-table-column
                            prop="compamyPaidHousefund"
                            label="单位缴纳住房公积金"
                            width="180">
                    </el-table-column>
                    <!--                "employeePaidHousefund": 0,-->
                    <el-table-column
                            prop="employeePaidHousefund"
                            label="个人缴纳住房公积金"
                            width="180">
                    </el-table-column>
                    <!--                "tax": 0,-->
                    <el-table-column
                            prop="tax"
                            label="个人所得税"
                            width="180">
                    </el-table-column>
                    <!--                "date": null-->
                    <el-table-column
                            prop="date"
                            label="时间"
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
      jia: { departmentName: '', employeeId: '', start: '？start=1970-01', end: '&end=2099-12' }
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
      console.log('输出测试')
      console.log('/api/report/querysalaryform' + _this.jia.departmentName + _this.jia.start)
      _this.$http.get('/api/report/querysalaryform' + _this.jia.departmentName).then(
        function (res4) {
          _this.tableDataTset = res4.data.data.salaryForm
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
    //     _this.$http.get("/api/report/querysalaryform"+_this.jia.departmentName+_this.jia.start+_this.jia.end).then(
    //         function (res4) {
    //             console.log("-------日期一--------");
    //             console.log(res4)
    //             _this.tableDataTset=res4.data.data.salaryForm
    //         }
    //     )
    // },
    startC (val) {
      const _this = this
      _this.jia.start = '&start=' + val
      console.log('-------日期一--------')
      console.log('/api/report/querysalaryform' + _this.jia.departmentName + _this.jia.start)
      _this.$http.get('/api/report/querysalaryform' + _this.jia.departmentName + _this.jia.start + _this.jia.end).then(
        function (res4) {
          _this.tableDataTset = res4.data.data.salaryForm
        }
      )
    },
    endC (val) {
      const _this = this
      _this.jia.end = '&end=' + val
      _this.$http.get('/api/report/querysalaryform' + _this.jia.departmentName + _this.jia.start + _this.jia.end).then(
        function (res4) {
          console.log('-------日期二--------')
          console.log('/api/report/querysalaryform' + _this.jia.departmentName + _this.jia.start + _this.jia.end)
          _this.tableDataTset = res4.data.data.salaryForm
        }
      )
    },
    excel () {
      const _this = this
      window.location = ('/api/report/querysalaryform' + _this.jia.departmentName + _this.jia.start + _this.jia.end)
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
      _this.$http.get('/api/report/querysalaryform' + _this.jia.departmentName + _this.jia.start + _this.jia.end).then(
        function (res4) {
          console.log('-------日期二--------')
          console.log(res4)
          _this.tableDataTset = res4.data.data.salaryForm
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
    _this.$http.get('/api/report/querysalaryform').then(
      function (res4) {
        console.log('--------读取总的表格数据--------')
        // console.log("/api/report/querysalaryform"+_this.jia.departmentName+_this.jia.start+_this.jia.end);
        console.log(res4)
        _this.tableDataTset = res4.data.data.salaryForm
      }

    )
  }
}
</script>

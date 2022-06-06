<template>

    <el-container class="home-container">

        <!-- 头部区域-->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="">
                <span>Salary System</span>
            </div>
            <el-button type="info" @click="backtoLogin">
                退出登录
            </el-button>
        </el-header>

        <!-- 侧边栏区域-->
        <el-container>
            <!-- 侧边栏菜单区域-->
            <el-aside width="200px">
                <!-- 具体的菜单项-->
                <el-menu unique-opened
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#ffd04b">

                    <!--  一级菜单 工资管理 -->
                    <el-submenu index="1">
                        <!--  一级菜单模版区域  -->
                        <template slot="title">
                            <!--图标 -->
                            <i class="el-icon-s-home"></i>
                            <!-- 文本-->
                            <span>工资管理</span>
                        </template>
                        <!--二级菜单 -->
                        <el-menu-item index="1-1">
                            <template slot="title">
                            <!--图标 -->
                            <i class="el-icon-location"></i>
                            <!-- 文本-->
                            <span @click="salaryManage1" >工资管理</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="1-2">
                            <template slot="title">
                                <!--图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本-->
                                <span @click="salaryManage2">固定工资管理</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="1-3">
                            <template slot="title">
                                <!--图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本-->
                                <span @click="salaryManage3">导入项目录入</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="1-4">
                            <template slot="title">
                                <!--图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本-->
                                <span @click="salaryManage4">工资项目管理</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="1-5">
                            <template slot="title">
                                <!--图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本-->
                                <span @click="salaryManage5">计算项目结算</span>
                            </template>
                        </el-menu-item>

                    </el-submenu >

                    <!-- 一级菜单 报表管理-->
                    <el-submenu index="2">
                        <!--  一级菜单模版区域  -->
                        <template slot="title">
                            <!--图标 -->
                            <i class="el-icon-s-home"></i>
                            <!-- 文本-->
                            <span>报表管理</span>
                        </template>
                        <!--二级菜单 -->
                        <el-menu-item index="2-1">
                            <template slot="title">
                                <!--图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本-->
                                <span @click="blockManage1">打印工资条</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="2-2">
                            <template slot="title">
                                <!--图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本-->
                                <span @click="blockManage2">工资统计报表</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="2-3">
                            <template slot="title">
                                <!--图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本-->
                                <span @click="blockManage3">工资查询报表</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <!-- 一级菜单 基础信息管理-->
                    <el-submenu index="3">
                        <!--  一级菜单模版区域  -->
                        <template slot="title">
                            <!--图标 -->
                            <i class="el-icon-s-home"></i>
                            <!-- 文本-->
                            <span>基础信息管理</span>
                        </template>
                        <!--二级菜单 -->
                        <el-menu-item index="3-1">
                            <template slot="title">
                                <!--图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本-->
                                <span @click="messageManage1">部门管理</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="3-2">
                            <template slot="title">
                                <!--图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本-->
                                <span @click="messageManage2">岗位管理</span>
                            </template>
                        </el-menu-item>

                        <el-menu-item index="3-3">
                            <template slot="title">
                                <!--图标 -->
                                <i class="el-icon-location"></i>
                                <!-- 文本-->
                                <span @click="messageManage3">员工信息管理</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                </el-menu>
            </el-aside>

            <!-- 右侧主体区域-->

            <!-- 表格都在这里输出-->
            <el-main>
                <!-- 显示内容的表格 -->
                <router-view></router-view>

            </el-main>

        </el-container>

    </el-container>

</template>

<script>
export default {
  data () {
    return {}
  },

  methods: {
    salaryManage1 () {
      this.$router.push('/home/salaryManage1')
    },
    salaryManage2 () {
      this.$router.push('/home/salaryManage2')
    },
    salaryManage3 () {
      this.$router.push('/home/salaryManage3')
    },
    salaryManage4 () {
      this.$router.push('/home/salaryManage4')
    },

    salaryManage5 () {
      this.$router.push('/home/salaryManage5')
    },

    blockManage1 () {
      this.$router.push('/home/blockManage1')
    },
    blockManage2 () {
      this.$router.push('/home/blockManage2')
    },
    blockManage3 () {
      this.$router.push('/home/blockManage3')
    },

    messageManage1 () {
      this.$router.push('/home/messageManage1')
    },
    messageManage2 () {
      this.$router.push('/home/messageManage2')
    },
    messageManage3 () {
      this.$router.push('/home/messageManage3')
    },
    backtoLogin () {
      this.$router.push('/')
    }

  }
}
</script>

<style lang="less" scoped>

    .home-container {
        height: 100%;

    }

    .el-header{
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        background-color: skyblue;
        collapse: #fff;
        font-size: 20px;

        > div{
            display: flex;
            align-items: center;
            span{
                padding-left: 15px;
            }
        }
    }

    .el-aside {
        background-color: #333744;
        border-right: none;

    }

    .el-main {
        background-color: floralwhite;
    }

</style>

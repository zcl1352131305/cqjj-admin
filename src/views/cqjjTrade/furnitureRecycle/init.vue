<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="searchForm.title" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData" v-loading="loading" border @selection-change="handleBatchSelect" style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column label="图片" >
          <template slot-scope="scope">
            <img :src="scope.row.headImg" style="width: 80px;height: 60px;"/>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="contact" label="联系人"></el-table-column>
        <el-table-column prop="phone" label="电话号码"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="props">
            <!--<router-link :to="{path: 'edit/'+ props.row.id}" tag="span">
              <el-button type="info" size="small" icon="edit"  v-if="auths.indexOf('cqjjTradeFurnitureRecycle:btn_upd') != -1">修改</el-button>
            </router-link>
            -->
            <el-button type="danger" size="small" icon="delete" @click="delData(props.row.id)" v-if="auths.indexOf('cqjjTradeFurnitureRecycle:btn_del') != -1">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="mt-5">
        <el-col :span="24">
          <el-pagination class="fr"  @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { getPageSize } from '@/utils/constant'

  export default {
    name: 'init',
    data() {
      return {
        auths: this.$store.getters.elements,
        tableData: null,
        loading: true,
        pageNum: 1, // 当前页码
        pageSize: getPageSize(), // 每页条数
        total: 0, // 数据总条目
        batchSelect: [], //  批量选择
        searchForm: {
          title: ''
        }
      }
    },
    activated() {
      this.getData()
    },
    methods: {
      // 分页信息加入到查询参数中
      initPageInfo() {
        this.searchForm.page = this.pageNum
        this.searchForm.limit = this.pageSize
      },
      // 页码选择
      handleCurrentChange(val) {
        this.pageNum = val
        this.getData()
      },
      handleBatchSelect(val) {
        this.batchSelect = val
      },
      // 获取列表数据
      getData() {
        this.initPageInfo()
        this.$store.dispatch('doGet', {
          url: '/cqjjTrade/furnitureRecycle/page',
          data: this.searchForm
        }).then((data) => {
          this.tableData = data.list
          this.loading = false
          this.total = data.total
        }).catch(() => {
          this.loading = false
        })
      },
      // 删除数据
      delData(id) {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('doDelete', {
            url: '/cqjjTrade/furnitureRecycle/remove/' + id
          }).then((data) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.loading = true
            this.getData()
          })
        }).catch(() => {})
      },
      // 批量删除数据
      batchDelData() {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          const ids = this.batchSelect.map(item => item.id).toString()
          this.$store.dispatch('doDelete', {
            url: '/cqjjTrade/furnitureRecycle/batchRemove/' + ids
          }).then((data) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.loading = true
            this.getData()
          })
        }).catch(() => {})
      }
    }
  }
</script>

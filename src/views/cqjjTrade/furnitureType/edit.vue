<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="编码" >
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="类型组">
        <el-radio-group v-model="form.wayGroup">
          <el-radio label="1">按风格</el-radio>
          <el-radio label="2">按材料</el-radio>
          <el-radio label="3">按功能</el-radio>
          <el-radio label="4">按结构</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型名" >
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { doGet } from '@/api/baseApi'
  import { getQiniuHost } from '@/utils/constant'

  export default {
    name: 'edit',
    data() {
      return {
        isEdit: false,
        routerID: this.$route.params.id,
        form: {
          id: '',
          code: '',
          wayGroup: '',
          name: ''
        },
        postData: {
          token: '',
          key: ''
        }
      }
    },
    created() {
      this.getData()
    },
    methods: {
      // 获取数据
      getData() {
        this.$store.dispatch('doGet', {
          url: '/cqjjTrade/furnitureType/get/' + this.routerID
        }).then((data) => {
          if (data != null) {
            this.isEdit = true
            this.form.id = data.id
            this.form.code = data.code
            this.form.wayGroup = data.wayGroup
            this.form.name = data.name
          }
        })
      },
      // 提交表单
      submitForm() {
        this.$store.dispatch('saveOrUpdate', {
          url: '/cqjjTrade/furnitureType/',
          isEdit: this.isEdit,
          data: this.form
        }).then((data) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.back()
        })
      },
      // 返回列表页
      back() {
        this.$router.back()
      }
    }

  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

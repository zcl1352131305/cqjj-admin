<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="联系方式" >
        {{form.contactWay}}
      </el-form-item>
      <el-form-item label="意见建议" >
        {{form.advice}}
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import { doGet } from '@/api/baseApi'
  import { getQiniuHost } from '@/utils/constant'

  export default {
    name: 'detail',
    data() {
      return {
        isEdit: false,
        routerID: this.$route.params.id,
        form: {
          id: '',
          contactWay: '',
          advice: ''
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
          url: '/cqjjTrade/advice/get/' + this.routerID
        }).then((data) => {
          if (data != null) {
            this.isEdit = true
            this.form.id = data.id
            this.form.contactWay = data.contactWay
            this.form.advice = data.advice
          }
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

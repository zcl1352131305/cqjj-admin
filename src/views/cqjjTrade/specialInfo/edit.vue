<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="标题" >
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="展示位置">
        <el-select v-model="form.location" class="wd-100" placeholder="请选择">
          <el-option
            v-for="item in locationItem"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="连接地址" >
        <el-input v-model="form.linkUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          action="http://upload.qiniup.com"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          :data="postData">
          <img v-if="form.headImg" :src="form.headImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
          title: '',
          location: '',
          linkUrl: '',
          headImg: ''
        },
        postData: {
          token: '',
          key: ''
        },
        locationItem:[{
          value: 'wx-main-swiper',
          label: '微信首页轮播'
        }]
      }
    },
    created() {
      this.getData()
    },
    methods: {
      handleAvatarError(err, file, fileList) {
        alert(JSON.stringify(err))
      },
      handleAvatarSuccess(res, file) {
        this.form.headImg = getQiniuHost() + res.key
      },
      beforeAvatarUpload(file) {
        return new Promise((resolve, reject) => {
          doGet({
            url: '/sysAdmin/qiniu/token',
            data: {
              fileName: file.name
            }
          }).then(response => {
            const token = response.result
            this.postData.token = token
            this.postData.key = file.name
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      // 获取数据
      getData() {
        this.$store.dispatch('doGet', {
          url: '/cqjjTrade/specialInfo/get/' + this.routerID
        }).then((data) => {
          if (data != null) {
            this.isEdit = true;
            this.form.id = data.id;
            this.form.title = data.title;
            this.form.location = data.location;
            this.form.linkUrl = data.linkUrl;
            this.form.headImg = data.headImg;
          }
        })
      },
      // 提交表单
      submitForm() {
        this.$store.dispatch('saveOrUpdate', {
          url: '/cqjjTrade/specialInfo/',
          isEdit: this.isEdit,
          data: this.form
        }).then((data) => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
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

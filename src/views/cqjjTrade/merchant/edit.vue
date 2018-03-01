<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="商户名" >
        <el-input v-model="form.merchantName"></el-input>
      </el-form-item>
      <el-form-item label="注册码" >
        <el-input v-model="form.merchantCreditCode"></el-input>
      </el-form-item>
      <el-form-item label="营业执照">
        <el-upload
          class="avatar-uploader"
          action="http://upload.qiniup.com"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          :data="postData">
          <img v-if="form.merchantBusinessLicense" :src="form.merchantBusinessLicense" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="联系人" >
        <el-input v-model="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" >
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" >
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="地址" >
        <el-input v-model="form.address"></el-input>
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
          merchantName: '',
          merchantCreditCode: '',
          merchantBusinessLicense: '',
          contact: '',
          phone: '',
          email: '',
          address: '',
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
      handleAvatarError(err, file, fileList) {
        alert(JSON.stringify(err))
      },
      handleAvatarSuccess(res, file) {
        this.form.merchantBusinessLicense = getQiniuHost() + res.key
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
          url: '/cqjjTrade/merchant/get/' + this.routerID
        }).then((data) => {
          if (data != null) {
            this.isEdit = true
            this.form.id = data.id
            this.form.merchantName = data.merchantName
            this.form.merchantCreditCode = data.merchantCreditCode
            this.form.merchantBusinessLicense = data.merchantBusinessLicense
            this.form.contact = data.contact
            this.form.phone = data.phone
            this.form.email = data.email
            this.form.address = data.address
          }
        })
      },
      // 提交表单
      submitForm() {
        if(!this.isEdit){
          this.form.merchantId = this.uuid()
        }
        this.$store.dispatch('saveOrUpdate', {
          url: '/cqjjTrade/merchant/',
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
      uuid() {
        var s = [];
        var hexDigits = "0123456789";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
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

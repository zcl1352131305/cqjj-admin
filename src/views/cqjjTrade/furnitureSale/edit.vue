<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="商户名" >
        {{form.merchantName}}
      </el-form-item>
      <el-form-item label="注册码" >
        {{form.merchantCreditCode}}
      </el-form-item>
      <el-form-item label="营业执照">
        <img :src="form.merchantBusinessLicense">
        <!--<el-upload
          class="avatar-uploader"
          action="http://upload.qiniup.com"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          :data="postData">
          <img v-if="form.merchantBusinessLicense" :src="form.merchantBusinessLicense" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>-->
      </el-form-item>
      <el-form-item label="联系人" >
        {{form.contact}}
      </el-form-item>
      <el-form-item label="联系电话" >
        {{form.phone}}
      </el-form-item>
      <el-form-item label="邮箱" >
        {{form.email}}
      </el-form-item>
      <el-form-item label="地址" >
        {{form.address}}
      </el-form-item>
      <el-form-item label="经营范围" >
        {{form.businessScopesName}}
      </el-form-item>


      <el-form-item label="当前审核状态" >
        {{ form.auditStateName }}
      </el-form-item>
      <el-form-item label="拒绝理由" >
        <el-input v-model="form.auditRefuseReason" type="textarea" placeholder="通过可不填，拒绝必须填写" :rows="2" ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="passAudit">通过</el-button>
        <el-button type="danger" @click="refuseAudit">拒绝</el-button>
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
          auditState: '',
          auditRefuseReason: '',
          auditStateName: '',
          businessScopesName: '',
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
            this.form.auditState = data.auditState
            this.form.auditRefuseReason = data.auditRefuseReason
            if(data.auditState == '1'){
              this.form.auditStateName = '待审核';
            }
            else if(data.auditState == '2'){
              this.form.auditStateName = '审核已拒绝';
            }
            else if(data.auditState == '3'){
              this.form.auditStateName = '审核成功';
            }

            let businessScopesName = ''
            data.businessScopes.forEach(function (obj) {
              businessScopesName += obj.typeName + ','
            });
            this.form.businessScopesName = businessScopesName;

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
      passAudit(){
        this.form.auditState = '3';
        this.submitForm();
      },
      refuseAudit(){
        this.form.auditState = '2';
        this.submitForm();
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

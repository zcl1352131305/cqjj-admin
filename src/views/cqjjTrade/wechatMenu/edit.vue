<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="名称" >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="form.type">
          <el-radio label="view">网页</el-radio>
          <el-radio label="click">点击</el-radio>
          <el-radio label="miniprogram">小程序</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="链接地址" >
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="父级菜单" >
        <el-select v-model="form.parent" class="wd-100" placeholder="请选择">
          <el-option
            v-for="item in menus"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="排序" >
        <el-input v-model="form.sort"></el-input>
      </el-form-item>
      <el-form-item label="mediaId" >
        <el-input v-model="form.mediaId"></el-input>
      </el-form-item>
      <el-form-item label="小程序appid" >
        <el-input v-model="form.appid"></el-input>
      </el-form-item>
      <el-form-item label="小程序路径" >
        <el-input v-model="form.pagepath"></el-input>
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
          name: '',
          type: '',
          url: '',
          parent: '',
          sort: '',
          mediaId: '',
          appid: '',
          pagepath: '',
        },
        menus: [],
        postData: {
          token: '',
          key: ''
        }
      }
    },
    created() {
      this.getMenus();
      this.getData()
    },
    methods: {
      getMenus() {
        this.$store.dispatch('doGet', {
          url: '/cqjjTrade/wechat/menu/all'
        }).then((data) => {
          data.push({
            id: '0',
            name: '根菜单'
          })
          this.menus = data;

        }).catch(() => {})
      },
      // 获取数据
      getData() {
        this.$store.dispatch('doGet', {
          url: '/cqjjTrade/wechat/menu/get/' + this.routerID
        }).then((data) => {
          if (data != null) {
            this.isEdit = true;
            this.form.id = data.id;
            this.form.type = data.type;
            this.form.url = data.url;
            this.form.name = data.name;
            this.form.parent = data.parent;
            this.form.sort = data.sort;
            this.form.mediaId = data.mediaId;
            this.form.appid = data.appid;
            this.form.pagepath = data.pagepath;

          }
        })
      },
      // 提交表单
      submitForm() {
        this.$store.dispatch('saveOrUpdate', {
          url: '/cqjjTrade/wechat/menu/',
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

<template>
  <el-dialog
    title="更新用户"
    :visible.sync="UpdateUserDialogVisible"
    width="40%"
    :modal-append-to-body="false"
    :show-close="false"
    top="50px"
  >
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="right"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否修改头像" prop="isUpdateProfilerPhoto">
          <el-switch
            v-model="isUpdateProfilerPhoto"
            active-text="是"
            inactive-text="否"
            autocomplete="off"
          ></el-switch>
        </el-form-item>
        <template v-if="isUpdateProfilerPhoto">
          <el-form-item label="上传图片" class="upload-form">
            <el-upload
              class="avatar-uploader"
              action="/api/v1/uploadUserProfilePhoto"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              name="profilePhoto"
              :data="currentUser"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </template>
        <el-form-item label="是否修改密码" prop="isUpdatePass">
          <el-switch v-model="isUpdatePass" active-text="是" inactive-text="否" autocomplete="off"></el-switch>
        </el-form-item>
        <template v-if="isUpdatePass">
          <el-form-item label="旧密码" prop="oldPass">
            <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="small">提交</el-button>
          <el-button
            @click="setActionUpdateUserDialogVisibleState(!UpdateUserDialogVisible)"
            size="small"
          >取 消</el-button>
          <el-button @click="resetForm('ruleForm')" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import Vue from "vue";
import { Message } from "element-ui";

Vue.component(Message.name, Message);
import { mapState, mapActions } from "vuex";
export default {
  data() {
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (value.length < 2) {
          callback(new Error("用户名长度不能小于两位"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validateOldPass = (rule, value, callback) => {
      //去某个地方取旧的密码 和新的密码做比较  这里可能会选择 取服务器取 做异步处理
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        callback(new Error("密码长度不能小于8位"));
      } else if (value === this.ruleForm.oldPass) {
        callback(new Error("不能与旧密码一致"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userName: "",
        oldPass: "",
        newPass: "",
        checkPass: "",
      },
      isUpdatePass: false,
      isUpdateProfilerPhoto: false,
      imageUrl: "",
      currentUser: {},
      rules: {
        userName: [{ validator: checkUserName, trigger: "blur" }],
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        newPass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  mounted() {
    //初始化用户名
    let currentUser = JSON.parse(localStorage.getItem("current_user"));
    this.ruleForm.userName = currentUser.user_name;
    this.currentUser = currentUser;
  },
  computed: {
    ...mapState("user", {
      UpdateUserDialogVisible: "UpdateUserDialogVisibleState",
    }),
  },
  methods: {
    ...mapActions("user", ["setActionUpdateUserDialogVisibleState"]),
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        Message.warning({
          message: "上传头像图片只能是 JPG 格式!",
        });
      }
      if (!isLt2M) {
        Message.warning({
          message: "上传头像图片大小不能超过 2MB!",
        });
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //提交成功后 做的处理 这里会调用 注更新用户信息的api
          //这里判断一下  如果什么都没动  就不调用接口了
          //注意一下  由于 后台更新用的是map 所以 这里的params的key  要和model里的字段一致
          let params = {};
          if (this.currentUser.user_name !== this.ruleForm.userName) {
            params["UserName"] = this.ruleForm.userName;
          }
          //如果选择了 修改头像
          if (this.isUpdateProfilerPhoto && this.imageUrl !== "") {
            params["ProfilePhoto"] = this.imageUrl;
          }
          //如果选择了 修改密码
          if (this.isUpdatePass) {
            params["PassWord"] = this.ruleForm.newPass;
          }
          console.log(params);
          //params 不为空 再调接口
          if ("{}" !== JSON.stringify(params)) {
            console.log("调接口了");
            let result = await this.$http.updateUserInfo(
              "/update_user",
              params
            );
            if (result.data.tokenCode !== 2000) {
              Message.warning({
                message: result.data.tokenMessage,
              });
            } else {
              this.setActionUpdateUserDialogVisibleState(false)
              Message.success({
                message: "成功了喔!",
              });
            }
            console.log(result);
          } else {
            Message.warning({
              message: "没有做任何变更",
            });
          }

          //let result = await this.$http.signUp("/signup", params);
          //console.log(result);
          //取到返回值后在这里进行判断
          //如果 message的值为 ”注册成功” 就关闭弹窗   做后续的处理
          //console.log(result.data.message === "注册成功");
          // if (result.data.message === "注册成功") {
          //   this.setActionUpdateUserDialogVisibleState(
          //     !this.UpdateUserDialogVisible
          //   );
          //   Message.success({
          //     message: result.data.message,
          //   });
          // } else {
          //   //console.log(result.data.message);
          //   Message.warning({
          //     message: result.data.message,
          //   });
          // }
          //如果message的值不是“注册成功”  就不关闭弹窗  跳出警告
          //alert("submit!");

          //处理结束后, 关闭登陆弹窗
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="stylus" scoped>
.el-dialog
  div:first-child
    margin-top -6px
    width 90%
    .el-form
      .el-form-item
        .avatar-uploader
          width 120px
          .avatar-uploader-icon
            font-size 28px
            color #8c939d
            width 100px
            height 100px
            line-height 100px
            text-align center
            border 1px dashed #d9d9d9
            border-radius 6px
            cursor pointer
            position relative
            overflow hidden
            float left
            &:hover
              border-color #409EFF
          .avatar
            width 100px
            height 100px
            display block
</style>
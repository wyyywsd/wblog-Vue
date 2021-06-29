<template>
  <el-dialog
    title="登录"
    :visible.sync="loginDialogVisible"
    width="30%"
    :modal-append-to-body="false"
    :show-close="false"
  >
    <div class="login-form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        
      >
        <el-form-item label="用户名" prop="user_name">
          <el-input type="text" v-model="ruleForm.user_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="small">提交</el-button>
          <el-button @click="setActionLoginDialogVisibleState(!loginDialogVisible)" size="small">取 消</el-button>
          <el-button @click="resetForm('ruleForm')" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { Message } from "element-ui";

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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 8) {
          callback(new Error("密码长度不能小于8位"));
        } else {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        user_name: "",
        pass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        user_name: [{ validator: checkUserName, trigger: "blur" }],
      },
      token: "",
    };
  },

  computed: {
    ...mapState("user", {
      loginDialogVisible: "loginDialogVisibleState",
    }),

  },
  methods: {
    ...mapActions("user", ["setActionLoginDialogVisibleState"]),
    ...mapActions("user", ["setActionIsLoginState"]),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //提交成功后 做的处理
          //将表单中的用户名和密码 放到一个对象里
          let params = {
            user_name: this.ruleForm.user_name,
            pass_word: this.ruleForm.pass,
          };
          //这里是一个异步的方法  调后台的接口做校验  用户名密码是否正确
          let result = await this.$http.auth("/auth", params);
          //
          console.log(result)
          if (result.data.code !== 2000) {
            //console.log("失败了");
            Message.warning({
              message: result.data.message,
            });
          } else {
            //成功获取token
            let token = result.data.data.token;
            let currentUser = result.data.currentUser
           
            //获取后将得到的token储存在 localStorage中
            localStorage.setItem("token", token);
            //将当前用户信息 储存在localStorage中 JSON.stringify(currentUser) 可以将对象转换为字符串
            localStorage.setItem("current_user", JSON.stringify(currentUser))
            //调用 state 中的 setActionIsLoginState  设置 已经登陆
            this.setActionIsLoginState(true)
            //处理结束后, 关闭登陆弹窗
            this.setActionLoginDialogVisibleState(!this.loginDialogVisible);
            //给一个message 提示登陆成功
            Message.success({ message: result.data.message });
          }
          console.log(result);
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
  mounted() {},
};
</script>

<style lang="stylus" scoped>
.el-col
  border-radius 4px
  height 700px
.bg-purple
  height 100%
.grid-content
  border-radius 4px
  min-height 36px
.login-form
  color yellow
  margin-top -20px
  width 85%
</style>
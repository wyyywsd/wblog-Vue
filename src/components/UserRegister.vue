<template>
  <el-dialog
    title="注册"
    :visible.sync="registerDialogVisible"
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
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="user_name">
          <el-input type="text" v-model="ruleForm.user_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" size="small">提交</el-button>
          <el-button
            @click="setActionRegisterDialogVisibleState(!registerDialogVisible)"
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        callback(new Error("密码长度不能小于8位"));
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
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user_name: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        user_name: [{ validator: checkUserName, trigger: "blur" }],
      },
    };
  },

  computed: {
    ...mapState("user", {
      registerDialogVisible: "registerDialogVisibleState",
    }),
  },
  methods: {
    ...mapActions("user", ["setActionRegisterDialogVisibleState"]),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //提交成功后 做的处理 这里会调用 注册的api
          let params = {
            user_name: this.ruleForm.user_name,
            pass_word: this.ruleForm.pass,
          };
          let result = await this.$http.signUp("/signup", params);
          //console.log(result);
          //取到返回值后在这里进行判断
          //如果 message的值为 ”注册成功” 就关闭弹窗   做后续的处理
          console.log(result.data.message === "注册成功");
          if (result.data.message === "注册成功") {
            this.setActionRegisterDialogVisibleState(
              !this.registerDialogVisible
            );
            Message.success({
              message: result.data.message,
            });
          } else {
            //console.log(result.data.message);
            Message.warning({
              message: result.data.message,
            });
          }
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
  width 80%
</style>
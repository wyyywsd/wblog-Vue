<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item>LOGO</el-menu-item>
      <el-menu-item></el-menu-item>
      <el-menu-item index="/home/articles">首页</el-menu-item>
      <el-menu-item index="2">golang</el-menu-item>
      <el-menu-item index="3">ruby</el-menu-item>
      <el-menu-item index="3">ruby</el-menu-item>
      <el-menu-item index="3">ruby</el-menu-item>
      <el-menu-item index="/home/about">关于</el-menu-item>
      <el-menu-item>
        <el-input placeholder="请输入内容" v-model="searchInput" size="small" class="search-article">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="searchArticle()"></i>
        </el-input>
      </el-menu-item>
      <template v-if="!isLogin">
        <el-menu-item class="login-button">
          <el-button
            size="small"
            type="primary"
            @click="setActionLoginDialogVisibleState(!loginDialogVisible)"
          >登陆</el-button>
          <el-button
            size="small"
            type="danger"
            @click="setActionRegisterDialogVisibleState(!registerDialogVisible)"
          >注册</el-button>

          <!-- 登陆的弹窗 -->
          <UserLogin></UserLogin>
          <!-- 注册的弹窗 -->
          <UserRegister></UserRegister>
        </el-menu-item>
      </template>
      <template v-else>
        <el-menu-item></el-menu-item>
        <el-menu-item class="user-portrait">
          <span class="el-icon-bell user-bell"></span>
          <el-dropdown @command="handleCommand">
            <el-avatar :src="ProfilePhoto"></el-avatar>
            <el-dropdown-menu slot="dropdown" @command="handleCommand">
              <el-dropdown-item command="a">个人主页</el-dropdown-item>
              <el-dropdown-item command="UpdateUser">设置</el-dropdown-item>
              <el-dropdown-item command="c">dashboard</el-dropdown-item>
              <el-dropdown-item command="d">收藏夹</el-dropdown-item>
              <el-dropdown-item command="signOut" divided @click="signOut()">退出</el-dropdown-item>
            </el-dropdown-menu>
            <!-- 设置的弹窗 -->
            <UpdateUser></UpdateUser>
          </el-dropdown>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import Vue from "vue";
import { Menu, MenuItem, MenuItemGroup, Input, Button } from "element-ui";
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Button);

import UserLogin from "./UserLogin.vue";
import UserRegister from "./UserRegister.vue";
import UpdateUser from "./UpdateUser.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      //搜索文章输入框的内容
      searchInput: "",
      //导航栏初始化高亮
      activeIndex: "",
    };
  },

  methods: {
    searchArticle() {
      console.log(this.searchInput);
    },
    // SignIn() {
    //   this.$router.push("/users/sign_in");
    // },
    ...mapActions("user", ["setActionLoginDialogVisibleState"]),
    ...mapActions("user", ["setActionRegisterDialogVisibleState"]),
    ...mapActions("user", ["setActionUpdateUserDialogVisibleState"]),
    ...mapActions("user", ["setActionIsLoginState"]),

    handleCommand(command) {
      console.log(command);
      if (command === "signOut") {
        localStorage.removeItem("token");
        localStorage.removeItem("current_user");
        this.setActionIsLoginState(false);
      } else if (command === "UpdateUser") {
        this.setActionUpdateUserDialogVisibleState(true);
      }
    },
  },
  components: {
    UserLogin,
    UserRegister,
    UpdateUser,
  },
  mounted() {
    console.log(this.$router.history.current.path);
    this.activeIndex = this.$router.history.current.path;
  },

  computed: {
    ...mapState("user", {
      loginDialogVisible: "loginDialogVisibleState",
    }),

    ...mapState("user", {
      isLogin: "isLoginState",
    }),
    ...mapState("user", {
      registerDialogVisible: "registerDialogVisibleState",
    }),
    ...mapState("user", {
      UpdateUserDialogVisible: "UpdateUserDialogVisibleState",
    }),
    ProfilePhoto() {
      let currentUser = JSON.parse(localStorage.getItem("current_user"));
      console.log(currentUser);
      return currentUser.ProfilePhoto;
    },
  },
};
</script>
  
<style lang="stylus" scoped>
.el-menu
  padding 0
.el-menu-demo
  font-size 20px
.search-article
  height 60px
  margin-top -7px
.login-button, .user-portrait
  float right
.user-bell
  margin-right 30px
  font-size 20px
.el-dropdown-link
  cursor pointer
  color #409eff
.el-icon-arrow-down
  font-size 12px
</style>
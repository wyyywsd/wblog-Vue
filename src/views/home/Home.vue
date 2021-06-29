<template>
  <div>
    <!-- 原本是回到顶部的按钮, 现在用于调用写文章的弹窗 -->
    <el-backtop
      @click="createArticle()"
      :visibility-height="0"
      class="el-icon-circle-plus-outline"
      :fullscreen="true"
    ></el-backtop>
    <NewArticle></NewArticle>
    <el-row>
      <el-col :sm="24" :md="24" :lg="24" :xl="24">
        <el-container>
          <div class="headerWrapper">
            <el-col :span="24">
              <el-header height="66px" class="my-header">
                <!-- 导航条组件 -->
                <Nav class="my-nav"></Nav>
              </el-header>
            </el-col>
          </div>

          <el-main class="my-main">
            <!-- articlehome  articleitem-->
            <router-view></router-view>

          </el-main>
          <el-footer>
            <FooterComponent></FooterComponent>
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Nav from "../../components/Nav.vue";
import RecommendedAuthor from "../home/RecommendedAuthor.vue";
import HotArticles from "../home/HotArticles.vue";
import Advert from "../home/Advert.vue";
import FooterComponent from "../../components/Footer.vue";
import NewArticle from "./NewArticle.vue";

import { Message } from "element-ui";

import { mapState, mapActions } from "vuex";
export default {
  components: {
    Nav,
    FooterComponent,
    RecommendedAuthor,
    HotArticles,
    Advert,
    NewArticle,
  },
  computed: {
    ...mapState("articles", {
      newArticleDialogVisible: "newArticleDialogVisibleState",
    }),
  },
  methods: {
    ...mapActions("articles", ["setActionNewArticleDialogVisibleState"]),
    createArticle() {
      let token = localStorage.getItem("token");
      if (token === null) {
        console.log(this)
        Message.warning({
          message: "请先登陆!",
        });
      } else {
        this.setActionNewArticleDialogVisibleState(
          !this.newArticleDialogVisible
        );
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.headerWrapper
  position fixed
  z-index 1500
  width 100%
  top 0
  padding 0
  margin-left -8px
.el-header
  color #333
  text-align center
  z-index 100
  position relative
  top 0
  left 0
  padding 0
  width 100%
  line-height 66px
  position relative
.my-nav
  padding 0
 
.el-footer
  color #333
  text-align center
  line-height 66px
  padding 0
.el-main
  color #333
  min-height 500px
  // line-height 160px
  // height 10000px
  margin-top 66px
  padding 0
.el-container
  margin-bottom 40px

.el-col
  border-radius 4px



</style>

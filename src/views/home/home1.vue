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
      <el-col :span="18" :push="3">
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
            <el-row :gutter="30">
              <el-col :sm="17" :md="17" :lg="17" :xl="17">
                <div>
                  <!-- 文章列表的插槽 -->
                  <router-view></router-view>
                </div>
              </el-col>
              <el-col :sm="7" :md="7" :lg="7" :xl="7">
                <div>
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="grid-content bg-purple recommended-author">
                        <!-- 推荐作者的组件 -->
                        <RecommendedAuthor></RecommendedAuthor>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="grid-content bg-purple-light hot-articles">
                        <!-- 热门文章的组件 -->
                        <HotArticles></HotArticles>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <div class="grid-content bg-purple advert">
                        <!-- 广告的组件 -->
                        <Advert></Advert>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
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
import Vue from "vue";
import {
  Button,
  Container,
  Header,
  Main,
  Footer,
  Row,
  Col,
  Link,
  Loading,
  Pagination,
  Backtop,
  Dialog,
  Form,
  FormItem,
  Message,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "element-ui";
Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Link);
Vue.use(Loading);
Vue.use(Pagination);
Vue.use(Backtop);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.component(Message.name, Message);

import { mapState, mapActions } from "vuex";
export default {
  components: {
    Nav,
    FooterComponent,
    RecommendedAuthor,
    HotArticles,
    Advert,
    Link,
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
        Message.warning({
          message: "请先登陆!",
        });
      } else {
        this.setActionNewArticleDialogVisibleState(!this.newArticleDialogVisible);
      }
    },
  },
};
// .el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside
//   line-height 260px
// .el-container:nth-child(7) .el-aside
//   line-height 320px
// .el-col
//   border-radius 4px
// .grid-content
//   border-radius 4px
//   min-height 36px
</script>

<style lang="stylus" scoped>
.headerWrapper
  position fixed
  z-index 1500
  width 75%
  top 0
.el-header
  color #333
  text-align center
  line-height 60px
  z-index 100
  position relative
  top 0
  left 0
  width 100%
  line-height 66px
  z-index 100
  position relative
.my-nav
  padding 0
.el-footer
  color #333
  text-align center
  line-height 66px
.el-main
  color #333
  min-height 500px
  // line-height 160px
  // height 10000px
  margin-top 66px
body > .el-container
  margin-bottom 40px
.el-col
  border-radius 4px
.bg-purple-dark
  border 1px solid #eee
.bg-purple
  border 1px solid #eee
.bg-purple-light
  border 1px solid #eee
.grid-content
  border-radius 4px
  min-height 36px
.recommended-author, .hot-articles
  min-height 350px
.advert
  min-height 200px
</style>

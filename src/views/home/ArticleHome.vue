<template>
  <el-row justify="center" span="24">
    <el-col :sm="3" :md="3" :lg="3" :xl="3">
      <div class="grid-content"></div>
    </el-col>
    <el-col :sm="24" :md="24" :lg="13" :xl="13">
      <div>
        <!-- 文章列表的插槽 -->
        <ArticleList></ArticleList>
      </div>
    </el-col>
    <el-col :sm="24" :md="24" :lg="5" :xl="5">
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
    <el-col :sm="3" :md="3" :lg="3" :xl="3">
      <div class="grid-content"></div>
    </el-col>
  </el-row>
</template>

<script>
import ArticleList from "./ArticleList.vue";
import RecommendedAuthor from "../home/RecommendedAuthor.vue";
import HotArticles from "../home/HotArticles.vue";
import Advert from "../home/Advert.vue";
export default {
  components: {
    ArticleList,
    RecommendedAuthor,
    HotArticles,
    Advert,
  },
};
</script>

<style lang="stylus" scoped>
.el-row
  margin 0

.el-col
  border-radius 4px
.grid-content
  border-radius 4px
  min-height 36px
.recommended-author
  min-height 300px
.hot-articles
  min-height 350px
.advert
  min-height 200px
</style>
<template>
  <div>
    <div class="article_list">
      <article v-for="(articleListDetail, index) in articleLists" :key="index">
        <div>
          <p>
            <el-link
              @click="showArticle(articleListDetail['article'].ID)"
              target="_blank"
              class="article-title"
            >{{articleListDetail['article'].article_title}}</el-link>
          </p>
        </div>
        <div>
          <p class="article-content">{{articleListDetail['article'].article_content}}</p>
        </div>
        <div class="article-time">
          <el-row type="flex" class="row-bg">
            <el-col :span="1" >
              <el-avatar size="small" :src="articleListDetail['articleAuthor'].ProfilePhoto"></el-avatar>
            </el-col>
            <el-col :span="23" class="article-info">
              <span class="article_info"> {{articleListDetail['articleAuthor'].user_name}} {{articleListDetail['article'].CreatedAt | timeParse}} 热度</span>
            </el-col>
          </el-row>
        </div>
      </article>
    </div>

    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="articleTotal"
        :current-page="currentPage"
        :page-size="pageSize"
        style="margin-top:20px;"
        :page-sizes="[10, 20, 50, 100]"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullscreenLoading: true,
      articleLists: [],
      pageSize: 10,
      articleTotal: 100,
      currentPage: 1,
    };
  },

  methods: {
    //点击进入 文章详情页
    showArticle(id) {
      this.$router.push("article/" + id);
    },
    //pageSize 发生改变时的钩子函数
    handleSizeChange(val) {
      this.pageSize = val;
      this.demo();
      // this.$router.go(0)
    },
    //currentPage 发生改变时的钩子函数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.demo();
    },
    async demo() {
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };

      let result = await this.$http.showArticleList(
        "/show_article_list",
        params
      );
      console.log(result);
      this.articleLists = result.data.articleList;
      this.articleTotal = result.data.articleTotal;
    },
  },

  mounted() {
    this.demo();
  },

  filters: {
    timeParse(r) {
      //2021-06-23T17:50:19.727311+08:00
      let pat = /\d+-\d+-\d+\w\d+:\d+:\d+/;
      //console.log(r.match(pat))
      return r.match(pat)[0].replace("T", " ");
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~../../assets/stylus/ellipsis.styl'
.article_list
  min-height 500px
.article-title
  font-size 20px
  color #3e4145
.article-content
  ellipsis()
  color #74787c
  font-size 16px
.article-time
  color #a1a3a6
  font-size 13px
  margin-bottom 30px
  border-bottom 1px solid #dcdfe6
.article-info
  margin-top 4px
</style>
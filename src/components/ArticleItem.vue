<template>
  <el-row justify="center" span="24">
    <el-col :sm="3" :md="3" :lg="3" :xl="3">
      <div class="grid-content"></div>
    </el-col>
    <el-col :sm="24" :md="24" :lg="18" :xl="18">
      <div>
        <h1>{{articleTitle}}</h1>
        <div>
          <el-avatar size="small" :src="articleAuthor.ProfilePhoto"></el-avatar>
          {{articleAuthor.user_name}}
        </div>

        <mavon-editor
          v-model="articleContent"
          :ishljs="true"
          codeStyle="qtcreator_dark"
          :boxShadow="false"
          :subfield="false"
          defaultOpen="preview"
          ref="md"
          :editable="false"
          :toolbarsFlag="false"
          :navigation="false"
          class="article_content"
          previewBackground="Transparent"
        />
      </div>
    </el-col>
    <el-col :sm="3" :md="3" :lg="3" :xl="3">
      <div class="grid-content"></div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      articleTitle: "",
      articleContent: "",
      articleAuthor: {},
    };
  },

  async created() {
    //获取文章的id
    console.log(this.$route.params);
    let article_id = this.$route.params.id;
    let result = await this.$http.showArticle("/show_article/" + article_id);

    if (result.data.code === 2008) {
      //this.$router.push("")
      console.log(result);
      this.$router.push("/home/articles");
    } else {
      this.articleTitle = result.data.article.article_title;
      this.articleContent = result.data.article.article_content;
      this.articleAuthor = result.data.articleAuthor;
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '~mavon-editor/dist/css/index.css'

.el-row
  margin 0
  .el-col
    border-radius 4px
    .grid-content
      border-radius 4px
      min-height 36px
.article_content
  z-index 0
</style>
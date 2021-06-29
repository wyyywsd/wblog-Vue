<template>
  <el-dialog
    title="写文章"
    :visible.sync="newArticleDialogVisible"
    width="80%"
    :modal-append-to-body="false"
    :show-close="false"
    top="50px"
  >
    <div class="login-form">
      <el-form label-position="right" label-width="50px" :model="formArticleContent">
        <el-form-item label="名称">
          <el-input v-model="formArticleContent.ArticleTitle"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- markdown编辑器 -->
          <mavon-editor
            v-model="formArticleContent.ArticleContent"
            :ishljs="true"
            codeStyle="qtcreator_dark"
            :boxShadow="false"
            placeholder="请用markdown编写..."
            defaultOpen="edit"
            ref="md"
            @imgAdd="$imgAdd"
            @change="change"
          />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="formArticleContent.ArticleLabel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" size="small">提交</el-button>
          <el-button
            @click="setActionNewArticleDialogVisibleState(!newArticleDialogVisible)"
            size="small"
          >取 消</el-button>
          <el-button @click="resetForm('ruleForm')" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      formArticleContent: {
        ArticleTitle: "",
        ArticleContent: "",
        ArticleLabel: "",
      },
    };
  },
  computed: {
    ...mapState("articles", {
      newArticleDialogVisible: "newArticleDialogVisibleState",
    }),
  },
  methods: {
    ...mapActions("articles", ["setActionNewArticleDialogVisibleState"]),
    async submitForm() {
      let params = {
        article_title: this.formArticleContent.ArticleTitle,
        article_content: this.formArticleContent.ArticleContent,
      };
      let result = await this.$http.createArticle("/create_article", params);
      console.log(result);
      this.setActionNewArticleDialogVisibleState(false);
    },
    change(value, render) {
      // console.log(value);
      //console.log(render);
    },
    // 绑定@imgAdd event
    async $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData();
      formdata.append("image", $file);
      console.log(this.$refs.md);
      let result = await this.$http.upLoad("/upload", formdata)
      console.log(result)
      let _res = result.data;
      // 第二步.将返回的url替换到文本原位置[外链图片转存失败(img-Anv63SQR-1564734760257)(0)] -> [外链图片转存失败(img-OVX7vZS4-1564734760259)(url)]
      this.$refs.md.$img2Url(pos, _res.url);
   
 


      //this.$http.upLoad('/upload',formdata, this.$vm)
      // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      /**
       * $vm 指为mavonEditor实例，可以通过如下两种方式获取
       * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
       * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
       */
      //$vm.$img2Url(pos, url);
      
    },
  },
};
</script>

<style lang="stylus" scoped></style>
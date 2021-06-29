<template>
  <div>
    {{apiDemo}}
    关于我是谁
    <button @click="loadApiDemo()">dd</button>
    <button @click="saveStorage()">ff</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      apiDemo: "",
    };
  },


  methods: {

    async loadApiDemo() {
     
      let result = await this.$http.apiDemo("/demo");
      this.apiDemo = result;
      // let result = await this.axios.get('/signin')
      // .then((response) => {
      //   console.log(response.data);
      // });
      // this.apiDemo = result
    },
    // saveStorage() {
    //   localStorage.setItem('test', '123')
    // }

  },
};
</script>

<style>
</style>
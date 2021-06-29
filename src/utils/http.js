import axios from 'axios'
import store from '../store'
import { Message } from "element-ui";
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://192.168.50.200:8081/api/v1',
      timeout: 1000
    }),
      // 添加请求拦截器 
      this.instance.interceptors.request.use(function (config) {
        console.log("请求被拦截了")
        // 在发送请求之前 将token放在header中
        let token = localStorage.getItem("token")
        if (token) {
          config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config;
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      });
    //添加一个响应拦截器, 判断 如果token无效 就删除本地localStorage中的token
    this.instance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      console.log("被拦截器拦截了")
      console.log(response)
      //console.log(response.data.code)
      if (response.data.tokenCode === 2004 || response.data.tokenCode === 2005 || response.data.tokenCode === 2006) {
        localStorage.removeItem("token")
        localStorage.removeItem("current_user")
        //设置store中的isLoginState属性
        store.dispatch("user/setActionIsLoginState",false)
        if (response.data.tokenCode === 2006) {
          Message.warning({
            message: "请重新登陆!",
          });
        }
      }
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });


  }

  //用来做测试的api
  apiDemo(url) {
    return new Promise((resolve, reject) => {
      this.instance.get(url)
        .then((result) => {
          //console.log(url)
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  //注册的api
  signUp(url, params) {
    return new Promise((resolve, reject) => {
      this.instance.post(url, params)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  //登陆的api
  auth(url, params) {
    return new Promise((resolve, reject) => {
      this.instance.post(url, params)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  //创建文章
  createArticle(url, params) {
    return new Promise((resolve, reject) => {
      this.instance.post(url, params)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })

  }
  //显示文章
  showArticle(url) {
    //console.log(token)
    return new Promise((resolve, reject) => {
      this.instance.get(url)
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  //获取文章列表
  showArticleList(url, params = {}) {
    return new Promise((resolve, reject) => {

      this.instance.get(url, { params })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  //上传文章内的图片
  upLoad(url,data) {
    return new Promise((resolve,reject)=> {
      this.instance.post(url,data, {headers: { 'Content-Type': 'multipart/form-data' }})
      .then((result)=> {
        resolve(result)
      })
       .catch((err) => {
          reject(err)
        })
    })
  }

  updateUserInfo(url, params) {
    return new Promise((resolve, reject)=> {
      this.instance.post(url,params)
      .then((result)=> {
        resolve(result)
      })
      .catch((err)=> {
        reject(err)
      })
    })
  }
}

export default Http
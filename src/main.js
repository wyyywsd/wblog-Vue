import Vue from 'vue'
import App from './App.vue'
import Http from './utils/http'
Vue.prototype.$http = new Http()
import router from './router'
import store from './store'


Vue.config.productionTip = false
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

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
  Image,
  Switch,
  Upload,
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
Vue.use(Image);
Vue.use(Switch);
Vue.use(Upload);
Vue.component(Message.name, Message);
// use
Vue.use(mavonEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

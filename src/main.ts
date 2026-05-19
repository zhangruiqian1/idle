import {createApp} from 'vue'
import {createPinia} from "pinia";
import {router} from "@/router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './assets/css/global.css'
import App from "@/App.vue";
import {game} from "@/game";
import {startAllThread} from "@/game/thread";

const pinia = createPinia()


const app = createApp(App)

app
    .use(pinia)
    .use(router)
    .use(Antd)
    .mount('#app')


game.start()
startAllThread()
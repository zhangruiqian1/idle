import {createRouter, createWebHashHistory} from "vue-router";
import {staticRoutes} from "@/router/route.ts";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [...staticRoutes],
});
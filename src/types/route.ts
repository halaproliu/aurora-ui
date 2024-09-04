import type { RouteComponent } from 'vue-router'

export interface Route {
    path: string;
    name?: string;
    fullPath?: string;
    component?: RouteComponent;
    redirect?: string;
}
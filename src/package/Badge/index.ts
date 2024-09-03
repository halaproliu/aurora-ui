import { App } from 'vue';
import Badge from './badge.vue';
import { BadgeProps } from './interface';

Badge.install = (app: App) => {
    app.component(Badge.name as string, Badge);
};

export { Badge };
export type { BadgeProps };

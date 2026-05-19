import {notification} from "ant-design-vue";
import type {NotificationPlacement} from "ant-design-vue/es/notification/interface";

export const notify = (
    {
        msg,
        desc,
        duration = 3,
        placement = 'bottomRight'
    }: {
        msg: string;
        desc: string;
        duration?: number;
        placement?: NotificationPlacement;
    }
) => {
    notification.open({
        message: msg,
        description: desc,
        duration,
        placement
    });
}


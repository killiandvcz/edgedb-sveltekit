import {notifications} from "$lib/stores/notifications.stores.js";
import {notificationsOrder} from "$lib/stores/notifications.stores.js";
import {get} from "svelte/store";

export const newNotification = ({
    type = "info",
    title = "Nouvelle Notification",
    description = "Description",
    date = new Date(),
}, exp) => {
    const uuid = Date.now();

    get(notifications)[uuid] = {
        type, title, description, date
    }
    notifications.set(get(notifications));
    notificationsOrder.set([...get(notificationsOrder), uuid]);

    if (exp) {
        setTimeout(() => {
            deleteNotification(uuid);
        }, exp)
    }

}

export const deleteNotification = (uuid) => {
    notificationsOrder.set(get(notificationsOrder).filter(e => e !== uuid))
    delete get(notifications)[uuid]
    notifications.set(get(notifications));
}


export const NotifyErrors = (e, {title = "Une erreur est survenue", exp = 5000}) => {
    if (e.errors){
        e.errors.forEach(err => {
            newNotification({
                type: 'error',
                title,
                description: err.message
            }, exp);
        })
    }
}
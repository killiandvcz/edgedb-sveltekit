import {newNotification, NotifyErrors} from "$lib/functions/helpers/stores/notifications.js";

export function get(endpoint, fn = fetch) {
    return fn(endpoint, {
        method: 'GET',
        credentials: 'include'
    }).then((r) => r.json()).then(r => {
        if (r.pass) {
            return r;
        } else {
            throw r;
        }
    });
}

export function post(endpoint, data = {}, fn = fetch) {
    return fn(endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data || {}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((r) => r.json()).then(r => {
        if (r.pass) {
            return r;
        } else {
            throw r;
        }
    })
}

export function superPost({
    endpoint,
    data = {},
    fn = fetch,
    success = () => {},
    error = () => {},
    notifications = {
        success: false,
        error: false
    }
}) {
    return post(endpoint, data, fn).then(r => {
        if (notifications.success){
            newNotification({
                type: notifications.success.type || 'success',
                title: notifications.success.title,
                description: notifications.success.description,
            }, 5000);
        }
        success(r);
        return {...r, pass: true};
    }).catch(r => {
        if (notifications.error){
            NotifyErrors(r, notifications.error);
        }
        error(r);
        return {...r, pass: false};
    })
}

export function postAndNotify({endpoint, data}){
    return post(endpoint, data).catch(e => {
        if (e.errors){
            e.errors.forEach(err => {
                newNotification({
                    type: 'error',
                    title: 'Connexion impossible',
                    description: err.message
                }, 5000);
            })
        }
        throw e;
    })
}
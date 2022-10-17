
export const deleteCookie = (name) => {
    return {
        'set-cookie': [`${name}=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`],
    }
}

export const setCookie = ({name, content, age = 60 * 60 * 24 * 7}) => {
    return {
        'set-cookie': [`${name}=${content}; HttpOnly; Max-Age=${age}; Path=/`]
    }
}
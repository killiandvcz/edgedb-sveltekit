export const string = (str) => {

    const escaped = str.replaceAll(`"`, `\\"`);
    return `"${escaped}"`;
}

export const uuid = (id) => {
    return `<uuid>"${id}"`;
}

export const set = (arr, type) => {
    return `{${arr.map(e => type(e)).join(", ")}}`;
}

export const json = (obj) => {
    return `
        (
            ${Object.keys(obj).map(key => `${key} := ${whichType(obj[key])}`).join(", ")}
        )
    `
}

export const whichType = (obj) => {
    if (typeof obj === "string"){
        return string(obj);
    } else if (typeof obj === "object"){
        return json(obj);
    } else if (typeof obj === "number"){
        return obj;
    }
}
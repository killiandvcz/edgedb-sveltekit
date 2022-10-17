import {edgeClient} from "$lib/db/client.js";

export const query = (query) => edgeClient.query(query).then(res => {
    // console.log({res});
    return {
        pass: true,
        data: res
    }
}).catch(e => {
    // console.log(e);
    return {
        pass: false,
        code: e.code
    }
});

export const querySingle = (query) => edgeClient.querySingle(query).then(res => {
    // console.log({res});
    return {
        pass: true,
        data: res
    }
}).catch(e => {
    console.log({e});
    return {
        pass: false,
        code: e.code
    }
});
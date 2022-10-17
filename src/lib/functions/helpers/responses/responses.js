export const response = ({status = 200, body = {}, headers}) => {
    return new Response(JSON.stringify({
        pass: true,
        ...body
    }), {status, headers})
}
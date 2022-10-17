import {error} from "@sveltejs/kit";

export const handleErrors = ({status, code, errors, headers, thr = true}) => {
    return new Response(JSON.stringify({
        pass: false,
        code,
        errors
    }), {status, headers})
}


export const handleSchemaErrors = (schema) => {
    let errors = [];
    schema.error.issues.forEach(issue => {
        errors.push({
            message: issue.message,
            path: issue.path
        });
    })
    return handleErrors({
        status: 400,
        code: 'INVALID_SCHEMA',
        errors
    });
}

export const handleQueryErrors = (query, {alreadyExist = ""}) => {
    if (query.code === 84017153){
        return handleAlreadyExistsError(alreadyExist);
    }
    return handleErrors({
        status: 400,
        code: 'UNKNOWN_ERROR',
        queryCode: query.code,
        errors: [
            {
                message: 'Une erreur inconnue s\'est produite'
            }
        ]
    })
}


export const handleForbiddenError = handleErrors({
    status: 401,
    code: "NOT_ALLOWED",
    errors: [
        {
            message: "Action non-autorisée"
        }
    ],
})

export const handleAlreadyExistsError = (message) => {
    return handleErrors({
        status: 400,
        code: 'ALREADY_EXISTS',
        errors: [
            {
                message
            }
        ]
    })
}
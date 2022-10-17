export const getFormErrors = (issues) => {
    const errors = {};
    issues.forEach(issue => {
        issue.path.forEach(path => {
            if (!errors[path]) {
                errors[path] = [];
                errors[path].push(issue.message);
            }
        })
    })
    return errors;
}
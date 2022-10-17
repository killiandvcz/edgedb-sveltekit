export const pathnameToArray = (pathname) => {
    const pathnameArray = pathname.split('/');
    pathnameArray.splice(0,1);
    return pathnameArray;
}
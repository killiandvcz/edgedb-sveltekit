export const superMatch = (text, regex) => {
    let matches = []
    for (let match of text.matchAll(regex)){
        matches.push(match)
    }
    return matches;
}
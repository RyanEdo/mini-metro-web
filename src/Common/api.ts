export const getExistMap = (id:string) => {
    const url = `/${id}.json`;
    return fetch(url).then(res=>res.text());
}
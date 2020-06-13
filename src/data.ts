export type getDateType = (() => Promise<Date>);

export const getDate: getDateType = () => {
    return new Promise(( res, rej ) => {
        setTimeout(() => {
            res(new Date());
        }, 1000);
    });
};

export const login = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("sfsdfsdfsdfsdf");
        }, 600);
    });
}

export const logout = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 600);
    });
}
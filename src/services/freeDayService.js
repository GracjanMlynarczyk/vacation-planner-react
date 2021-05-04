export const getFreeDays = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    day: 1,
                    month: 3,
                    year: 2020,
                    repeatable: false
                },
                {
                    id: 2,
                    day: 2,
                    month: 3,
                    year: null,
                    repeatable: true
                }
            ]);
        }, 300);
    });
}

export const addFreeDay = function (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(true);
        }, 300);
    });
}

export const deleteFreeDay = function (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 300);
    });
}
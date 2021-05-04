export const getDevices = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    owner: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    },
                    name: "sdfsdf",
                    status: {
                        name: "sdfsfd"
                    },
                    serial: "fdsdfsf",
                    category: {
                        name: "category"
                    }
                },
                {
                    id: 2,
                    owner: {
                        firstName: "Gracjan2",
                        lastName: "Młynarczyk2"
                    },
                    name: "sdfsdf2",
                    status: {
                        name: "sdfsfd2"
                    },
                    serial: "fdsdfsf2",
                    category: {
                        name: "category2"
                    }
                }
            ]);
        }, 300);
    });
}

export const getDevice = function(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 2,
                owner: {
                    firstName: "Gracjan2",
                    lastName: "Młynarczyk2"
                },
                name: "sdfsdf2",
                status: {
                    name: "sdfsfd2"
                },
                serial: "fdsdfsf2",
                category: {
                    name: "category2"
                },
                device_category_id: 1
            });
        }, 300);
    });
}

export const addDevice = function (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(true);
        }, 300);
    });
}

export const editDevice = function (id, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(true);
        }, 300);
    });
}

export const deleteDevice = function (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 300);
    });
}
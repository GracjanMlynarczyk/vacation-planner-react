export const getDeviceCategories = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: "Computer"
                },
                {
                    id: 2,
                    name: "Mouse"
                },
                {
                    id: 3,
                    name: "Keyboard"
                },
                {
                    id: 4,
                    name: "Monitor"
                },
            ]);
        }, 300);
    });
}

export const getDeviceCategory = function(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 4,
                name: "Monitor",
                devices: [
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
                        serial: "fdsdfsf"
                    }
                ]
            });
        }, 300);
    });
}

export const addDeviceCategory = function (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(true);
        }, 300);
    });
}

export const editDeviceCategory = function (id, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(true);
        }, 300);
    });
}

export const deleteDeviceCategory = function (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 300);
    });
}
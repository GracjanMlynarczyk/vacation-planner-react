import { generateData } from "../helpers/dev/devHelper";

export const getUser = function(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                firstName: "Gracjan2",
                lastName: "Młynarczyk2",
                email: "gracjan.mlynarczyk@codetain.com",
                position_id: 1,
                position: {
                    name: "Junior PHP Developer",
                    holidays_days: 20
                },
                department: {
                    name: "PHP Team"
                },
                department_id: 1,
                is_admin: true,
                days_per_year: 22,
                holidayDay: {
                    not_used_days: 22,
                    used_days: 0
                },
                active: 0,
                devices: [
                    {
                        id: 1,
                        name: "Mac",
                        serial: "sdfsdf",
                        status: {
                            name: "Zajęty"
                        },
                        category: {
                            name: "lapek"
                        }
                    }
                ]
            });
        }, 700);
    });
}

export const editUser = function(id, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data)
            resolve(true);
        }, 700);
    });
}

export const getUsers = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(generateData(20));
        }, 700);
    });
}

export const deleteUser = function (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 700);
    });
}

export const acceptUser = function (id, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data)
            resolve(true);
        }, 700);
    });
}
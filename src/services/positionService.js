export const getPositions = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: "Senior PHP",
                    holidays_days: 30,
                    can_accept_proposals: true
                },
                {
                    id: 2,
                    name: "PHP",
                    holidays_days: 25,
                    can_accept_proposals: false
                },
                {
                    id: 3,
                    name: "Junior PHP",
                    holidays_days: 20,
                    can_accept_proposals: false
                }
            ]);
        }, 300);
    });
}

export const getPosition = function(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: "Senior PHP",
                holidays_days: 30,
                can_accept_proposals: true,
                users: [
                    {
                        id: 1,
                        firstName: "sdfsdf",
                        lastName: "sdfsdf",
                        email: "sdfsdf",
                        department: {
                            name: "sdfsdf"
                        }
                    }
                ]
            });
        }, 300);
    });
}

export const addPosition = function (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(true);
        }, 300);
    });
}

export const editPosition = function (id, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(true);
        }, 300);
    });
}

export const deletePosition = function (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 300);
    });
}
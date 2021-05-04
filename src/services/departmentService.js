export const getDepartments = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: "PHP Team",
                    owner_id: 1,
                    owner: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    }
                },
                {
                    id: 2,
                    name: "Backend Team",
                    owner_id: 1,
                    owner: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    }
                },
                {
                    id: 3,
                    name: "Frontend Team",
                    owner_id: 1,
                    owner: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    }
                }
            ]);
        }, 300);
    });
}

export const getDepartment = function(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                    id: 1,
                    name: "PHP Team",
                    owner_id: 1,
                    owner: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    },
                    users: [
                        {
                            id: 1,
                            firstName: "sdfsdf",
                            lastName: "sdfsdf",
                            email: "sdfsdf",
                            position: {
                                name: "sdfsdf"
                            }
                        }
                    ]
                });
        }, 300);
    });
}

export const addDepartment = function (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(true);
        }, 300);
    });
}

export const editDepartment = function (id, data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(data);
            resolve(true);
        }, 300);
    });
}

export const deleteDepartment = function (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 300);
    });
}
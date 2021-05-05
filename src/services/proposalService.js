export const getMyProposals = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    proposalStatus: {
                        name: "Accepted",
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    acceptedBy: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    },
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                },
                {
                    id: 2,
                    proposalStatus: {
                        name: "Waiting",
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    acceptedBy: null,
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                },
                {
                    id: 3,
                    proposalStatus: {
                        name: "Rejected",
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    acceptedBy: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    },
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                },
            ]);
        }, 300);
    });
}
export const addProposal = function (value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(value);
            resolve(true);
        }, 300);
    });
}

export const deleteProposal = function (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 300);
    });
}

export const editProposal = function (id, value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(value);
            resolve(true);
        }, 300);
    });
}

export const changeStatusProposal = function (id, status) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(status);
            resolve(true);
        }, 300);
    });
}

export const getAcceptedProposals = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    proposalStatus: {
                        name: "Accepted",
                    },
                    user: {
                        firstName: "first",
                        lastName: "last",
                        department: {
                            name: "Dep"
                        }
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    acceptedBy: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    },
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                },
                {
                    id: 3,
                    proposalStatus: {
                        name: "Accepted",
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    user: {
                        firstName: "first",
                        lastName: "last",
                        department: {
                            name: "Dep"
                        }
                    },
                    acceptedBy: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    },
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                }
            ]);
        }, 300);
    });
}


export const getProposal = function (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                proposalStatus: {
                    name: "Accepted",
                },
                user: {
                    firstName: "first",
                    lastName: "last",
                    department: {
                        name: "Dep"
                    }
                },
                proposalType: {
                    id: 1,
                    name: "Paid",
                },
                acceptedBy: {
                    firstName: "Gracjan",
                    lastName: "Młynarczyk"
                },
                startDate: "2021-05-25",
                endDate: "2021-05-26",
                number_of_days: 2,
                comment: "sdfsdfsdfsdfsdfsdfsdf"
            });
        }, 300);
    });
}

export const getAllProposals = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    proposalStatus: {
                        name: "Accepted",
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    user: {
                        firstName: "first",
                        lastName: "last",
                        department: {
                            name: "Dep"
                        },
                        holidayDay: {
                            not_used_days: 5,
                            used_days: 2
                        }
                    },
                    acceptedBy: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    },
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                },
                {
                    id: 2,
                    proposalStatus: {
                        name: "Waiting",
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    user: {
                        firstName: "first",
                        lastName: "last",
                        department: {
                            name: "Dep"
                        },
                        holidayDay: {
                            not_used_days: 5,
                            used_days: 2
                        }
                    },
                    acceptedBy: null,
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                },
                {
                    id: 3,
                    proposalStatus: {
                        name: "Rejected",
                    },
                    user: {
                        firstName: "first",
                        lastName: "last",
                        department: {
                            name: "Dep"
                        },
                        holidayDay: {
                            not_used_days: 5,
                            used_days: 2
                        }
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    acceptedBy: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    },
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                },
            ]);
        }, 300);
    });
}

export const getProposalsToAccept = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    proposalStatus: {
                        name: "Waiting",
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    user: {
                        firstName: "first",
                        lastName: "last",
                        department: {
                            name: "Dep"
                        },
                        holidayDay: {
                            not_used_days: 5,
                            used_days: 2
                        }
                    },
                    acceptedBy: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    },
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                },
                {
                    id: 2,
                    proposalStatus: {
                        name: "Waiting",
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    user: {
                        firstName: "first",
                        lastName: "last",
                        department: {
                            name: "Dep"
                        },
                        holidayDay: {
                            not_used_days: 5,
                            used_days: 2
                        }
                    },
                    acceptedBy: null,
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                },
                {
                    id: 3,
                    proposalStatus: {
                        name: "Waiting",
                    },
                    user: {
                        firstName: "first",
                        lastName: "last",
                        department: {
                            name: "Dep"
                        },
                        holidayDay: {
                            not_used_days: 5,
                            used_days: 2
                        }
                    },
                    proposalType: {
                        name: "Paid",
                    },
                    acceptedBy: {
                        firstName: "Gracjan",
                        lastName: "Młynarczyk"
                    },
                    startDate: "2021-05-25",
                    endDate: "2021-05-26",
                    number_of_days: 2,
                    comment: "sdfsdfsdfsdfsdfsdfsdf"
                },
            ]);
        }, 300);
    });
}
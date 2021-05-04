import faker from "faker";

export const generateData = (numResults) => {
    let total = numResults;

    const data = []

    for (let i = 0; i < total; i += 1) {
        const row = {
            id: i,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            department: {
                name: faker.name.jobArea()
            },
            position:  {
                name: faker.name.jobTitle()
            },
            birthday: "1997-06-03",
            days_per_year: 22,
            is_admin: faker.datatype.boolean(),
            active: faker.datatype.boolean(),
            holidayDay: {
                not_used_days: 22,
                used_days: 0
            },
            devices: []
        }




        // Add random attributes to random rows (after the first)
        if (i > 0 && faker.datatype.boolean()) {
            const column = faker.database.column()

            if (!row[column]) {
                row[column] = faker.datatype.number()
            }
        }

        data.push(row)
    }
    return data
}
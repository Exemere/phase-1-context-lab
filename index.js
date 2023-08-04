function createEmployeeRecord(rec) {
    return {
        firstName: rec[0],
        familyName: rec[1],
        title: rec[2],
        payPerHour: rec[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(([firstName, familyName, title, payPerHour]) =>
        createEmployeeRecord(firstName, familyName, title, payPerHour)
    );
}

// Function to create a timeIn event for an employee
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date,
    });
    return employeeRecord;
}

// Function to create a timeOut event for an employee
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date,
    });
    return employeeRecord;
}

// Function to calculate hours worked on a specific date for an employee
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date).hour;
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100; // Assuming employees always check in and out on the hour
}

// Function to calculate wages earned on a specific date for an employee

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

// Function to calculate all wages for an employee

function allWages(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0);
}


// Function to find an employee record by first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employeeRecord => employeeRecord.firstName === firstName);
}

// Function to calculate the payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => totalPayroll + allWages(employeeRecord), 0);
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


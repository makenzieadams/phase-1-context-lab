function createEmployeeRecord(array) {
  let firstName = array[0];
  let familyName = array[1];
  let title = array[2];
  let payPerHour = array[3];

  let timeInEvents = [];
  let timeOutEvents = [];

  let employeeObj = {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents,
    timeOutEvents,
  };
  return employeeObj;
}

function createEmployeeRecords(array) {
  return array.map(function (records) {
    return createEmployeeRecord(records);
  });
}

function createTimeInEvent(timestamp) {
  const splitTimes = timestamp.split(" ");

  const timeInEvent = {
    type: "TimeIn",
    date: splitTimes[0],
    hour: Number(splitTimes[1]),
  };

  this.timeInEvents.push(timeInEvent);

  return this;
}

function createTimeOutEvent(timestamp) {
  const splitTimes = timestamp.split(" ");

  const timeInEvent = {
    type: "TimeOut",
    date: splitTimes[0],
    hour: Number(splitTimes[1]),
  };

  this.timeOutEvents.push(timeInEvent);

  return this;
}

function hoursWorkedOnDate(date) {
  const n = this.timeInEvents.find((event) => {
    return event.date === date;
  });
  const out = this.timeOutEvents.find((event) => {
    return event.date === date;
  });

  let timeIn = n.hour;
  let timeOut = out.hour;
  let total = timeOut - timeIn;
  return total / 100;
}

function wagesEarnedOnDate(date) {
  const hours = hoursWorkedOnDate.call(this, date);
  return this.payPerHour * hours;
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(function (employee) {
    return name === employee.firstName;
  });
}

function calculatePayroll(employees) {
  let total = 0;

  employees.forEach((employee) => {
    const wages = allWagesFor.call(employee);
    total = wages + total;
  });

  return total;
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
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};

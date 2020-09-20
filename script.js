class Student {
    constructor(name) {
        this.name = name;
    }
}

class Teacher {
    constructor(name) {
        this.name = name;
    }
}

class Course {
    constructor(name, minStudents, maxStudents) {
        this.name = name;
        this.minStudents = minStudents;
        this.maxStudents = maxStudents;
    }
}

class Class {
    constructor(course, teacher, students) {
        this.course = course;
        this.teacher = teacher;
        this.students = students;
    }
}

function formClasses(course, teachers, students) {
    // If there are no students or no teachers, there can't possibly be any classes
    if (teachers.length == 0 || students.length == 0) {
        return [];
    }

    let classes = [];

    let baseNumOfStudentsPerClass = Math.floor(students.length / teachers.length);
    let numLeftoverStudents = students.length % teachers.length;

    let idx = 0;

    for (let t of teachers) {
        let numStudentsInThisClass = baseNumOfStudentsPerClass;

        // If there are leftover students, take one of them and add them to the current class
        if (numLeftoverStudents > 0) {
            numLeftoverStudents--;
            numStudentsInThisClass++;
        }

        classes.push(new Class(course, t, students.slice(idx, idx + numStudentsInThisClass)));
        idx += numStudentsInThisClass;
    }

    for (let c of classes) {
        if (c.students.length < course.minStudents) {
            // If there is an excess of teachers, remove one teacher and try forming classes again
            teachers.pop();
            return formClasses(course, teachers, students);
        } else if (c.students.length > course.maxStudents) {
            // If there is instead an excess of students, remove one student and try forming classes again
            students.pop();
            return formClasses(course, teachers, students);
        }
    }

    return classes;
}

let courseNameInput = document.getElementById("courseNameInput");
let courseMinStudentsInput = document.getElementById("courseMinStudentsInput");
let courseMaxStudentsInput = document.getElementById("courseMaxStudentsInput");

let studentInput = document.getElementById("studentInput");
let studentAddButton = document.getElementById("studentAddButton");
let studentList = document.getElementById("studentList");
let studentRemoveButton = document.getElementById("studentRemoveButton");

studentInput.onkeyup = function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        studentAddButton.click();
    }
}

studentAddButton.onclick = function (event) {
    if (studentInput.value) {
        let entry = document.createElement("li");
        entry.appendChild(document.createTextNode(studentInput.value));
        studentList.appendChild(entry);
        studentInput.value = "";
    }
}

studentRemoveButton.onclick = function (event) {
    let entries = getListEntries(studentList);
    let numEntries = entries.length;
    if (numEntries > 0) {
        studentList.removeChild(entries[numEntries - 1]);
    }
}

let teacherInput = document.getElementById("teacherInput");
let teacherAddButton = document.getElementById("teacherAddButton");
let teacherList = document.getElementById("teacherList");
let teacherRemoveButton = document.getElementById("teacherRemoveButton");

teacherInput.onkeyup = function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        teacherAddButton.click();
    }
}

teacherAddButton.onclick = function (event) {
    if (teacherInput.value) {
        let entry = document.createElement("li");
        entry.appendChild(document.createTextNode(teacherInput.value));
        teacherList.appendChild(entry);
        teacherInput.value = "";
    }
}

teacherRemoveButton.onclick = function (event) {
    let entries = getListEntries(teacherList);
    let numEntries = entries.length;
    if (numEntries > 0) {
        teacherList.removeChild(entries[numEntries - 1]);
    }
}

let formClassesButton = document.getElementById("formClassesButton");

formClassesButton.onclick = function (event) {
    let studentEntries = Array.from(getListEntries(studentList));
    let students = studentEntries.map(entry => new Student(entry.innerHTML));

    let teacherEntries = Array.from(getListEntries(teacherList));
    let teachers = teacherEntries.map(entry => new Student(entry.innerHTML));

    let classes = formClasses(new Course(courseNameInput.value, courseMinStudentsInput.value, courseMaxStudentsInput.value), teachers, students);

    let classesDiv = document.getElementById("classes");
    classesDiv.innerHTML = ""; // Clears any existing classes.

    for (let c of classes) {
        let teacher = document.createElement("p");
        teacher.appendChild(document.createTextNode("Teacher: " + c.teacher.name));
        classesDiv.appendChild(teacher);

        let studentDisplayList = document.createElement("ul");
        let thing = document.createElement("p");
        thing.appendChild(document.createTextNode("Students:"));
        classesDiv.appendChild(thing);
        for (let s of c.students) {
            let student = document.createElement("li");
            student.appendChild(document.createTextNode(s.name));
            classesDiv.appendChild(student);
        }
    }
}

function getListEntries(list) {
    return list.getElementsByTagName("li");
}

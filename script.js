class Teacher {
    constructor(name) {
        this.name = name;
    }
}

class Student {
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

function getListEntries(list) {
    return list.getElementsByTagName("li");
}

function createListEntryFromNameInput(nameInput) {
    let entry = null;
    if (nameInput.value) {
        entry = document.createElement("li");
        entry.appendChild(document.createTextNode(nameInput.value));
        nameInput.value = "";
    }

    return entry;
}

function removeLastListEntry(list) {
    let entries = getListEntries(list);
    let numEntries = entries.length;
    if (numEntries > 0) {
        list.removeChild(entries[numEntries - 1]);
    }
}

let teacherInput = document.getElementById("teacherInput");

let teacherNameInput = teacherInput.querySelector(".nameInput");
let teacherAddButton = teacherInput.querySelector(".addButton");
let teacherRemoveButton = teacherInput.querySelector(".removeButton");
let teacherList = teacherInput.querySelector(".list");

teacherNameInput.onkeyup = function (event) {
    if (event.key === "Enter") { teacherAddButton.click(); }
}

teacherAddButton.onclick = function () {
    let entry = createListEntryFromNameInput(teacherNameInput);
    if (entry) { teacherList.appendChild(entry); }
}

teacherRemoveButton.onclick = function (event) {
    removeLastListEntry(teacherList);
}

let studentInput = document.getElementById("studentInput");

let studentNameInput = studentInput.querySelector(".nameInput");
let studentAddButton = studentInput.querySelector(".addButton");
let studentRemoveButton = studentInput.querySelector(".removeButton");
let studentList = studentInput.querySelector(".list");

studentNameInput.onkeyup = function (event) {
    if (event.key === "Enter") { studentAddButton.click(); }
}

studentAddButton.onclick = function (event) {
    let entry = createListEntryFromNameInput(studentNameInput);
    if (entry) { studentList.appendChild(entry); }
}

studentRemoveButton.onclick = function (event) {
    removeLastListEntry(studentList);
}

let courseInput = document.getElementById("courseInput");
let formClassesButton = document.getElementById("formClassesButton");

let classesOutput = document.getElementById("classesOutput");

formClassesButton.onclick = function (event) {
    let teachers = Array.from(getListEntries(teacherList)).map(entry => new Teacher(entry.innerHTML));
    let students = Array.from(getListEntries(studentList)).map(entry => new Student(entry.innerHTML));

    let classes = formClasses(
        new Course(
            courseInput.querySelector(".nameInput").value,
            courseInput.querySelector(".minStudentsInput").value,
            courseInput.querySelector(".maxStudentsInput").value
        ),
        teachers, students
    );

    classesOutput.innerHTML = ""; // Clears any existing output.

    for (let c of classes) {
        let teacherName = document.createElement("p");
        teacherName.appendChild(document.createTextNode("Teacher: " + c.teacher.name));
        classesOutput.appendChild(teacherName);

        let studentNames = document.createElement("ul");
        for (let s of c.students) {
            let studentName = document.createElement("li");
            studentName.appendChild(document.createTextNode(s.name));
            studentNames.appendChild(studentName);
        }
        classesOutput.appendChild(studentNames);
    }
}

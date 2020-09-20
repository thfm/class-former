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

let english = new Course("English", 1, 1);

let teachers = [new Teacher("Teacher 1"), new Teacher("Teacher 2")];
let students = [new Student("Student 1"), new Student("Student 2"), new Student("Student 3")];

console.log(formClasses(english, teachers, students));

let input = document.getElementById("studentInput");
let addButton = document.getElementById("studentAddButton");
let list = document.getElementById("studentList");
let removeButton = document.getElementById("studentRemoveButton");

input.onkeyup = function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addButton.click();
    }
}

addButton.onclick = function (event) {
    if (input.value) {
        let entry = document.createElement("li");
        entry.appendChild(document.createTextNode(input.value));
        list.appendChild(entry);
        input.value = "";
    }
}

removeButton.onclick = function (event) {
    let entries = list.getElementsByTagName("li");
    let numEntries = entries.length;
    if (numEntries > 0) {
        let lastEntry = entries[numEntries - 1];
        list.removeChild(lastEntry);
    }
}

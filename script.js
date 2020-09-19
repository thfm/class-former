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


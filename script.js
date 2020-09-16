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

}
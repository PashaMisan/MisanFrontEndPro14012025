class Student {
    static GRADE_THRESHOLD = 90;
    static ATTENDANCE_THRESHOLD = 0.9;

    #firstName;
    #lastName;
    #birthDate;
    #grades = [];
    #attendance = new Array(25);

    constructor(firstName, lastName, birthDate) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#birthDate = birthDate;
    }

    get firstName() {
        return this.#firstName;
    }

    get age() {
        const today = new Date();
        const birthDate = this.#birthDate;
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        let age = today.getFullYear() - birthDate.getFullYear();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    }

    get averageGrade() {
        const grades = this.#grades;
        const gradesCount = grades.length;

        if (!gradesCount) return 0;

        return grades.reduce((acc, grade) => acc + grade) / gradesCount;
    }

    get averageAttendance() {
        const attended = this.#attendance.filter(value => typeof value === 'boolean');
        const attendedCount = attended.length;

        if (!attendedCount) return 0;

        return attended.reduce((sum, bool) => sum + bool) / attendedCount;
    }

    addGrade(grade) {
        if (grade >= 0 && grade <= 100) {
            this.#grades.push(grade);
        } else {
            alert("Оцінка повинна бути між 0 і 100");
        }
    }

    present() {
        this.#addAttendance(true);
    }

    absent() {
        this.#addAttendance(false);
    }

    summary() {
        const averageGrade = this.averageGrade;
        const averageAttendance = this.averageAttendance;

        if (averageGrade > Student.GRADE_THRESHOLD && averageAttendance > Student.ATTENDANCE_THRESHOLD) {
            return "Молодець!";
        }

        return averageGrade <= Student.GRADE_THRESHOLD && averageAttendance <= Student.ATTENDANCE_THRESHOLD ?
            'Редиска!' :
            'Добре, але можна краще';
    }

    #addAttendance(value) {
        this.#attendance.pop();
        this.#attendance.unshift(value);
    }
}

const student1 = new Student("Іван", "Іванов", new Date(2000, 5, 15));
const student2 = new Student("Марія", "Петренко", new Date(1998, 2, 25));
const student3 = new Student("Олександр", "Коваль", new Date(2001, 8, 5));

student1.addGrade(95);
student1.addGrade(88);
student1.addGrade(92);

student2.addGrade(92);
student2.addGrade(87);
student2.addGrade(92);

student3.addGrade(80);
student3.addGrade(65);
student3.addGrade(70);

student1.present();
student1.present();
student1.present();

student2.present();
student2.absent();
student2.present();

student3.absent();
student3.absent();
student3.present();

console.log(`${student1.firstName} - ${student1.summary()}`);
console.log(`${student2.firstName} - ${student2.summary()}`);
console.log(`${student3.firstName} - ${student3.summary()}`);
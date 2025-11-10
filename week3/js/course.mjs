// course.mjs
const byuiCourse = {
  code: "CSE 121b",
  name: "JavaScript Language",
  sections: [
    { sectionNum: 1, enrolled: 26, maxCapacity: 30 },
    { sectionNum: 2, enrolled: 25, maxCapacity: 30 },
    { sectionNum: 3, enrolled: 30, maxCapacity: 30 }
  ],

  changeEnrollment(sectionNum, enroll = true) {
    const section = this.sections.find(s => s.sectionNum == sectionNum);
    if (!section) return;

    if (enroll && section.enrolled < section.maxCapacity) {
      section.enrolled += 1;
    } else if (!enroll && section.enrolled > 0) {
      section.enrolled -= 1;
    }
  }
};

export default byuiCourse;

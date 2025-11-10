const byuiCourse = {
  code: "WDD231",
  name: "Web Frontend Development I",
  sections: [
    { section: 1, enrolled: 88, instructor: "Godswill Etim" },
    { section: 2, enrolled: 81, instructor: "Emmanuel Effiong" },
    { section: 3, enrolled: 95, instructor: "Jesuina Otonye" }
  ],

  changeEnrollment(sectionNum, enroll = true) {
    const section = this.sections.find(s => s.section == sectionNum);
    if (section) {
      enroll ? section.enrolled++ : section.enrolled--;
    }
  }
};

export default byuiCourse;


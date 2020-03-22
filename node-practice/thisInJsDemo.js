function Student(props) {
  this.name = props.name || "匿名"; // 默认值为'匿名'
  this.grade = props.grade || 1; // 默认值为1
}

Student.prototype.hello = function() {
  alert("Hello, " + this.name + "!");
};

function createStudent(props) {
  return new Student(props || {});
}
var xiaoming = createStudent({
  name: "小明"
});

xiaoming.grade; // 1
console.log("hello");

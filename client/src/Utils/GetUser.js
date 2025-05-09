export default function GetUser() {
  let user = JSON.parse(localStorage.getItem("toDoAppUser"));
  return user;
}

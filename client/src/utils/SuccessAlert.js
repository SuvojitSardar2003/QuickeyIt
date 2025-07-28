import Swal from "sweetalert2";

const successAlert = (title)=>{
  /* const alert= Swal.fire({
  position: "center",
  icon: "success",
  title: title,
  showConfirmButton: false,
  timer: 1500
  }); */
  Swal.fire({
  title: title,
  icon: "success",
  confirmButtonColor : "#00b050",
  draggable: true
});

return alert
}

export default successAlert
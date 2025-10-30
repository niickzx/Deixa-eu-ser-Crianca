function closeModal(){
  let modal = document.querySelector(".back-modal")
  modal.classList.add("disable")
  console.log("fecha")
}

function showModal(){
   let modal = document.querySelector(".back-modal")
  console.log("abre")
  modal.classList.remove("disable")
}
const root = document.querySelector('.root');
const inputUser= document.querySelector('#user');
const inpuPassword= document.querySelector('#pass');
const aceptar= document.querySelector('#aceptar');



var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
    keyboard: false
})


aceptar.addEventListener("click", async()=>{
if(inputUser.value == "" || inpuPassword.value == ""){
    alert("FIELDS ARE REQUIRED")
    return
}
    const res = await fetch('http://localhost:3000/login', {
        method:"POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: inputUser.value,
            password: inpuPassword.value
        })
    });
    const data = await res.json();

    if(data.id){
        alert("OK")
        window.location = "./pc.html"
    }else{
        alert("NO FOUND!")
    }
})


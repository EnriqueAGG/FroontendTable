const id = document.getElementById("id");
const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const numeroserie = document.getElementById("numeroserie");
const usuarioRed = document.getElementById("usuarioRed");
const macAddress = document.getElementById("macAddress");
const SO = document.getElementById("SO");

const btn_obtener = document.getElementById("btn_obtener");
const btn_reset = document.getElementById("btn_reset");


const tbody = document.querySelector("#tbody");


// const host = "https://localhost:3000";



btn_reset.addEventListener('click', () => {
    marca.value = ""
    modelo.value = ""
    numeroserie.value = ""
    usuarioRed.value = ""
    macAddress.value = ""
    SO.value = ""
   
    btn_obtener.textContent = "Crear registro"
    marca.focus();
    modelo.focus();
    numeroserie.focus();
    usuarioRed.focus();
    macAddress.focus();
    SO.focus();
})



// get products
document.addEventListener('DOMContentLoaded', async()=>{
    const res = await fetch('http://localhost:3000/products');
    const data = await res.json();
 
   let html ="";
 
    data.forEach( el => {
       html+=`
       <tr>
       <td>${el.ID}</td>
       <td>${el.ID}</td>
       <td>${el.Modelo}</td>
       <td>${el.NumeroSerie}</td>
       <td>${el.UsuarioRed}</td>
       <td>${el.MACAddress}</td>
       <td>${el.SO}</td>
       <td><button id=${el.id}  type="button" class="btn btn-danger eliminar">Eliminar</button></td>
       <td><button  id=${el.id} type="button" class="btn btn-warning editar">Editar</button></td>
     </tr>`
    });
 
    tbody.innerHTML = html;
 })


 tbody.addEventListener('click', async (e) => {

    if (e.target.classList.contains('editar')) {
        const id = e.target.id;
        const url = 'http://localhost:3000/products';
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        marca.value = data.marca;
        modelo.value = data.modelo;
        numeroserie.value = data.numeroserie;
        usuarioRed.value = data.usuarioRed;
        macAddress.value = data.macAddress;
        SO.value = data.SO;
        btn_obtener.textContent = "Editar registro"

        sessionStorage.setItem('editar', id);

        myModal.show();

    }
    if (e.target.classList.contains('eliminar')) {

        Swal.fire({
            title: '¿Esta seguro de que desea eliminar este registro?',
            text: "Si lo elimina no se podra recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const id = e.target.id;
                    const url = 'http://localhost:3000/products';
        
                    const res = await fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
        
                    if (res.status === 200) {
                        traerDatosEmpresa();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Operación realizada',
                            text: "Registro eliminado correctamente",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error al eliminar el registro',
                        icon: 'error',
                        confirmButtonText: 'Cerrar'
                    })
                }
            }
          })

        

    }


})


btn_obtener.addEventListener('click', () => {
    if (nombre_persona.value === "" || altura.value === "") {
        Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios',
            icon: 'warning',
            confirmButtonText: 'Cerrar'
        })

        return;
    }

    if (btn_obtener.textContent == "Crear registro") {
        CrearRegistro();
        marca.value = ""
        modelo.value = ""
        numeroserie.value = ""
        usuarioRed.value = ""
        macAddress.value = ""
        SO.value=""
        
    } else {
        const id = sessionStorage.getItem('editar');
        EditarRegistro(id);
        marca.value = ""
        modelo.value = ""
        numeroserie.value = ""
        usuarioRed.value = ""
        macAddress.value = ""
        SO.value=""
    }

})


const EditarRegistro = async (id) => {
    try {
        const url = 'http://localhost:3000/products'
        const body = {
            ID,
            Marca: marca.value,
            Modelo: modelo.value,
            NumeroSerie: numeroserie.value,
            UsuarioRed: usuarioRed.value,
            MACAddress: macAddress.value,
            SO: SO.value
        //  idPC: localStorage.getItem('id_pc')
        }
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await res.json();
        if (data) {
            myModal.hide();
            traerDatosEmpresa();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Operación realizada',
                text: "Registro actualizado correctamente",
                showConfirmButton: false,
                timer: 1500
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error al actualizar el registro',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
};


const CrearRegistro = async () => {
    try {
        const url = 'http://localhost:3000/products'
        const body = {
            ID,
            Marca: marca.value,
            Modelo: modelo.value,
            NumeroSerie: numeroserie.value,
            UsuarioRed: usuarioRed.value,
            MACAddress: macAddress.value,
            SO: SO.value
        //  idPC: localStorage.getItem('id_pc')
        }
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await res.json();

        if (data) {
            myModal.hide();
            traerDatosEmpresa();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Operación realizada',
                text: "Registro agregado correctamente",
                showConfirmButton: false,
                timer: 1500
            })
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Error en al hacer el registro',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
};


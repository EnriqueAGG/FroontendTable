const id = document.getElementById("id");
const marca = document.getElementById("marca");
const modelo = document.getElementById("modelo");
const numeroserie = document.getElementById("numeroserie");
const usuarioRed = document.getElementById("usuarioRed");
const macAddress = document.getElementById("macAddress");
const SO = document.getElementById("SO");

const btn_obtener = document.getElementById("btn_obtener");

const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'))

const tbody = document.querySelector("#tbody");


// const host = "https://localhost:3000";



document.querySelector('#resetear').addEventListener('click', () => {
    resetearCampos();
    btn_obtener.textContent = "Crear registro"
    sessionStorage.clear();
})



// get products
document.addEventListener('DOMContentLoaded', async () => {
    TraerDatos();
})


tbody.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains('editar')) {
        EditarRegistro(id)
        modal.show();

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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const url = `http://localhost:3000/products/${id}`;
                    const res = await fetch(url, {
                        method: 'DELETE'
                    })
                    if (res.status === 200) {
                        TraerDatos();
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
        });

    }


})


btn_obtener.addEventListener('click', async () => {

    if (validarCampos()) return;
    
    if (btn_obtener.textContent == "Crear registro") {
        
        CrearRegistro();

    } else {
        const id = sessionStorage.getItem('editar');
        const url = `http://localhost:3000/products/${id}`
        const dataSend = {
            marca: marca.value,
            modelo: modelo.value,
            numeroserie: numeroserie.value,
            usuarioRed: usuarioRed.value,
            macAddress: macAddress.value,
            SO: SO.value
        }

        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })
        const data = await res.json();

        if (data) {
            modal.hide();
            TraerDatos();
            btn_obtener.textContent = "Crear registro"
            sessionStorage.clear();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Operación realizada',
                text: "Registro actualizado correctamente",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

})


const EditarRegistro = async (id) => {
    btn_obtener.textContent = "Editar registro"
    sessionStorage.setItem('editar', id)
    rellenarCamposParaEditar(id);

};

const rellenarCamposParaEditar = async (id) => {
    const res = await fetch('http://localhost:3000/products/' + id);
    const data = await res.json();

    marca.value = data.Marca
    modelo.value = data.Modelo
    numeroserie.value = data.NumeroSerie
    usuarioRed.value = data.UsuarioRed
    macAddress.value = data.MACAddress
    SO.value = data.SO
}

const CrearRegistro = async () => {
    const url = `http://localhost:3000/products`
    const dataSend = {
        marca: marca.value,
        modelo: modelo.value,
        numeroserie: numeroserie.value,
        usuarioRed: usuarioRed.value,
        macAddress: macAddress.value,
        SO: SO.value
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataSend)
    })
    const data = await res.json();

    if (data) {
        modal.hide();
        TraerDatos();
        sessionStorage.clear();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Operación realizada',
            text: "Registro creado correctamente",
            showConfirmButton: false,
            timer: 1500
        })
    }
};

const TraerDatos = async () => {
    const res = await fetch('http://localhost:3000/products');
    const data = await res.json();

    let html = "";

    data.forEach(el => {
        html += `
       <tr>
       <td>${el.ID}</td>
       <td>${el.Marca}</td>
       <td>${el.Modelo}</td>
       <td>${el.NumeroSerie}</td>
       <td>${el.UsuarioRed}</td>
       <td>${el.MACAddress}</td>
       <td>${el.SO}</td>
       <td><button data-id=${el.ID}  type="button" class="btn btn-danger eliminar">Eliminar</button></td>
       <td><button  data-id=${el.ID} type="button" class="btn btn-warning editar">Editar</button></td>
     </tr>`
    });

    tbody.innerHTML = html;
}

const resetearCampos = () => {
    marca.value = ""
    modelo.value = ""
    numeroserie.value = ""
    usuarioRed.value = ""
    macAddress.value = ""
    SO.value = ""
}

const validarCampos = () => {
    let flat = false;

    if (
        marca.value == "" ||
        modelo.value == "" ||
        numeroserie.value == "" ||
        usuarioRed.value == "" ||
        macAddress.value == "" ||
        SO.value == ""
    ) {
        flat = true;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios',
          })
    }

    return flat
}
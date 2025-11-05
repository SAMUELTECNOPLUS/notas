let tareas = [];

// Seleccionar elementos del DOM
const agregar = document.querySelector(".agregar-tarea");
const mostrar = document.querySelector(".mostrar-tareas");
const input = document.querySelector("#tarea-input");
const lista = document.querySelector(".lista-tareas");
const borrar = document.querySelector(".borrar-tareas");
const fecha = document.querySelector("#fecha-tarea");

function cargarTareas() {
  const tareasGuardadas = localStorage.getItem('tareas');
  if (tareasGuardadas){
    tareas = JSON.parse(tareasGuardadas);
    mostrarTareas();
  }
}

function guardarTareas() { 
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function mostrarTareas() {
  lista.innerHTML = "";

  if (tareas.length === 0) {
    lista.innerHTML = "<li style='color: gray; text-align: center;'>No hay tareas</li>";
    return;
  }

//---Te explico, este es un bucle "for", este se compone de 3 partes principales: inicialización (let i = 0), condición (i < tareas.length), e incremento (i++). Su propósito es recorrer cada elemento del array "tareas" y crear un elemento <li> en el HTML por cada tarea brrrrrr.

//---Pseudocodigo: PARA cada tarea en el array tareas HACER: crear elemento de lista, agregar estilos, crear botón eliminar, y añadir todo a la lista visible FIN PARA.


  for(let i = 0; i < tareas.length; i++){
    const li = document.createElement("li");
   li.style.listStyle = "none";
  li.style.padding = "12px";
  li.style.margin = "15px auto";
  li.style.background = "rgba(255, 255, 255, 0.3)";
  li.style.backdropFilter = "blur(10px)";
  li.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.1)";
  li.style.border = "1px solid rgba(255, 255, 255, 0.4)";
  li.style.width = "250px";
  li.style.borderRadius = "5px";
  li.style.display = "flex";
  li.style.flexDirection = "column"; 
  li.style.justifyContent = "space-between";
  li.style.alignItems = "center";
  li.style.minHeight = "100px";
  li.style.transition = "all 0.3s ease";

li.addEventListener("mouseenter", () => {
    li.style.background = "rgba(255, 255, 255, 0.4)";
    li.style.transform = "translateY(-2px)";
    li.style.boxShadow = "0px 6px 20px rgba(0, 0, 0, 0.15)";
  });

  li.addEventListener("mouseleave", () => {
    li.style.background = "rgba(255, 255, 255, 0.3)";
    li.style.transform = "translateY(0)";
    li.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.1)";
  });

    const textoFecha = tareas[i].fecha 
      ? `${tareas[i].texto} - ${tareas[i].fecha}` 
      : tareas[i].texto;
    
    const span = document.createElement("span");
     span.textContent = textoFecha;
  span.style.flex = "1";  
  span.style.width = "100%";  
  span.style.textAlign = "center";  
  span.style.marginBottom = "10px";  
  span.style.wordWrap = "break-word";
  span.style.color = "#2d3d2d";
  span.style.fontWeight = "500";  
    
    const btnEliminar = document.createElement("button");
     btnEliminar.textContent = "Eliminar";
  btnEliminar.style.boxShadow = "2px 2px 8px rgba(0, 0, 0, 0.2)";
  btnEliminar.style.width = "auto";
  btnEliminar.style.height = "30px";
  btnEliminar.style.margin = "0";
  btnEliminar.style.background = "rgba(94, 29, 29, 0.85)";
  btnEliminar.style.backdropFilter = "blur(5px)";
  btnEliminar.style.color = "white";
  btnEliminar.style.border = "1px solid rgba(255, 255, 255, 0.2)";
  btnEliminar.style.padding = "0 15px";
  btnEliminar.style.fontSize = "1rem";
  btnEliminar.style.borderRadius = "3px";
  btnEliminar.style.cursor = "pointer";
  btnEliminar.style.transition = "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  
  btnEliminar.addEventListener("mouseenter", () => {
    btnEliminar.style.background = "rgba(94, 29, 29, 0.95)";
    btnEliminar.style.transform = "scaleX(1.05)";
  });

  btnEliminar.addEventListener("mouseleave", () => {
    btnEliminar.style.background = "rgba(94, 29, 29, 0.85)";
    btnEliminar.style.transform = "scaleX(1)";
  });
  
  btnEliminar.addEventListener("click", () => {
    eliminarTarea(tareas[i].id);
  });
  
  li.appendChild(span);
  li.appendChild(btnEliminar);
  lista.appendChild(li);
}

    btnEliminar.addEventListener("click", () => {
      eliminarTarea(tareas[i].id);
    });
    
    li.appendChild(span);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  }



function eliminarTarea(id) {
tareas = tareas.filter(tarea => tarea.id !== id);
guardarTareas();
mostrarTareas();
}



agregar.addEventListener("click", () => {

const texto = input.value.trim();
const fechaSeleccionada = fecha.value;

if(texto === ""){
    alert("¡Escribe una tarea primero!");
} else {
  tareas.push({

id: Date.now(),
texto: texto,
fecha: fechaSeleccionada
  });

guardarTareas();
mostrarTareas();

 input.value = "";
    fecha.value = "";
    alert("¡Tarea agregada!");
}
});

mostrar.addEventListener("click", () => {
mostrarTareas();
if (tareas.length === 0) {
    alert("NO HAY LISTA");
}
})

borrar.addEventListener("click", () => {
if(tareas.length > 0 ){
tareas = [];
lista.innerHTML = "";
guardarTareas();
alert("¡Todas las tareas fueron borradas")

}
});


input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    agregar.click();
  }
});

cargarTareas();



var btnagregar = document.querySelector("#Agregar");
var btnborrar = document.querySelector("#borrar");
var btnbuscar = document.querySelector("#Buscar");
var btnmostar = document.querySelector("#Mostrar");
var btnmostrarinv = document.querySelector("#MostrarInverso");
var btneliminarprimero = document.querySelector("#EliminarPrimero")

var codigo = document.querySelector("#codigo");
var nombre = document.querySelector("#nombre");
var desc = document.querySelector("#desc");
var cantidad = document.querySelector("#cantidad");
var coste = document.querySelector("#coste");

var lista = document.querySelector("#Lista")

class Producto{
    constructor(codigo, nombre, desc, cantidad, coste, total, siguiente, antes){
    this.codigo = codigo;
    this.nombre = nombre;
    this.desc = desc;
    this.cantidad = cantidad;
    this.coste = coste;
    this.total = total;
    this.siguiente = siguiente;
    this.antes = antes;
    };
    
};
class Inventario{
    constructor(){
        this.inicio = null;
        this.size = 0;
    };
    Recorrer(producto){
        if(producto==null){
            return this.inicio;
        }else {
            return producto.siguiente;
        };
    };
    Verificar(codigo){
      if(this.inicio == null){
          return false;
      };
      let current = this.inicio;
      do{
          if(current.codigo==codigo){
              return true
          }
          current = current.siguiente
      }while(current!= this.inicio)
      return false;
    };
    BuscarCode(codigo){
        if(this.inicio == null){
          return null
        }
        let current = this.inicio
        do{
          if(current.codigo==codigo){
            return current
          }
          current = current.siguiente
        }while(current!= this.head)
        return null
      }
    EliminarCode(codigo){
        if(this.size == 1){
            this.inicio = null;
        }else{
            let current = this.inicio
            while(current.siguiente!= codigo){
                current = current.siguiente
            }
            if(this.inicio == codigo){
                this.inicio = this.inicio.siguiente
            }
            current.siguiente.siguiente.antes = current.siguiente.antes;
            current.siguiente = current.siguiente.siguiente;
        }
        this.size--;
    }
    EliminarInicio(){
        if(this.size==1){
            this.inicio = null;
        }else{
            this.inicio.siguiente.antes = this.inicio.antes;
            this.inicio.antes.siguiente = this.inicio.siguiente;
            this.inicio = this.inicio.siguiente;
        };
        this.size--;
    };
    AgregarFinal(item){
        let nuevop = new Producto(item[0], item[1], item[2], item[3], item[4], item[5], null)
        if(!this.inicio){
            this.inicio = nuevop
            this.inicio.siguiente = this.inicio
            this.inicio.antes = this.inicio
        }else{
            let current = this.inicio;
            while(current.siguiente!= this.inicio){
                current = current.siguiente;
            };
            current.siguiente = nuevop
            current.siguiente.siguiente = this.inicio;
            current.siguiente.antes = current;
            this.inicio.antes = current.siguiente
        };
        this.size++;
    };
};
const Mostrar = new Inventario();

btnagregar.addEventListener("click", () => {
    if(Mostrar.Verificar(codigo.value)==false){
        let p = new Array (codigo.value,nombre.value,desc.value,cantidad.value,coste.value,(Number(cantidad.value)* Number(coste.value)))
        Mostrar.AgregarFinal(p)
        lista.innerHTML = "Codigo: "+ p[0] + " Nombre: "+ p[1]+ " Descripcion: "+p[2]+" Cantidad: "+p[3]+" Coste: "+p[4]+" Total: "+p[5]+ "</br > Agregado con exito!"
    }else{
        alert ("Error! Codigo repetido")
    };
});
btnborrar.addEventListener("click", () =>{
    let d = Mostrar.BuscarCode(codigo.value)
    if(d!=null){
        lista.innerHTML = +"Codigo: "+d.codigo+" Nombre: "+d.nombre+" Descripcion: "+d.desc+" Cantidad: "+d.cantidad+" Coste: "+d.coste+" Total: "+d.total+"</br > Eliminado con exito"
        Mostrar.EliminarCode(d)
    }else{
        alert("El producto seleccionado no Existe!")
    }
})
btnbuscar.addEventListener("click", () =>{
    let busc = Mostrar.BuscarCode(codigo.value)
    if(busc!=null){
        lista.innerHTML = "Codigo: "+busc.codigo+" Producto: "+ busc.nombre+" Descripcion: "+ busc.desc+" Cantidad: "+busc.cantidad+" Coste: "+busc.coste+" Total: "+busc.total+ "</br > Producto Encontrado!"
    }else{
        alert("El producto No existe. Intente con otro codigo")
    }
})
btnmostar.addEventListener("click", () =>{
    lista.innerHTML = ""
    let current = null
    for(let i=0; i!=Mostrar.size;i++){
        current = Mostrar.Recorrer(current)
        lista.innerHTML += "Codigo: "+current.codigo+" Producto: "+ current.nombre+" Descripcion: "+ current.desc+" Cantidad: "+current.cantidad+" Coste: "+current.coste+" Total: "+current.total+ "</br >"
    }
    lista.innerHTML += "Lista Completa!"
});
btnmostrarinv.addEventListener("click", () =>{
    lista.innerHTML = ""
    let current = null
    let inver = new Array()
        for(let i=0; i!=Mostrar.size;i++){
            current = Mostrar.Recorrer(current)
            inver[i] = current
        }
        for(let i=Mostrar.size-1;i!=-1;i--){
            lista.innerHTML += "Codigo: "+inver[i].codigo+" Producto: "+ inver[i].nombre+" Descripcion: "+ inver[i].desc+" Cantidad: "+inver[i].cantidad+" Coste: "+inver[i].coste+" Total: "+inver[i].total+ "</br >"
        }
        lista.innerHTML += "Lista Completa!"
});
btneliminarprimero.addEventListener("click", () =>{
    if(Mostrar.inicio){
        let current = Mostrar.Recorrer(null)
        lista.innerHTML = "Codigo: "+current.codigo+" Producto: "+current.nombre+" Descripción: "+current.desc+" Cantidad: "+current.cantidad+" Coste: "+current.coste+" Total: "+current.total+" "+ "</br >  Eliminado con exito!"
        Mostrar.EliminarInicio()
    }else{
        alert("N0 se encontraron productos.")
    }
});
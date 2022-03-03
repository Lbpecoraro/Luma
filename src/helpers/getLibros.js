const libros = [
{
    id:1,
    nombre: 'Al final mueren los dos',
    autor: 'Adam Silvera',
    precio: 2600,
    img: "../../images/1.jpg",
    stock: 15
},{
    id:2,
    nombre: 'Los siete maridos de Evelyn Hugo',
    autor: 'Taylor Jenkins Reid',
    precio: 2390,
    img: "../../images/2.png",
    stock: 10
},{
    id:3,
    nombre: 'Caraval',
    autor: 'Stephanie Garber',
    precio:1950,
    img: "../../images/3.jpg",
    stock:13
}
]

export const getLibros = new Promise ((res,rej)=>{
    setTimeout(() => {
     res(libros)   
    }, 2000);
})


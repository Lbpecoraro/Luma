const libros = [
{
    id:1,
    nombre: 'Al final mueren los dos',
    autor: 'Adam Silvera',
    precio: 2600,
    img: "../../images/1.jpg",
    stock: 15,
    descripcion: "Imagina un mundo en el que una organización les avisa a las personas la inminencia de su muerte. Imagina que empezó la cuenta regresiva. Imagina cómo vivirías tu vida en solo un día. ¿Estarías listo para decir adiós? Al final mueren los dos es un canto a la fuerza arrolladora de la vida, que transformará para siempre tu forma de comprender el tiempo, la amistad y el amor."
},{
    id:2,
    nombre: 'Los siete maridos de Evelyn Hugo',
    autor: 'Taylor Jenkins Reid',
    precio: 2390,
    img: "../../images/2.png",
    stock: 10,
    descripcion: "Imagina un mundo en el que una organización les avisa a las personas la inminencia de su muerte. Imagina que empezó la cuenta regresiva. Imagina cómo vivirías tu vida en solo un día. ¿Estarías listo para decir adiós? Al final mueren los dos es un canto a la fuerza arrolladora de la vida, que transformará para siempre tu forma de comprender el tiempo, la amistad y el amor."
},{
    id:3,
    nombre: 'Caraval',
    autor: 'Stephanie Garber',
    precio:1950,
    img: "../../images/3.jpg",
    stock:13,
    descripcion: "Imagina un mundo en el que una organización les avisa a las personas la inminencia de su muerte. Imagina que empezó la cuenta regresiva. Imagina cómo vivirías tu vida en solo un día. ¿Estarías listo para decir adiós? Al final mueren los dos es un canto a la fuerza arrolladora de la vida, que transformará para siempre tu forma de comprender el tiempo, la amistad y el amor."
}
]

export const getLibros = new Promise ((res,rej)=>{
    setTimeout(() => {
     res(libros)   
    }, 2000);
})


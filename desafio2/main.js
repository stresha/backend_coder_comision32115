//
const {promises: fs} = require('fs');

//CLASS
class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
    }


    async getAll(){
        try{
            const objs= await fs.readFile(this.ruta,'utf-8')
            return JSON.parse(objs)
        }catch{
            return []
        }
    }

    async save(obj){
        const objs= await this.getAll();
        let newId;

        if (objs.length == 0){
            newId=1;
        }else{
            newId= objs[objs.length - 1].id + 1;
        }

        const newObj = {...obj, id: newId}
        objs.push(newObj);
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs,null,2));
                return newId
        }catch(error){
            console.log(`Error to save the object ${error}`)
        }
    }

    async getById(id){
        
        const objs = await this.getAll()
        const obj = objs.find(o => o.id == id);
        return obj
        

    }

    async deleteById(id){
        let collection = []
        await fs.readFile(`./${this.ruta}`,'utf-8')
        .then( cont => {
            let collect = JSON.parse(cont)
            for (const x of collect){
                if(x.id != id){
                    collection.push(x)
                }
            }
        })
        .catch( error => console.log(error));
        await fs.writeFile(`./${this.ruta}`, JSON.stringify(collection));
        console.log('Delete Object with ID!');
       
    }

    async deleteAll(){
        await fs.writeFile(`./${this.ruta}`, '');
        console.log('Delete all objects')
        
    }

}

//ITEMS:
const product1 = {
    "title": "Lampara Gato",
    "price": 1000,
    "id": 1,
    "thumbnail": "https://i.postimg.cc/1XjWByBJ/lampara-cat4.jpg"
  }
const product2 = {
    "title": "Velador 3D",
    "price": 2000,
    "id": 2,
    "thumbnail": "https://i.postimg.cc/Dy5f2HZ5/lampara-cat7.jpg"
  }
const product3 = {
    "title": "Lampara Sal",
    "price": 1900,
    "id": 3,
    "thumbnail": "https://i.postimg.cc/W4N4mVHB/lamapra-sal2.jpg"
  }
const product4 = {
    "title": "Velador Gato Amarillo",
    "price": 1600,
    "id": 4,
    "thumbnail": "https://i.postimg.cc/gkhrmNhT/lampara-cat.jpg"
  }
  const product5 = {
    "title": "Lampara Reno",
    "price": 1800,
    "id": 4,
    "thumbnail": "https://i.postimg.cc/15RPYBHF/map.jpg"
  }
  

  //FUNCION
async function challenge(){
    const file = new Contenedor('./desafio2/products.txt');
    
    console.log('Products: ')
    let objs = await file.getAll();
    console.table(objs)
    console.log('--')

    console.log('Save products')
    let id1= await file.save(product1)
    console.log(`ID of product: ${id1}`);
    console.log('--')
    let id2= await file.save(product2)
    console.log(`ID of product: ${id2}`);
    console.log('--')
    let id3= await file.save(product3)
    console.log(`ID of product: ${id3}`);
    console.log('--')
    let id4= await file.save(product4)
    console.log(`ID of product: ${id4}`);
    console.log('--')
    let id5= await file.save(product5)
    console.log(`ID of product: ${id5}`);
    console.log('--')
   

    console.log('Products: ')
    objs = await file.getAll();
    console.table(objs)
    console.log('--')

    console.log('Search product for ID')
    const res = await file.getById(id4)
    console.log(`Your product is: ${res.title} \nThe cost is $${res.price}`)
    console.log('--')

    console.log('Delete for ID')
    objs = await file.deleteById(4)
    objs = await file.getAll();
    console.table(objs)
    console.log('--')

    console.log('Delete All')
    objs = await file.deleteAll();
    objs = await file.getAll();
    console.table(objs)
    console.log('--')
}

challenge();
//los prod los meto en un array con constructor y uso eso simulando 


class datos {
    constructor(){
        this.elements = [
            {
                id: 1,
                title: "Velador Gato",
                price: 2000,
                thumbnail: "https://i.postimg.cc/1XjWByBJ/lampara-cat4.jpg"
            
              },    
                {
                 id: 2, 
                title: "Velador Gato Amarillo",
                price: 2500,
                thumbnail: "https://i.postimg.cc/gkhrmNhT/lampara-cat.jpg"
                },
              
               {
                id: 3,
                title: "Lampara Sal",
                price: 1500,
                thumbnail: "https://i.postimg.cc/W4N4mVHB/lamapra-sal2.jpg"
                },
            
               {
                id: 4,
                title: "Lampara Reno",
                price: 1000,
                thumbnail: "https://i.postimg.cc/15RPYBHF/map.jpg"
                },
               {
                id: 5,
                title: "Lampara cat 3d",
                price: 1000,
                thumbnail: "https://i.postimg.cc/Dy5f2HZ5/lampara-cat7.jpg"
                } 
        ]
    }

    //todos
    getAll() {
        return this.elements;
    }


    //id
    getById(id) {
        const element = this.elements.find((e)=> e.id == id);

        return element;
    }


    //guardar
    save(element){
        element.id = this.elements.length === 0 ? 1 : this.elements[this.elements.length - 1].id + 1

        this.elements.push(element);

        return element;
    }

    //actualiza
    updateById (id,newData){
        const elementIndex = this.elements.findIndex((e)=> e.id ==id)

        if(elementIndex === -1) return {error:true}

        this.elements[elementIndex] = {
            ...this.elements[elementIndex],
            ...newData
        };
        return this.elements[elementIndex];
    }


    //borra
    deleteById(id){
        const elementIndex = this.elements.findIndex((e)=> e.id ==id)

        if(elementIndex === -1) return {error:true}

        this.elements = this.elements.filter((e)=> e.id != id);

        return {error:false};
    }

}

export {datos};
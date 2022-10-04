import fs from "fs";
import {utilsDate} from "../utils/utilsDate.js"

class FileSystemCont{
    constructor(filename){
        this.path =`./src/db/${filename}.json`
    }

    //Mostramos todos los elementos, o un array vacio
    async getAll(){
        try{
            const file = await fs.promises.readFile(this.path);
            return JSON.parse(file);
        }catch(error){
            await fs.promises.writeFile(this.path, JSON.stringify([]));
            return [];
        }
    }

    //Guardamos el elemnto
    async save(element){
        try{
            const elements = await this.getAll();
            element.id= elements.length === 0 ? 1 : elements[elements.length - 1].id + 1
            element.timestamp = utilsDate.getTimestamp();
            elements.push(element)
            await fs.promises.writeFile(this.path, JSON.stringify(elements, null, 2));
            
            return elements;
        }catch(error){
            return error;
        }
    }

    //Traemos el elemnto por su ID
    async getById(id){
        try{
            const elements = await this.getAll();
            const element = elements.find((elem)=> elem.id == id);
            return element;
        }catch(error){
            return error;
        }
    }

    //Actualizamos elemento
    async updateById (id, newData){
        try {
            const elements = await this.getAll();
            const elementIndex = elements.findIndex((elem)=> elem.id == id);

            if(elementIndex === -1) return{error: "No hemos encontrado el ELEMENTO!"}

            elements[elementIndex] ={...elements[elementIndex], ...newData}
            await fs.promises.writeFile(this.path, JSON.stringify(elements, null, 3))

            return elements[elementIndex];
        }catch(error){
            return error
        }
    }

    //Borramos elemento por Id
    async deleteById(id){
        try{
            const elements =await this.getAll();
            const elementIndex = elements.findIndex((elem) => elem.id == id)

            if(elementIndex === -1) return{error: "No hemos encontrado el ELEMENTO!"}

            //armamos array con todos los elementos menos el del id
            const newElements= elements.filter((elem)=> elem.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(newElements,null,3))

            return elements
        }catch(error){
            return(error)
        }
    }
}

export {FileSystemCont}

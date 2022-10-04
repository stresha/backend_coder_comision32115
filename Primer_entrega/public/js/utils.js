const createProdTable= async (products)=>{

    //llamamos al template y lo guardamos en una var
    const template = await (await fetch("views/productsTable.hbs")).text();

    //compilamos el template en una var
    const compTemplate= Handlebars.compile(template);
    return compTemplate({products});
}

export const utils ={
    createProdTable
}
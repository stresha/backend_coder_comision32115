const send = e => {
    e.preventDefault();

    const titulo = document.getElementById('title').value;
    const precio = document.getElementById('price').value;
    const imagen = document.getElementById('thumbnail').value;

    const data = {
        title: titulo,
        price: precio,
        thumbnail: imagen
    };
    const options = {
        method: 'POST',
        headers: {
            'Acept': 'aplication/json',
            'Content-Type': 'application/json'
        },
        body = JSON.stringify(data)
    }
    fetch('/api/productos', options)
        .then(res => res.json())
        .then(data => alert('Nuevo producto agregado: \n Título: ' + JSON.stringify(data.title) + '.'))
        .then(() => {
            document.getElementById('title').value = '';
            document.getElementById('price').value = '';
            document.getElementById('thumbnail').value = '';
        })
        .catch(error => console.log(error));
}
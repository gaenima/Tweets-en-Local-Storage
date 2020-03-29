//Variables

const listaTweets = document.getElementById('lista-tweets');



//Event Listeners
eventListeners();

function eventListeners(){
    //Cuando se envía el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//Functions

//Añadir Tweet del formulario
function agregarTweet(e){
    e.preventDefault();
                         //console.log('Formulario enviado'); probar si funciona la función
    //Leer el valor del textarea
    const tweet = document.getElementById('tweet').value;  

    //Crear botón de eliminar
    const btnBorrar = document.createElement('a');
    btnBorrar.classList = 'borrar-tweet';
    btnBorrar.innerText = 'X';
    
    //Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;

    //Añade btn borrar al tweet
    li.appendChild(btnBorrar);

    //Añade el tweet a la lista
    listaTweets.appendChild(li);

                              //console.log(tweet); Muestra por consola que funciona el agregado del tweet en el textarea
                        
    //Añadir a Local Storage
    agregarTweetLocalStorage(tweet);                         
}

//Eliminar tweet DOM
function borrarTweet(e){
    e.preventDefault();
     if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        //alert('Eliminaste el tweet ' + tweet.value);

        borraTweetLocalStorage(e.target.parentElement.innerText);
        
     }
}

//Mostrar datos de localStorage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();
                                         //console.log(tweets);
    tweets.forEach(function(tweet){
 //Crear botón de eliminar
 const btnBorrar = document.createElement('a');
 btnBorrar.classList = 'borrar-tweet';
 btnBorrar.innerText = 'X';
 
 //Crear elemento y añadirle el contenido a la lista
 const li = document.createElement('li');
 li.innerText = tweet;

 //Añade btn borrar al tweet
 li.appendChild(btnBorrar);

 //Añade el tweet a la lista
 listaTweets.appendChild(li);            

    });                                     

}


//Agregar tweet a Local Storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    //Añadir el nuevo tweet
    tweets.push(tweet);

    //Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));

    //Agregar a local storage
    //localStorage.setItem('tweets', tweet);
}


//Comprobar que haya elementos en local storage. Retorna arreglo
function obtenerTweetsLocalStorage(){
    let tweets;

    //Revisamos los valores de Local Storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Eliminar tweet del local storage
function borraTweetLocalStorage(tweet){
    let tweets, tweetBorrar;

    //Elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length -1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
     });
       localStorage.setItem('tweets', JSON.stringify(tweets));
}
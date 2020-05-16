const celulas = document.querySelectorAll( '.sub-box' );

for ( let i = 0; i < celulas.length; i++ ) {

  celulas[ i ].onclick = function( event ) {

    // GERAR MATRIZ DA JOGADA
    const matriz = new Array( 9 ).fill( 0 );
    matriz[ i ] = 1;
    console.log( matriz );

    // CRIAR IMAGEM
    var personagem = new Image( 100, 100 );
    personagem.src = 'img/gifTeste/ocioso.gif';
    personagem.style.position = 'absolute';
    personagem.style.left = ( event.target.getBoundingClientRect().left + 50 ) + 'px';
    personagem.style.top = ( event.target.getBoundingClientRect().top ) + 'px';
    document.body.appendChild( personagem );


    // TOCAR SOM
    

  }

}




// ----------------------------------


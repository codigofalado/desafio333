import React, { useEffect, useState } from 'react';
import './global.css'
import './App.css'
import Timer from './components/Timer'
import header from './utils/leitura-organica-logo.png'

function App() {
  const { ms, start, pause, stop, running, result} = Timer();
  const [words, setWords] = useState(0);
  const [ppm, setPPM] = useState(0)
  
  useEffect(() => {
    countWords()
    calcResultPPM()
  }, [running])

  const countWords = () => {
    let s = document.getElementsByClassName('text')[0].innerHTML
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    setWords(s.split(' ').length)
  }

 const calcResultPPM = () => {
   if(result !== 0) {
    const minutes = result/60
    setPPM(words/minutes)
    console.log('PPM', ppm)
   }
 }

  return (
    <div className="App">
      <img src={header} className="banner" alt="banner"/>
      <div className="main">
        <section>
          <h1>Você já parou para calcular a sua velocidade de leitura?</h1>
          <h3>Num mundo tão subjetivo quanto o da leitura, a velocidade de leitura é uma métrica objetiva que te permite saber como está a sua leitura nesse momento e te permite acompanhar a sua evolução!
    A medida mais utilizada para calcular a velocidade de leitura é Palavras por Minuto (PPM). Uma leitura em páginas por hora, por exemplo, não pode ser aplicada em qualquer livro (pois tem tamanhos diferentes de páginas), muito menos em artigos ou notícias.
    Que tal descobrir agora a sua velocidade de leitura?</h3>
          <h3>Para realizar o teste clique em Iniciar e leia o texto abaixo, quando terminar clique em Finalizar</h3>
        </section>
        <div className="timer">
          <button onClick={start}>Iniciar Teste</button>
          <h1>{Math.floor(ms / 1000)}s</h1>
        </div>
        <p className='text'>
          “- Por que você, meu caro, apareceu tão de repente... O que está acontecendo? – perguntou ela, olhando para o penhor. - É uma cigarreira de prata: eu não lhe falei da outra vez? Ela estendeu a mão. - E por que é que você está tão pálido? Veja como as mãos estão tremendo! Tomou banho, meu caro? - É febre – respondeu com voz entrecortada. – Fica-se pálido a contragosto... quando não tem o que comer – acrescentou ele, mal pronunciando as palavras. Mais uma vez as forças o abandonaram. Mas a resposta pareceu verossímil; a velha pegou o penhor na mão. - Um objeto... uma cigarreira... de prata... dê uma olhada. - Que coisa, como se não fosse de prata... E como você amarrou! Procurando desamarrar o cadarço e voltando para janela, no sentido da claridade (todas as janelas estavam fechadas, apesar do abafamento), ela o deixou inteiramente por alguns segundos e lhe deu as costas. Ele desabotoou o sobretudo e soltou o machado de laço, mas ainda não o tirou por inteiro, ficando apenas a segurá-lo com a mão direita por cima da roupa. Os braços estavam terrivelmente fracos; ele mesmo os sentia a cada instante cada vez mais entorpecidos e duros. Temia soltar e deixar cair o machado... num repente foi como se a cabeça começasse a rodar. - O que foi que ele enrolou aqui! – gritou a velha irritada e mexeu-se na direção dele. Ele não podia perder nem mais um instante. Tirou o machado por inteiro, levantou-o com as duas mãos, mal se dando conta de si, e quase sem fazer força, quase maquinalmente, baixou-o de costas na cabeça dela. Era como se nesse instante tivesse lhe faltado força. A velha, como sempre, estava de cabeça descoberta. Os cabelos claros com tons grisalhos, ralinhos, habitualmente besuntados de óleo, formavam uma trança à moda rabo de rato e estavam presos a um resto de pente de chifre que se destacava na nuca. O golpe acertara em plenas têmporas, para o que contribuía a sua baixa estatura." 
        </p>
        <div className="timer">
            <button onClick={pause}>Finalizar</button>
            {result > 0 ? <button onClick={stop}>Refazer Teste</button> : ''}
            {result > 0 ? <h1>Seu PPM é {ppm}</h1> : ''}
        </div>
      </div>
    </div>
  );
}


export default App;

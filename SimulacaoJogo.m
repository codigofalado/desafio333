function q = SimulacaoJogo(player_inicio,espera)
  
  A1 = SorteiaMatrizInicial(player_inicio)
  pause(espera);

  for jogada=2:5
    A2 = ProximaJogada(A1)
    pause(espera);
    A1 = SorteiaJogadaUsuario(A2)
    pause(espera);
  end
  
  q = A1;
  
endfunction

function q = SimulacaoJogo(player_inicio,espera)
% player_inicio = 1  => usuário começa
% player_inicio = 2  => computer começa
  
  
  A1 = SorteiaMatrizInicial(player_inicio)
  pause(espera);
  A2 = A1;

  while length(A2)>1 && length(A1)>1
    A2 = ProximaJogadaV2(A1)
    pause(espera);
    A1 = SorteiaJogadaUsuario(A2)
    pause(espera);
  end
  
  q = A2;
  
endfunction

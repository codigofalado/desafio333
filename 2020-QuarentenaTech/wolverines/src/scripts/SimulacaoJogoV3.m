function q = SimulacaoJogoV3(player_inicio,espera)
%% V3: salva matrizes num array 3D
  
%% V2: usa ProximaJogadaV3
%% para monitorar qual parte do algoritmo é usada
%% salvando variável cod .
%% cod de um dígito => Fim de jogo
%% 2 dígitos começando com um =>  Defesa
%% 4 digitos começando com dois ou 3 => Ataque
  
% player_inicio = 1  => usuário começa
% player_inicio = 2  => computer começa
  
  cods = [];
  
  A1 = SorteiaMatrizInicial(player_inicio)
  Saida = A1;
  pause(espera);
  A2 = A1;

  while length(A2)>1 && length(A1)>1
    Saida = cat(3,Saida,A1,A2);
    A2 = ProximaJogadaV3(A1)
    load cod;
    cod
    cods = horzcat(cods,cod);
    pause(espera);
    A1 = SorteiaJogadaUsuario(A2)
    pause(espera);
  end
  
  Saida(:,:,1) = []; Saida(:,:,2) = [];
  
  save cods;
  
  q = Saida;
  
endfunction

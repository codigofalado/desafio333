function q = ProximaJogadaV3(A0);
%% V3: monitora q parte do algoritmo é usada salvando variável cod .
%% cod de um dígito => Fim de jogo
%% 2 dígitos começando com um =>  Defesa
%% 4 digitos começando com dois => Ataque

  % A0 é uma matriz 3x3 com zeros, uns e frações (0.3) 
  % As jogadas do usuário estão representadas pelos uns
  % As jogadas do computador estão representadas pelos 0.3
  % Os zeros são espaços vazios
  
  %Vamos usar um algoritmo com os seguintes passos:
  
  %I) obter as somas da matriz em todos os sentidos
  %II) testar se as somas são inteiros na seguinte ordem: diagonais, linhas e colunas.
  %III) testar se somas são >= do que 2, 
        % se não localizar aonde e defender elemento correspondente
       % caso for <2 , testar se é menor do que 1.5
        
        %prioridades de ataque: (1) elemento central ( [i,j] = [2,2] )
        %                       (2) cantos  ( [i,j] = [1,1] , [1,3] , [3,1] , [3,3] )
        %                       (3) bordas da cruz central ( [i,j] =  [1,2] , [2,1] , [2,3] , [3,2]

   cod = 0;

   A = A0; %inicialização matriz de saída  
  
  %I) somas  
  diag1 = trace(A0);
  diag2 = trace(flip(A0));
  lins = sum(A0');
  cols = sum(A0);
  
  somas = [ diag1 diag2 lins cols ];

  %II) testando possibilidades para somas  
  k = find(somas==3*0.3); compu_vence = ~isempty(k);
  if compu_vence
    disp('Você perdeu');
    A = 1; cod = 1; save cod;
  else
   k = find(somas==3); user_vence = ~isempty(k); 
   if user_vence 
      disp('Você venceu');
      A = 0; cod = 0; save cod;
   else 
     k = find(A0==0); tem_zeros = ~isempty(k);
     if ~tem_zeros
        disp('Deu velha!');
        A = -1; cod = -1; save cod;
     else
      k = find(somas==2);  %averiguando aonde defender (coluna, linha ou diagonal)  
      tem_brecha = ~isempty(k);
      if tem_brecha %caso usuário ataque (marque duas casas vizinhas com possibilidade de uma terceira)
         A = DefendeuV3(A0,k);  % defesa!      
      else  
        %k = find(somas==min(somas)); % vendo aonde tem mais espaço para atacar
        %A = AtacouV3(A0,k);  % ataque!
         A = AtacouV4(A0);   
      endif
      
     endif  
   endif
  endif

 
q = A;  
  
endfunction

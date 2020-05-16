function q = ProximaJogadaV2(A0);
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


   A = A0; %inicialização matriz de saída  
  
  %I) somas  
  diag1 = trace(A0);
  diag2 = trace(flip(A0));
  lins = sum(A0');
  cols = sum(A0);
  
  somas = [ diag1 diag2 lins cols ];

  %II) testando possibilidades para somas  
  if find(somas==3*0.3)
    disp('Você perdeu');
    A = 1;
  else
   if find(somas>2) 
      disp('Você venceu');
      A = 0;
   else 
     if ~find(A0==0)
        disp('Deu velha!');
        A = -1;
     else   
      
      if find(somas==2) %caso usuário ataque (marque duas casas vizinhas com possibilidade de uma terceira)
         k = find(somas==2);  %averiguando aonde defender (coluna, linha ou diagonal)
         A = DefendeuV2(A0,k);  % defesa!      
      else  
        k = find(somas==min(somas)); % vendo aonde tem mais espaço para atacar
        A = AtacouV3(A0,k);  % ataque!   
      endif
      
     endif  
   endif
  endif

 
q = A;  
  
endfunction

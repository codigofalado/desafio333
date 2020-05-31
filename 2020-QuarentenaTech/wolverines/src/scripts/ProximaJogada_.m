%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%% Desafio 333 - Quarentena Tech - Maio 2020 %%%%%%%%%
%%%%%%%%%%%%%%%%%%%% Jogo da Velha %%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%% Wolverines %%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%% Gabriel, Vinícius, Wesley %%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%% Versão final da nossa IA vencedora de jogo da véia #####
%%% feito a partir de ProximaJogadaFullV2 ,              %%%   
%%% apenas renomeando funções                            %%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%% programa principal %%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function q = ProximaJogada_(dificuldade)  %%OLHA O UNDERLINE!!!
%% Inputs: dificuldade - número de 0 a 1
%%         Tabuleiro - csv com matriz atual do tabuleiro

%% Outputs: Tabuleiro - csv com próxima jogada do computador inclusa na matriz do tabuleiro
%%          Ao terminar o programa retorna 1

a = rand(); %nro aleatorio de 0 a 1

maquinaGanha = 0;
Tabuleiro = csvread('Tabuleiro.csv');

if a < dificuldade
  
  Tabuleiro = NaoGanharas(Tabuleiro);   % IA - ganha em 90% dos casos, empata em 8%, só deixa user vencer 2%
  load cod; disp('cod = '); disp(cod); %output da estratégia usada no servidor

else

  Tabuleiro = SePaCeGanha(Tabuleiro);  % computador faz jogada aleatória
 
end

ultima = testaSomas(Tabuleiro); %checando se compu deu xeque mate
ganhou = ~isempty(ultima);
if ganhou
  maquinaGanha = ultima;
end

csvwrite('maquinaGanha.csv',maquinaGanha);
csvwrite('Tabuleiro.csv',Tabuleiro); %Tabuleiro vai ser 3x3 durante o jogo e 1x1 no final


q = 1;

end

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%% fim do programa principal %%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function q = SePaCeGanha(A)

  if ~isempty(testaSomas(A))
     A = testaSomas(A);
  else   
    i = find(A==0);
    N = length(i); 
    N = nroNaturalAleatorio(N);
  
    if ~isempty(i)
      A(i(N)) = 0.3;
    end
  end
  
  q = A;
  
endfunction

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function q = NaoGanharas(A0)
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
     k = find(A0==0); n_tem_zeros = isempty(k);
     if n_tem_zeros
        disp('Deu velha!');
        A = -1; cod = -1; save cod;
     else
      k = find(somas==2);  %averiguando aonde defender (coluna, linha ou diagonal)  
      tem_brecha = ~isempty(k);
      if tem_brecha %caso usuário ataque (marque duas casas vizinhas com possibilidade de uma terceira)
         A = Defesa(A0,k);  % defesa!      
      else  
        %k = find(somas==min(somas)); % vendo aonde tem mais espaço para atacar
        %A = AtacouV3(A0,k);  % ataque!
         A = Ataque(A0);   
      endif
      
     endif  
   endif
  endif

 
q = A;  
  
endfunction

%%%%%%%%%%%%%%%%%%%%%%%%%%%

function q = Defesa(A0,k)
%% V3: monitora q parte do algoritmo é usada salvando variável cod .
%% cod de um dígito => Fim de jogo
%% 2 dígitos começando com um =>  Defesa
%% 4 digitos começando com dois => Ataque

  cod = 0;
  
  A = A0;

  lins = sum(A0');
  cols = sum(A0);
  
%  somas = [ diag1 diag2 lins cols ];
  
%  Somas = MontaMatrizSoma(A0);

%  k = find(somas==2);

  if length(k)>1
    n = nroNaturalAleatorio(length(k));
    k = k(n);
  end
  
 %   if ~isempty(k)

        if k==1
          diagA0 = diag(A0); %vetor com a diagonal principal, de cima para baixo
          i = find(diagA0==0); %acha espaço vazio nessa diagonal
          A(i,i) = 0.3; %defende esse espaço!
          cod = 11; save cod;
        else
          if k==2
             diagA0 = diag(flip(A0)); %vetor com a diagonal secundária, de cima para baixo
             i = find(diagA0==0); %acha espaço vazio nessa diagonal    
             A(3-i+1,i) = 0.3 ; %defende esse espaço!
             cod = 12; save cod;
           else
              if k>=3 && k<=5
                i = find(lins==2); %acha linha onde está atacando
                j = find(A0(i,:)==0); %acha coluna vazia nessa linha
                A(i,j) = 0.3; %defende a linha!
                cod = 13;
                save cod;
              else     
                 if k>=6 && k<=8
                    j = find(cols==2); %acha coluna onde está atacando
                    i = find(A0(:,j)==0); %acha linha vazia nessa coluna
                   A(i,j) = 0.3; %defende a coluna!
                   cod = 14; save cod;
                 end
              end
           end
        end
%     end

   q = A;
  
endfunction

%%%%%%%%%%%%%%%%%%%%%%%%%

function q = Ataque(A0)
%% V4: monitora q parte do algoritmo é usada salvando variável cod .
%% cod de um dígito => Fim de jogo
%% 2 dígitos começando com um =>  Defesa
%% 4 digitos começando com dois ou três => Ataque
  
  cod = 2;
  
  A = A0;
  
  diag1 = trace(A0);
  diag2 = trace(flip(A0));
  lins = sum(A0');
  cols = sum(A0);
  
  soma = [diag1 diag2 lins cols];
  Soma = MontaMatrizSoma(A0);
  %mods = [ mod(diag1,0.3) mod(diag2,0.3) mod(lins(1),0.3) mod(lins(2),0.3) mod(lins(3),0.3) mod(cols(1),0.3) mod(cols(2),0.3) mod(cols(3),0.3) ]
  
  mods = mod(soma,0.3); 
   
   i = find(mods==0);  tem_brecha = ~isempty(i);

if tem_brecha %checar se pode completar aonde atacou antes
   
   if length(i)>1
    i = find(soma==min(soma(i(:))));
   end
  
   if i==1 %mod(diag1,0.3)==0
    range = [1 5 9];
   else
     if i==2 %mod(diag2,0.3)==0
       range = [7 5 3];
     else      
       if i==3 %mod(lins(1),0.3)==0 
         range = [1 4 7];
       else
         if i==4 %mod(lins(2),0.3)==0
           range = [2 5 8];
          else
          if i==5 %mod(lins(3),0.3)==0
            range = [3 6 9];
          else
            if i==6 %mod(cols(1),0.3)==0
              range = [1 2 3];
            else
              if i==7 %mod(cols(2),0.3)==0
                range = [4 5 6];
              else
                if i==8 %mod(cols(3),0.3)==0
                  range = [7 8 9];
                else
                  range = find(Soma==min(min(Soma)));
                end
              end
            end
          end
        end
      end
    end
  end            
    
    cod = 10*cod + i ;  

    i = find(A0(range)==0);
    if length(i)>1
 %     i_ = find(Soma(i(:))==min(min(Soma))
      if Soma(i(1))<Soma(i(2))
        i = i(1);   
      else
        i = i(2);
      end
      cod = 28 + i;  %% cods 29 ou 30
    else
      cod = 20;  %% cod 20
    end
  
    A(range(i)) = 0.3;
    cod = 100*cod; 
    save cod;
else
  cod = 200; save cod;
  A = AtaqueDasProfundezas(A);

end  
    
  q = A;
  
endfunction

%%%%%%%%%%%%%%%%%%%%%%%%

function q = AtaqueDasProfundezas(A0)
%% V1_2: monitora q parte do algoritmo é usada salvando variável cod .
%% cod de um dígito => Fim de jogo
%% 2 dígitos começando com um =>  Defesa
%% 4 digitos começando com dois => Ataque

  load cod;
  
  A = A0;
  
  diag1 = trace(A0);
  diag2 = trace(flip(A0));
  lins = sum(A0');
  cols = sum(A0);
  
  somas = [ diag1 diag2 lins cols ];    
  
        k = find(somas==min(somas)); % vendo aonde tem mais espaço para atacar
        tem_dois_espacos = length(k)>1;
        if tem_dois_espacos
          Somas = MontaMatrizSoma(A0); cod = cod +1 ;
     %     Somas = A0 + Somas;          
          [i,j]= find(Somas==min(min(Somas))) ; % && ~eh_inteiro_(Somas));
          tem_dois_minimos = length(i)>1
          if tem_dois_minimos || A(i,j)~=0
            cod = cod + 1;
            [_i,_j] = find(A(i(:),j(:))==0);
            i = i(_i);
            j = j(_j);
          end
          tem_dois_minimos = length(i)>1 ; % de novo
          if tem_dois_minimos || A(i,j)~=0
            cod = cod + 1;
            %acha elemento mais distante de tudo que usuário preencheu no tabuleiro
            elemento = espacoMaisDistante(A,i,j);
            i = elemento(:,1); j = elemento(:,2);
             
           end
           tem_dois_maximos = length(i)>1 ;
           if tem_dois_maximos || A(i,j)~=0
             cod = cod + 1;
             N = length(i);
             escolhido = nroNaturalAleatorio(N);
             i = i(escolhido); j = j(escolhido);
           end
           if A(i,j)==0 %|| A(i,j)~=0
             cod = cod + 1;
             A(i,j) = 0.3;  %ataca!
           else
             cod = cod + 1 ;
             while A(i,j)~=0
               Somas(i,j) = max(max(Somas));
               [i,j]= find(Somas==min(min(Somas)));
             end
             A(i,j) = 0.3; 
            end 
            Somas(i,j) = max(max(Somas(i,j)));
            cod = cod*10; save cod;            
        else                                      
           A = AtaquePuntual(A0,k) ;
        end      
        
q = A; 

endfunction

%%%%%%%%%%%%%%%%%%%%%%%%

function q = AtaquePuntual(A0,k)
%% V2: monitora q parte do algoritmo é usada salvando variável cod .
%% cod de um dígito => Fim de jogo
%% 2 dígitos começando com um =>  Defesa
%% 4 digitos começando com dois ou 3 => Ataque
  
  A = A0;
  load cod;
          if k==1
            diagA0 = diag(A0); %vetor com a diagonal principal, de cima para baixo
            i = find(diagA0==0) %acha espaço vazio nessa diagonal
            A(i,i) = 0.3; %ataca esse espaço!
            cod = 10*cod + 1;
          else
            if k==2
             diagA0 = diag(flip(A0)); %vetor com a diagonal secundária, de cima para baixo
             i = find(diagA0==0) %acha espaço vazio nessa diagonal    
             A(3-i+1,i) = 0.3 ; %ataca esse espaço!
             cod = 10*cod + 2;
            else
              if k>=3 && k<=5
                lins = sum(A0');
                i = find(lins==2); %acha linha onde está atacando
                j = find(A0(i,:)==0); %acha coluna vazia nessa linha
                A(i,j) = 0.3; %ataca a linha!
                cod = 10*cod + 3;
              else     
                 if k>=6 && k<=8
                    cols = sum(A0);
                    j = find(cols==2); %acha coluna onde está atacando
                    i = find(A0(:,j)==0); %acha linha vazia nessa coluna
                    A(i,j) = 0.3; %ataca a coluna!
                    cod = 10*cod + 4;
                 end
              end
           end
        end
  q = A;
  
  save cod;
  
endfunction

%%%%%%%%%%%%%%%%%%%%%%%%%

function q = MontaMatrizSoma(A0)
  %% esta função monta as somas dos elementos relevantes em cada posição do tabuleiro
  %% para localizar as regiões mais livres ou mais ocupadas
  %% De modo a comparar equitativamente, normalizamos as somas aonde diagonais tomam parte.
  
  diag1 = trace(A0);
  diag2 = trace(flip(A0));

  soma22 = ( sum(A0(2,:)) + sum(A0(:,2)) + diag1 + diag2 )*(2/4); %somas com elemento central (1)
  soma11 = ( sum(A0(1,:)) + sum(A0(:,1)) + diag1 )*2/3; %canto sup esq
  soma13 = ( sum(A0(1,:)) + sum(A0(:,3)) + diag2 )*2/3; %canto sup dir
  soma33 = ( sum(A0(3,:)) + sum(A0(:,3)) + diag1 )*2/3; %canto inf dir
  soma31 = ( sum(A0(3,:)) + sum(A0(:,1)) + diag2 )*2/3; %canto inf esq
 % soma2 = [soma11 soma13 soma33 soma31];
 % soma2 = min(soma2); %menor soma nos cantos
  %agora, as somas das pontas cruz central(3)
  soma12 = sum(A0(1,:)) + sum(A0(:,2)); %ponta superior da cruz
  soma21 = sum(A0(2,:)) + sum(A0(:,1)); %ponta esquerda da cruz
  soma23 = sum(A0(2,:)) + sum(A0(:,3)); %ponta direita da cruz
  soma32 = sum(A0(3,:)) + sum(A0(:,2)); %ponta superior da cruz          
 % soma3 = [soma12 soma21 soma23 soma32];
 % soma3 = min(soma3);
          
   Somas = [soma11 soma12 soma13;
            soma21 soma22 soma23;
            soma31 soma32 soma33] ;

q = Somas;
  
endfunction

%%%%%%%%%%%%%%%%%%%%%%%%%

function q = nroNaturalAleatorio(N)
  %sorteia um numero aleatório não nulo até o valor N
  
   q = round((N-1)*rand()) + 1 ;
  
endfunction

%%%%%%%%%%%%%%%%%%%%%%%%%

function q = espacoMaisDistante(A,i,j)
  
   %acha elemento mais distante de tudo que usuário preencheu no tabuleiro
   Distancia = zeros(1,length(i));
       for p=1:length(i)
          [i_uns,j_uns] = find(A==1);
           for q=1:length(i_uns)
                Distancia(p) = Distancia(p) + sqrt( (i(p)-i_uns(q))^2 + (j(p)-j_uns(q))^2 );
           end
       end
   i_Dmax = find(Distancia==max(Distancia));
   i = i(i_Dmax); j = j(i_Dmax);

   q = [i' j'];
   
endfunction

%%%%%%%%%%%%%%%%%%%%%%%%%

function q = testaSomas(A0)

  A = A0;
  
  diag1 = trace(A0);
  diag2 = trace(flip(A0));
  lins = sum(A0');
  cols = sum(A0);
  
  somas = [ diag1 diag2 lins cols ];

  k = find(somas==3*0.3); compu_vence = ~isempty(k);
  if compu_vence
    disp('Você perdeu');
    A = 1;
  else
   k = find(somas==3); user_vence = ~isempty(k);  
   if user_vence 
      disp('Você venceu');
      A = 0;
   else 
     k = find(A0==0); tem_zeros = ~isempty(k); 
     if ~tem_zeros
        disp('Deu velha!');
        A = -1;
     else
        disp('Jogo continua');
        A = [];
     end
    end
   end  

q = A;   
        
endfunction

%%%%%%%%%%%%%%%%%%%%%%%%%

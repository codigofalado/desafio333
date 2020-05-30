function q = AtaquePuntualV2(A0,k)
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

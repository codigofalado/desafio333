function q = AtacouV1_2(A0)
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
             escolhido = nro_natural_aleatorio(N);
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
           A = AtaquePuntualV2(A0,k) ;
        end      
        
q = A; 

endfunction

function q = AtaquePuntual(A0,k)
  A = A0;
 
          if k==1
            diagA0 = diag(A0); %vetor com a diagonal principal, de cima para baixo
            i = find(diagA0==0) %acha espaço vazio nessa diagonal
            A(i,i) = 0.3; %ataca esse espaço!
          else
            if k==2
             diagA0 = diag(flip(A0)); %vetor com a diagonal secundária, de cima para baixo
             i = find(diagA0==0) %acha espaço vazio nessa diagonal    
             A(3-i+1,i) = 0.3 ; %ataca esse espaço!
            else
              if k>=3 && k<=5
                lins = sum(A0');
                i = find(lins==2); %acha linha onde está atacando
                j = find(A0(i,:)==0); %acha coluna vazia nessa linha
                A(i,j) = 0.3; %ataca a linha!
              else     
                 if k>=6 && k<=8
                    cols = sum(A0);
                    j = find(cols==2); %acha coluna onde está atacando
                    i = find(A0(:,j)==0); %acha linha vazia nessa coluna
                   A(i,j) = 0.3; %ataca a coluna!
                 end
              end
           end
        end
  q = A;
  
endfunction

function q = Atacou(A0)

  A = A0;

  diag1 = trace(A0);
  diag2 = trace(flip(A0));
  lins = sum(A0');
  cols = sum(A0);
  
  somas = [ diag1 diag2 lins cols ];    
  
        k = find(somas==min(somas)); % vendo aonde tem mais espaço para atacar
        if length(k)>1
          Somas = MontaMatrizSoma(A0);
     %     Somas = A0 + Somas;          
          [i,j]= find(Somas==min(min(Somas))) ; % && ~eh_inteiro_(Somas));
          if length(i)>1 || A(i,j)~=0
            [_i,_j] = find(A(i(:),j(:))==0);
            i = i(_i);
            j = j(_j);
          end
          if length(i)>1 || A(i,j)~=0
            Distancia = zeros(1,length(i));
            for p=1:length(i)
              [i_uns,j_uns] = find(A==1);
              for q=1:length(i_uns)
                Distancia(p) = Distancia(p) + sqrt( (i(p)-i_uns(q))^2 + (j(p)-j_uns(q))^2 );
              end
             end
             i_Dmax = find(Distancia==max(Distancia));
             i = i(i_Dmax); j = j(i_Dmax);
           end
           if length(i)>1  || A(i,j)~=0
             N = length(i);
             escolhido = nro_natural_aleatorio(N);
             i = i(escolhido); j = j(escolhido);
           end
           if A(i,j)==0 %|| A(i,j)~=0
             A(i,j) = 0.3;  %ataca!
           else
             while A(i,j)~=0
               Somas(i,j) = max(max(Somas));
               [i,j]= find(Somas==min(min(Somas)));
             end
             A(i,j) = 0.3; 
            end 
            Somas(i,j) = max(max(Somas(i,j)));           
        else                                      
           A = AtaquePuntual(A0,k) ;
        end      
        
q = A; 

endfunction

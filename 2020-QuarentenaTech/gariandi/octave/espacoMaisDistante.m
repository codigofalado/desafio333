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

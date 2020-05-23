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

function q = SorteiaMatrizInicial(player)
  
  A = zeros(3,3);
  N = nro_natural_aleatorio(9);
  
  if player==1 %usuario
      A(N) = 1;
  else
      if player==2 %computador
        A(N) = 0.3;
      else
        disp('player inválido');
      end
  end
  
  q = A;   
endfunction

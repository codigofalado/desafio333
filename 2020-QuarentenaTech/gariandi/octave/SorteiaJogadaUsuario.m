function q = SorteiaJogadaUsuario(A)
  
  i = find(A==0);
  N = length(i); 
  N = nro_natural_aleatorio(N);
  
  A(i(N)) = 1;
  
  q = A;
  
endfunction

function q = SorteiaJogadaUsuario(A)
  
  i = find(A==0);
  N = length(i); 
  N = nro_natural_aleatorio(N);
  
  if ~isempty(i)
    A(i(N)) = 1;
  end
  
  q = A;
  
endfunction

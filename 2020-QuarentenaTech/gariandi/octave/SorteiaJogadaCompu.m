function q = SorteiaJogadaCompu(A)
  
  i = find(A==0);
  N = length(i); 
  N = nro_natural_aleatorio(N);
  
  if ~isempty(i)
    A(i(N)) = 0.3;
  end
  
  q = A;
  
endfunction

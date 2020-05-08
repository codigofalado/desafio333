function q = ArredondaMatriz(A,numero)
  
  n = length(A);
  
  for i=1:n
    for j=1:n
      if A(i,j)<numero
        A(i,j) = 0 ;
      else
        A(i,j) = 1 ; 
      end
    end
  end
  
  q = A;
  
endfunction

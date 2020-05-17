function q = somaVizinhos(A0,i,j)
  
  soma = 0;
  
  if i==2 && j==2
    soma = A0(i-1,j) + A0(i+1,j) + A0(i,j-1) + A0(i,j+1) + A0(i+1,j+1) + A0(i-1,j-1) + A0(i-1,j+1) + A0(i+1,j-1); 
      
  
endfunction

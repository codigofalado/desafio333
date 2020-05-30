function q = difA(A)
  
  n = length(A);
  Saida =  vertcat(zeros(1,n),diff(A)) + horzcat(zeros(n,1),diff(A')') ;
  
  q = Saida;
  
endfunction

function q = plotaMatriz(A)

  N = length(M);
  
  for i = 1:N
    for j = 1:N
      
      if A(i,j)~=0
        if A(i,j)==1
          plot(i-.5,j-.5,'kx','markersize',25);
        else
          plot(i-.5,j-.5,'ko','markersize',25);
        end
      end
    
    end
   end
   

q = 1 ;
   
endfunction

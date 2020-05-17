function q = plotaMatrizV2(A)

  N = length(A);
  
  for i = 1:N
    for j = 1:N

      j_ = 4-j;    

      if A(i,j)~=0
        if A(i,j)==1
          p = plot(i-.5,j_-.5,'kx','markersize',25); hold on;
        else
          p = plot(i-.5,j-.5,'ko','markersize',25); hold on;
        end
      end
    
    end
   end
   

   axis([0 3 0 3])
 %  rotate(p,[0 0 1],90,[1.5 1.5]);
   grid on;
   
   
q = 1 ;
   
endfunction

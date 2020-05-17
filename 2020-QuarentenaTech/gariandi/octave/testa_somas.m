function q = testa_somas(A0)

  A = A0;
  
  diag1 = trace(A0);
  diag2 = trace(flip(A0));
  lins = sum(A0');
  cols = sum(A0);
  
  somas = [ diag1 diag2 lins cols ];

  %II) testando possibilidades para somas  
  if find(somas==3*0.3)
    disp('Você perdeu');
    A = 1;
  else
   if find(somas==3) 
      disp('Você venceu');
      A = 0;
   else 
     if ~find(A0==0)
        disp('Deu velha!');
        A = -1;
     else
        A = [];
     end
    end
   end  

q = A;   
        
endfunction

function q = testa_somas(A0)

  A = A0;
  
  diag1 = trace(A0);
  diag2 = trace(flip(A0));
  lins = sum(A0');
  cols = sum(A0);
  
  somas = [ diag1 diag2 lins cols ];

  k = find(somas==3*0.3); compu_vence = ~isempty(k);
  if compu_vence
    disp('Você perdeu');
    A = 1;
  else
   k = find(somas==3); user_vence = ~isempty(k);  
   if user_vence 
      disp('Você venceu');
      A = 0;
   else 
     k = find(A0==0); tem_zeros = ~isempty(k); 
     if ~tem_zeros
        disp('Deu velha!');
        A = -1;
     else
        disp('Deu pau');
        A = [];
     end
    end
   end  

q = A;   
        
endfunction

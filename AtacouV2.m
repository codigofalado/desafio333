function q = AtacouV2(A0)
  
  A = A0;
  
  diag1 = trace(A0);
  diag2 = trace(flip(A0));
  lins = sum(A0')
  cols = sum(A0)
  
  Soma = MontaMatrizSoma(A0);
  
  if mod(diag1,0.3)==0
    range = [1 5 9];
  else
    if mod(diag2,0.3)==0
      range = [7 5 3];
    else      
      if mod(lins(1),0.3)==0 
        range = [1 4 7];
      else
        if mod(lins(2),0.3)==0
          range = [2 5 8];
         else
          if mod(lins(3),0.3)==0
            range = [3 6 9];
          else
            if mod(cols(1),0.3)==0
              range = [1 2 3];
            else
              if mod(cols(2),0.3)==0
                range = [4 5 6];
              else
                if mod(cols(3),0.3)==0
                  range = [7 8 9];
                else
                  range = find(Soma==min(min(Soma)));
                end
              end
            end
          end
        end
      end
    end
  end            
       

    i = find(A0(range)==0);
    if length(i)>1
 %     i_ = find(Soma(i(:))==min(min(Soma))
      if Soma(i(1))<Soma(i(2))
        i = i(1);
      else
        i = i(2);
      end
    end
  
    A(range(i)) = 0.3;
  
  q = A;
  
endfunction

function q = AtacouV3(A0)
  
  A = A0;
  
  diag1 = trace(A0);
  diag2 = trace(flip(A0));
  lins = sum(A0');
  cols = sum(A0);
  
  soma = [diag1 diag2 lins cols];
  Soma = MontaMatrizSoma(A0);
  %mods = [ mod(diag1,0.3) mod(diag2,0.3) mod(lins(1),0.3) mod(lins(2),0.3) mod(lins(3),0.3) mod(cols(1),0.3) mod(cols(2),0.3) mod(cols(3),0.3) ]
  
  mods = mod(soma,0.3); 
   
   i = find(mods==0);

if ~isempty(i) %checar se pode completar aonde atacou antes
   
   if length(i)>1
    i = find(soma==min(soma(i(:))));
   end
  
   if i==1 %mod(diag1,0.3)==0
    range = [1 5 9];
   else
     if i==2 %mod(diag2,0.3)==0
       range = [7 5 3];
     else      
       if i==3 %mod(lins(1),0.3)==0 
         range = [1 4 7];
       else
         if i==4 %mod(lins(2),0.3)==0
           range = [2 5 8];
          else
          if i==5 %mod(lins(3),0.3)==0
            range = [3 6 9];
          else
            if i==6 %mod(cols(1),0.3)==0
              range = [1 2 3];
            else
              if i==7 %mod(cols(2),0.3)==0
                range = [4 5 6];
              else
                if i==8 %mod(cols(3),0.3)==0
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

else

  A = Atacou(A);

end  
    
  q = A;
  
endfunction

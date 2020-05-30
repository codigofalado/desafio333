function q = MedeDesempenho_IA_V2(N)
  
 %% V2: usa SimulacaoJogoV3
  
 player = nro_natural_aleatorio(2);
 
 compu_ganhou = 0;
 
 user_ganhou = 0;
 
 deu_velha= 0;
 
 deu_pau = 0;
 
 
 for i = 1:N
   
  resultado = SimulacaoJogo(player,0);  %simula um jogo
   
  if length(resultado)==1
   
    if resultado==1
      compu_ganhou = compu_ganhou + 1;
    else
      if resultado==0
        user_ganhou = user_ganhou + 1;
      else
        if resultado==-1
          deu_velha = deu_velha + 1;
        else
          deu_pau = deu_pau + 1;
        end
      end
    end   
    
  else
    
    deu_pau = deu_pau + 1;
  end

 end 
 
 compu = 100*compu_ganhou/N ;
 user = 100*user_ganhou/N ;
 deu_velha = 100*deu_velha/N ;
 deu_pau = 100*deu_pau/N ;
 
percentuais = [  compu   user   deu_velha   deu_pau  ];

label1 = strcat('computador: ',num2str(round(compu)),' %');
label2 = strcat('usuário: ',num2str(round(user)),' %');
label3 = strcat('empate: ',num2str(round(deu_velha)),' %');
label4 = strcat('deu pau: ',num2str(round(deu_pau)),' %');

pie(percentuais,[1 0 0 0],{label1,label2,label3,label4})

titulo = strcat('IA # Desafio333 - Simulação de ',num2str(N),' jogos');
title(titulo);

q = percentuais;
  
endfunction

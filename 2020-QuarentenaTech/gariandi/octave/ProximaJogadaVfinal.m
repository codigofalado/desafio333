function q = ProximaJogadaVfinal(dificuldade)
%% dificuldade: número de 0 a 1

a = rand(); %nro aleatorio de 0 a 1

Tabuleiro = csvread('Tabuleiro.csv');

if a < dificuldade
  %dessa nao ganharás!
  Tabuleiro = ProximaJogadaV3(Tabuleiro);   % IA - ganha em 90% dos casos, empata em 8%, só deixa user vencer 2%

else

  Tabuleiro = SorteiaJogadaCompu(Tabuleiro);  % computador faz jogada aleatória
 
end

csvwrite('Tabuleiro.csv',Tabuleiro); %Tabuleiro vai ser 3x3 durante o jogo e 1x1 no final

q = 1;

end
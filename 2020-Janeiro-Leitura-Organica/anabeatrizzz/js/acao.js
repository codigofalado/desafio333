$(function(){
	$("#relogio").timer({
		format: '%H:%M:%S'
	});

	titulos = [
		"textos/titulo1.txt",
		"textos/titulo2.txt",
		"textos/titulo3.txt",
		"textos/titulo4.txt",
		"textos/titulo5.txt"
	]
	textos = [
		"textos/texto1.html", // A bruxa e o caldeirão, 651 palavras
		"textos/texto2.html", // O Miudinho, 670 palavras
		"textos/texto3.html", // O Soldado e o Diabo, 685 palavras
		"textos/texto4.html", // O Sargento Verde, 902 palavras
		"textos/texto5.html" // A Onça e o Cabrito, 989 palavras
	];

	x = Math.floor(Math.random() * 5);
	var quant_min;
	var ppm;
	var resultado;
	var textoo2;
	var link;

	$("#titulo").load(titulos[x]);
	$("#texto").load(textos[x])

	$("#fim").click(function(){
		$("#relogio").timer('pause');

		var titulo_atual = $("#titulo").text();

		var horas = Number($("#relogio").text().substr(0, 2));
		var minutos = Number($("#relogio").text().substr(3, 2));
		var segundos = Number($("#relogio").text().substr(6, 8));

		var segundos_convertidos = segundos / 60;
		var horas_convertidas = horas * 60;

		var soma = segundos_convertidos + horas_convertidas + minutos;

		switch(titulo_atual){
			case "A bruxa e o caldeirão":
				quant_min = soma.toFixed(0)
				resultado = 651 / soma
				ppm = resultado.toFixed(0)
				textoo2 = `Parabéns! Você leu um texto com <b>651</b> em <b>${horas}</b> horas e <b>${minutos}</b> minutos <b>${segundos}</b> segundos e seu PPM atual é de <b>${ppm}</b>.`
				link = `https://twitter.com/intent/tweet?text=Li um texto com 651 palavras em ${horas} horas ${minutos} minutos e ${segundos}. Meu PPM atual é de ${ppm}! Faça seu teste também em https://anabeatrizzz.netlify.com`
				break;
			case "O Miudinho":
				quant_min = soma.toFixed(0)
				resultado = 670 / soma
				ppm = resultado.toFixed(0)
				textoo2 = `Parabéns! Você leu um texto com <b>670</b> palavras em <b>${horas}</b> horas e <b>${minutos}</b> minutos <b>${segundos}</b> segundos e seu PPM atual é de <b>${ppm}</b>.`
				link = `https://twitter.com/intent/tweet?text=Li um texto com 670 palavras em ${horas} horas ${minutos} minutos e ${segundos}. Meu PPM atual é de ${ppm}! Faça seu teste também em https://anabeatrizzz.netlify.com`
				break;
			case "O Soldado e o Diabo":
				quant_min = soma.toFixed(0)
				resultado = 685 / soma
				ppm = resultado.toFixed(0)
				textoo2 = `Parabéns! Você leu um texto com <b>685</b> palavras em <b>${horas}</b> horas <b>${minutos}</b> minutos e <b>${segundos}</b> segundos e seu PPM atual é de <b>${ppm}</b>.`
				link = `https://twitter.com/intent/tweet?text=Li um texto com 685 palavras em ${horas} horas ${minutos} minutos e ${segundos}. Meu PPM atual é de ${ppm}! Faça seu teste também em https://anabeatrizzz.netlify.com`
				break;
			case "O Sargento Verde":
				quant_min = soma.toFixed(0)
				resultado = 902 / soma
				ppm = resultado.toFixed(0)
				textoo2 = `Parabéns! Você leu um texto com <b>902</b> palavras em <b>${horas}</b> horas <b>${minutos}</b> minutos e <b>${segundos}</b> segundos e seu PPM atual é de <b>${ppm}</b>.`
				link = `https://twitter.com/intent/tweet?text=Li um texto com 902 palavras em ${horas} horas ${minutos} minutos e ${segundos}. Meu PPM atual é de ${ppm}! Faça seu teste também em https://anabeatrizzz.netlify.com`
				break;
			case "A Onça e o Cabrito":
				quant_min = soma.toFixed(0)
				resultado = 989 / soma
				ppm = resultado.toFixed(0)
				textoo2 = `Parabéns! Você leu um texto com <b>989</b> palavras em <b>${horas}</b> horas <b>${minutos}</b> minutos e <b>${segundos}</b> segundos e seu PPM atual é de <b>${ppm}</b>.`
				link = `https://twitter.com/intent/tweet?text=Li um texto com 989 palavras em ${horas} horas ${minutos} minutos e ${segundos}. Meu PPM atual é de ${ppm}! Faça seu teste também em https://anabeatrizzz.netlify.com`
				break;
		}
		
		localStorage.setItem("result", textoo2);
		localStorage.setItem("link", link)
	});

	$("#texto3").html(localStorage.getItem("result"));
	$("#twitter").attr("href", localStorage.getItem("link"))
	$("#face").attr("href", "https://www.facebook.com/share.php?u=https://anabeatrizzz.netlify.com")
	$("#ld").attr("href", "https://www.linkedin.com/sharing/share-offsite/?url=https://anabeatrizzz.netlify.com")

	$("#submit").click(function(){
		var email = $("#email").val()
		$("#submitlink").attr("href", `mailto:${email}?Subject=Leitura%20Orgânica&body=${localStorage.getItem("result")}`)
	});
});

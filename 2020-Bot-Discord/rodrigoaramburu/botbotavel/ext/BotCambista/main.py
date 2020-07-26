import typing
from discord import TextChannel, DMChannel, Member, Embed
import requests
import re
from datetime import datetime



from botbotavel.BotBase import BotBase
from botbotavel.utils import is_float

class BotCambista(BotBase):
       
    botname: str = "BotCambista"

    loop_time: int = 60

    async def init(self):
        print("Inicializando BotCambista...")
        print("BotCambista inicializado")


    async def receive_message( self, message_content: str, channel: typing.Union[TextChannel, DMChannel], member: Member ) -> None:
        if not message_content.startswith("!botcambista"):
            return

        options = list( filter(None,re.split(r"('(?:[^']|'')*')| ", message_content) ) )[1:]

        if len(options) < 2:
            await channel.send(f"<@{member.id}>, informe tipo(ex. BRL-USD) de conversão e valor")
            return
        
        conv_format = options[0].strip().strip("'").upper().split("-")
        if len(conv_format) == 2:
            currency_from = conv_format[0]
            currency_to = conv_format[1] 
        else:
            await channel.send(f"<@{member.id}>, formato de tipo de conversão inválido")
            return
        
        if is_float( options[1].strip().strip("'") ):
            quantidade = float(options[1].strip().strip("'") )
        else:
            await channel.send(f"<@{member.id}>, a quantidade parece não ser um número")
            return

        response = requests.get(f'https://api.exchangerate.host/latest?base={currency_from}')
        if response:

            data = response.json()
            dt = datetime.strptime(data[ 'date' ], '%Y-%m-%d')

            embed = Embed( title=f"{member.display_name} quer converter uns troco: ")
            #embed.set_image(url = f"http://openweathermap.org/img/w/{data['weather'][0]['icon']}.png" )


            embed.add_field(name="Moeda Origem", value=f"```{ currency_from }```", inline=True)
            embed.add_field(name="Moeda Destino", value=f"```{ currency_to }```", inline=True)
            embed.add_field(name=f"Cotação { currency_to }", value=f"```{ '{:.2f}'.format( 1.0 / data['rates'][ currency_to ] ).replace('.',',') } { currency_from }```", inline=True)
            embed.add_field(name="Data Converção", value=f"```{ '{:{dtf}}'.format(dt, dtf='%d/%m/%Y')}```", inline=True)
            embed.add_field(name="Quantidade a ser Convertida", value=f"```{ '{:.2f}'.format(quantidade).replace('.',',') } {currency_from}```", inline=True)
            embed.add_field(name="Resultado", value=f"```{ '{:.2f}'.format(quantidade * data['rates'][ currency_to ]).replace('.',',') } {currency_to}```", inline=False)
            
            
            await channel.send(f"<@{member.id}>" , embed=embed)

        else:
            await channel.send(f"<@{member.id}>, não foi possível acessar o tempo")






        
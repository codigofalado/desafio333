import requests
import json
import typing 
import re
from _datetime import datetime
from decouple import config
from discord import Embed, TextChannel, DMChannel, Member

from botbotavel.BotBase import BotBase

class TempoBot(BotBase):
    
    botname: str = "TempoBot"

    async def init(self):
        print("Inicializando TempoBot...")
        print("TempoBot inicializado")


    async def receive_message( self, message_content: str, channel: typing.Union[TextChannel, DMChannel], member: Member ) -> None:
        if not message_content.startswith("!bottempo"):
            return

        options = list( filter(None,re.split(r"('(?:[^']|'')*')| ", message_content) ) )[1:]

        if not options:
            await channel.send(f"<@{member.id}>, informe uma cidade para obter o tempo")

        key = config('OPEN_WEATHER_KEY')
        q = options[0].strip().strip("'")
        
        response = requests.get(f'http://api.openweathermap.org/data/2.5/weather?q={q}&appid={key}&lang=pt_br')
        if response:

            data = json.loads( response.text )

            embed = Embed( title=f"{member.display_name} olha pela janela e vê q o tempo de {q} está: ")
            embed.set_image(url = f"http://openweathermap.org/img/w/{data['weather'][0]['icon']}.png" )

            
            embed.add_field(name="Temperatura", value=f"```{ '{:.1f}'.format(float(data['main']['temp']) - 273.15) }ºC```", inline=True)
            embed.add_field(name="Pressão", value=f"```{ data['main']['pressure'] } hPa```", inline=True)
            embed.add_field(name="Humidade", value=f"```{ data['main']['humidity'] } %```", inline=True)
            embed.add_field(name="Cidade", value=f"```{ data['name'] } - {data['sys']['country']}```", inline=False)
            embed.add_field(name="Descrição", value=f"```{ data['weather'][0]['description'] }```", inline=False)
            
            
            await channel.send(f"<@{member.id}>" , embed=embed)

        else:
            await channel.send(f"<@{member.id}>, não foi possível acessar o tempo")






        
import typing
from discord import TextChannel, DMChannel, Member, Embed
import re
from googletrans import Translator 



from botbotavel.BotBase import BotBase
from botbotavel.utils import is_float

class TraduBot(BotBase):
       
    botname: str = "TraduBot"

    async def init(self):
        print("Inicializando TraduBot...")
        print("TraduBot inicializado")


    async def receive_message( self, message_content: str, channel: typing.Union[TextChannel, DMChannel], member: Member ) -> None:
        if not message_content.startswith("!tradubot"):
            return

        options = list( filter(None,re.split(r"('(?:[^']|'')*')| ", message_content) ) )[1:]

        if len(options) < 2:
            await channel.send(f"<@{member.id}>, informe tipo(ex. pt-en) e o texto a ser traduzido.")
            return
        
        tradu_format = options[0].strip().strip("'").split("-")
        if len(tradu_format) == 2:
            language_from = tradu_format[0]
            language_to = tradu_format[1] 
        else:
            await channel.send(f"<@{member.id}>, formato inválido")
            return
        
        texto = options[1].strip().strip("'")

        translator = Translator()
        try:
            tradu = translator.translate( texto ,src=language_from, dest=language_to )
        except ValueError as e:
            await channel.send(f"<@{member.id}>, ocorreu um erro ao traduzir '{e}'")
            return

        if tradu:
            embed = Embed( title=f"{member.display_name} quer traduzir: ")
            #embed.set_image(url = f"" )


            embed.add_field(name="De", value=f"```{ tradu.src }```", inline=True)
            embed.add_field(name="Para", value=f"```{ tradu.dest }```", inline=True)
            embed.add_field(name="Texto Original", value=f"```{ texto }```", inline=False)
            embed.add_field(name="Texto Traduzido", value=f"```{ tradu.text }```", inline=False)
            
            await channel.send(f"<@{member.id}>" , embed=embed)

        else:
            await channel.send(f"<@{member.id}>, não foi possível acessar o tempo")






        
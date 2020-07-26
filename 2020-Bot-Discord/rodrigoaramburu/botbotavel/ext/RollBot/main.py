from discord import TextChannel, DMChannel,Member, Embed,Colour
import typing
import re
from botbotavel.BotBase import BotBase

from botbotavel.ext.RollBot.RollDice import RollDice


class RollBot(BotBase):

    botname: str = 'RollBot'

    async def init(self):
        print('Inicializando RollBot...')
        print('RollBot iniciado.')


    async def receive_message(self, message_content: str, channel: typing.Union[TextChannel,DMChannel], member: Member) -> None:
        if not message_content.startswith("!botroll"):
            return 
        
        
        options = list( filter(None,re.split(r"('(?:[^']|'')*')| ", message_content) ) )[1:]
        if not options:
            await channel.send(f"<@{member.id}>, informe uma expressão de dado")

        rd = RollDice()
        result = rd.roll( options[0].strip("'") )

        para = ""
        if len(options) > 1:
            para = "para " + options[1]

        embed = Embed( title=f"{member.display_name} rolou dados {para}")
        embed.set_image(url = member.avatar_url )
        tmp = []
        for dice in result.get_results_dice():
            tmp.append( f"({dice})" )
        
        plus = ""
        if result.get_operator() != '':
            plus = f" ({ result.get_operator() }{result.get_value_operator()}) "

        resultado = f"```{ ' + '.join( tmp )}{plus}    ```"

        embed.add_field(name="Rolou", value=f"```{result.get_dice_expression()}```", inline=True)
        embed.add_field(name="Rolagem", value=resultado, inline=True)
        embed.add_field(name="Total", value=f"```{result.get_total_result()}```", inline=True)
        
        if result.get_condition() != '':
            embed.add_field(name="Resultado", value = '```Passou```' if result.is_pass() else '```Falhou```', inline=True)
            if result.is_pass():
                embed.colour = 0x0fdb53
            else:
                embed.colour = 0xff0000

        await channel.send(f"<@{member.id}>" , embed=embed)
        



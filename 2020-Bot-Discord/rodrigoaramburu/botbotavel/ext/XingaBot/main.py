import typing
import pathlib
import random
from bson.objectid import ObjectId
import sys
import traceback
from tabulate import tabulate
import textwrap
import re

from discord import TextChannel, DMChannel, Member
import discord
from botbotavel.BotBase import BotBase
from botbotavel.DatabaseMongo import DatabaseMongo
from botbotavel.utils import is_integer


class XingaBot(BotBase):

    botname: str = "XingaBot"
    xingamentos = typing.List

    loop_time: int = 60

    async def init(self):
        print("Inicializando XingaBot...")

        with DatabaseMongo(self) as mongodb:
            numero_xingamentos = mongodb.get_db_collection("xingamentos").count({})
            if numero_xingamentos == 0:
                file = str(pathlib.Path(__file__).parent.absolute()) + "/xingamentos.txt"

                with open(file, encoding="utf-8") as xingamentos:
                    for xingamento in xingamentos:
                        mongodb.get_db_collection("xingamentos").insert(
                            {
                                "_id": mongodb.get_db_collection_counter_id( "xingamentos" ),
                                "channel": 0,
                                "xingamento": xingamento.strip(),
                            }
                        )

        self.load_xingamentos()
        print("XingaBot iniciado.")

    async def receive_message( self, message_content: str, channel: typing.Union[TextChannel, DMChannel], member: Member ) -> None:
        if not message_content.startswith("!botbobo"):
            return

        options = list( filter(None,re.split(r"('(?:[^']|'')*')| ", message_content) ) )[1:]

        if not options:
            await self.xingar(channel, member)
            return

        if options[0] == "listar":
            await self.listar_xingamento(channel, member)
            return

        if options[0] == "adicionar":
            xingamento = options[1].strip("'") if  len(options) > 1 else None
            await self.adicionar_xingamento(channel, member, xingamento)
            return

        if options[0] == "deletar":
            xingamento_id = int( options[1].strip().strip("'") ) if len(options) > 1 and is_integer(options[1].strip("'")) else None
       
            await self.deletar_xingamento(channel, member, xingamento_id)
            return

    async def loop(self, channel: typing.Union[TextChannel, DMChannel]):

        member = None
        while not member:
            num = len(channel.members)
            index = random.randint(0, num - 1)
            member = channel.members[index]
            if member.id == self.botuser.id:
                member = None

        xingamentos = list( filter( lambda xinga: xinga["channel"] == 0 or xinga == channel.id, self.xingamentos ) )
        xingamento = random.choice(xingamentos)

        image_path = f"{pathlib.Path(__file__).parent.absolute()}/imgs/blender.png"
        file = discord.File(image_path, filename="image.png")
        
        embed = discord.Embed(title=f"Ei!, {member.display_name}!")
        embed.set_image(url="attachment://image.png")
        

        xingamentos = list( filter( lambda xinga: xinga["channel"] == 0 or xinga == channel.id, self.xingamentos ) )
        xingamento = random.choice(xingamentos)
        
        embed.add_field(name="Eu tenho uma coisa para te dizer!", value=xingamento['xingamento'])

        await channel.send(f" <@{member.id}>",file=file, embed=embed)

        return

    def load_xingamentos(self):
        with DatabaseMongo(self) as mongodb:
            x = mongodb.get_db_collection("xingamentos").find({})
            self.xingamentos = []
            for xinga in x:
                self.xingamentos.append(xinga)



    async def xingar( self, channel: typing.Union[TextChannel, DMChannel], member: Member ):
        """ Envia um xingamento para o membro que enviou a mensagem """

        image_path = f"{pathlib.Path(__file__).parent.absolute()}/imgs/blender.png"
        file = discord.File(image_path, filename="image.png")
        
        embed = discord.Embed(title=f"Ei!, {member.display_name}!")
        embed.set_image(url="attachment://image.png")

        xingamentos = list( filter( lambda xinga: xinga["channel"] == 0 or xinga == channel.id, self.xingamentos ) )
        xingamento = random.choice(xingamentos)
        
        embed.add_field(name="Eu tenho uma coisa para te dizer!", value=xingamento['xingamento'])

        await channel.send(f" <@{member.id}>",file=file, embed=embed)

        return


    async def adicionar_xingamento(self, channel: typing.Union[TextChannel, DMChannel], member: Member, xingamento: str ):

        if not member.permissions_in(channel).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return

        if not xingamento:
            await channel.send(f"<@{member.id}>, forneça um xingamento para ser adicionado" )
            return

        try:
            with DatabaseMongo(self) as mongodb:
                mongodb.get_db_collection("xingamentos").insert(
                    {
                        "_id": mongodb.get_db_collection_counter_id("xingamentos"),
                        "channel": channel.id,
                        "xingamento": xingamento,
                    }
                )
            self.load_xingamentos()
            await channel.send(f"<@{member.id}>, xingamento adicionado.")
        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send( f"<@{member.id}>, ocorreu um erro ao adicionar tente novamente." )



    async def deletar_xingamento( self, channel: typing.Union[TextChannel, DMChannel], member: Member, xingamento_id: int ):

        if not member.permissions_in(channel).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return

        if not xingamento_id:
            await channel.send( f"<@{member.id}>, informe um id de xingamento para deletar." )
            return

        try:
            with DatabaseMongo(self) as mongodb:
                xingamento = mongodb.get_db_collection("xingamentos").find_one( {"_id": xingamento_id} )

                if not xingamento:
                    await channel.send(f"<@{member.id}>, xingamento não encontrado")
                    return

                if xingamento["channel"] == 0:
                    await channel.send( f"<@{member.id}>, este é um xingamento inicial e não pode ser deletado" )
                    return

                mongodb.get_db_collection("xingamentos").delete_one( {"_id": xingamento_id} )

            self.load_xingamentos()
            await channel.send(f"<@{member.id}>, xingamento deletado.")
        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send( f"<@{member.id}>, ocorreu um erro ao deletar tente novamente." )


    async def listar_xingamento(self, channel: typing.Union[TextChannel, DMChannel], member: Member ):
        if not member.permissions_in(channel).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return

        try:
            with DatabaseMongo(self) as mongodb:
                xingamentos = mongodb.get_db_collection("xingamentos").find(
                    {"$or": [{"channel": channel.id}, {"channel": 0}]}
                )

            table_data = []
            for xingamento in xingamentos:
                table_data.append([
                    xingamento['_id'],
                    'Sim' if xingamento['channel'] == 0 else 'Não',
                    "\n".join( textwrap.wrap(xingamento['xingamento'] , 40) )
                ])

            blocos = [ table_data[x:x+10] for x in range(0,len(table_data) ,10) ]
            
            i = 0
            for b in blocos:
                table = "```"+tabulate(b , ['ID','Inicial',"Xingamento"] ,tablefmt="simple")+"```"
                if i == 0:
                    header = f"<@{member.id}>, Lista dos xingamentos do channel #{channel.name}\n"
                    header += "Os xingamentos iniciais não podem ser deletados\n"
                    await channel.send( header + table )
                else:
                    await channel.send( f"Parte {i+1}" + table )
                i += 1

        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send( f"<@{member.id}>, ocorreu um erro ao listar tente novamente." )
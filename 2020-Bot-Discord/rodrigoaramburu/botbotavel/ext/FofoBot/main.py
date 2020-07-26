import typing
import pathlib
import random
from bson.objectid import ObjectId
import sys
import traceback
from tabulate import tabulate
import textwrap
import re

from discord import TextChannel, DMChannel,Member
import discord
from botbotavel.BotBase import BotBase
from botbotavel.DatabaseMongo import DatabaseMongo
from botbotavel.utils import is_integer


class FofoBot(BotBase):

    botname: str = 'FofoBot'
    elogios = typing.List

    loop_time: int = 60

    async def init(self):
        print('Inicializando FofoBot...')
        with DatabaseMongo(self) as mongodb:
            numero_elogios = mongodb.get_db_collection('elogios').count({})
            if numero_elogios == 0:
                file = str( pathlib.Path(__file__).parent.absolute() ) + "/elogios.txt"
                with open( file , encoding='utf-8' ) as xingamentos:
                    for xingamento in xingamentos:
                        mongodb.get_db_collection('elogios').insert({
                            '_id': mongodb.get_db_collection_counter_id('elogios'),
                            'channel': 0 ,
                            'elogio' : xingamento.strip() 
                        })

        self.load_elogios()
        print('FofoBot iniciado.')



        
    async def receive_message(self, message_content: str, channel: typing.Union[TextChannel,DMChannel], member: Member) -> None:
        if not message_content.startswith("!botfofo"):
            roll = random.randint(1,20)
            if roll == 20:
                await self.elogiar( channel , member )
            return 
        else:
            options = list( filter(None,re.split(r"('(?:[^']|'')*')| ", message_content) ) )[1:]
            
            if not options:
                await self.elogiar( channel , member )
                return 

            if options[0] == 'listar':
                await self.listar_elogios( channel,  member )
                return 

            if options[0] == 'adicionar':
                elogio = options[1].strip().strip("'") if len(options[1]) > 1  else None
                await self.adicionar_elogio( channel,  member, elogio )
                return 

            if options[0] == 'deletar':
                elogio_id = int( options[1].strip("'") ) if len(options) > 1 and is_integer(options[1].strip("'")) else None
                await self.deletar_elogio( channel,  member, elogio_id )
                return 

    

    async def loop(self, channel: typing.Union[TextChannel,DMChannel] ):

        member = None 
        while not member:
            num = len( channel.members )
            index = random.randint( 0 , num-1 )
            member = channel.members[ index ]
            if member.id == self.botuser.id:
                member = None

  

        image_path = f"{pathlib.Path(__file__).parent.absolute()}/imgs/robofofo.png"
        file = discord.File(image_path, filename="image.png")
        
        embed = discord.Embed(title=f"Ei!, {member.display_name}!")
        embed.set_image(url="attachment://image.png")
        
        elogios = list( filter(lambda elo: elo['channel']  == 0 or elo == channel.id , self.elogios ) )
        elogio  = random.choice( elogios )   
        
        embed.add_field(name="Eu tenho uma coisa para te dizer!", value=elogio['elogio'])

        await channel.send(f" <@{member.id}>",file=file, embed=embed)

        return



    def load_elogios(self):
        try:
            with DatabaseMongo(self) as mongodb:
                elogios = mongodb.get_db_collection('elogios').find({})
                self.elogios = []
                for elo in elogios :
                    self.elogios.append( elo )
        except:
            traceback.print_exc(file=sys.stdout)



    async def elogiar(self, channel: typing.Union[TextChannel,DMChannel], member: Member ):
        elogios = list( filter(lambda elo: elo['channel']  == 0 or elo == channel.id , self.elogios ) )
        elogio  = random.choice( elogios )          
        

        image_path = f"{pathlib.Path(__file__).parent.absolute()}/imgs/robofofo.png"
        file = discord.File(image_path, filename="image.png")
        
        embed = discord.Embed(title=f"Ei!, {member.display_name}!")
        embed.set_image(url="attachment://image.png")
        
        elogios = list( filter(lambda elo: elo['channel']  == 0 or elo == channel.id , self.elogios ) )
        elogio  = random.choice( elogios )   
        
        embed.add_field(name="Eu tenho uma coisa para te dizer!", value=elogio['elogio'])

        await channel.send(f" <@{member.id}>",file=file, embed=embed)


        return


    async def adicionar_elogio(self , channel: typing.Union[TextChannel,DMChannel] , member: Member , elogio: str):

        if not member.permissions_in( channel ).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return

        if not elogio:
            await channel.send(f"<@{member.id}>, forneça um elogio para ser adicionado")
            return

        try:
            with DatabaseMongo(self) as mongodb:
                mongodb.get_db_collection('elogios').insert( {
                    '_id': mongodb.get_db_collection_counter_id('elogios'),
                    'channel': channel.id,
                    'elogio' : elogio
                })
            
            self.load_elogios()
            await channel.send(f"<@{member.id}>, elogio adicionado.")
        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send(f"<@{member.id}>, ocorreu um erro ao adicionar tente novamente.")
    



    async def deletar_elogio(self , channel: typing.Union[TextChannel,DMChannel] , member: Member , elogio_id: int):
        
        if not member.permissions_in( channel ).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return

        if not elogio_id:
            await channel.send(f"<@{member.id}>, informe um id de elogio para deletar.")
            return

        try:
            with DatabaseMongo(self) as mongodb:
                elogio = mongodb.get_db_collection('elogios').find_one( { '_id': elogio_id }  )
                if not elogio:
                    await channel.send(f"<@{member.id}>, elogio não encontrado")
                    return

                if elogio['channel'] == 0:
                    await channel.send(f"<@{member.id}>, este é um elogio inicial e não pode ser deletado")
                    return

                mongodb.get_db_collection('elogios').delete_one( {'_id': elogio_id } )
                self.load_elogios()
                await channel.send(f"<@{member.id}>, elogio deletado.")
        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send(f"<@{member.id}>, ocorreu um erro ao deletar tente novamente.")




    async def listar_elogios(self , channel: typing.Union[TextChannel,DMChannel] , member: Member):
        if not member.permissions_in( channel ).administrator:
            await channel.send(f"<@{member.id}>, você não é administrador do canal")
            return

        try:
            with DatabaseMongo(self) as mongodb:
                elogios = mongodb.get_db_collection('elogios').find( { '$or': [ {'channel': channel.id } , {'channel': 0 } ] } )

            table_data = []

            for elogio in elogios:
                table_data.append([
                    elogio['_id'],
                    'Sim' if elogio['channel'] == 0 else 'Não',
                    "\n".join( textwrap.wrap(elogio['elogio'] , 40) )
                ])

            blocos = [ table_data[x:x+10] for x in range(0,len(table_data) ,10) ]
            
            i = 0
            for b in blocos:
                table = "```"+tabulate(b , ['ID','Inicial',"Elogio"] ,tablefmt="simple")+"```"
                if i == 0:
                    header = f"<@{member.id}>, Lista dos elogios do channel #{channel.name}\n"
                    header += "Os elogios iniciais não podem ser deletados\n"
                    await channel.send( header + table )
                else:
                    await channel.send( f"Parte {i+1}" + table )
                i += 1

        except:
            traceback.print_exc(file=sys.stdout)
            await channel.send(f"<@{member.id}>, ocorreu um erro ao listar tente novamente.")
import discord
from discord import DMChannel, TextChannel, Member
import typing
from datetime import datetime
import asyncio
import traceback
import sys
from tabulate import tabulate


from botbotavel.BotBase import BotBase
from botbotavel.DatabaseMongo import DatabaseMongo




class MasterBot(discord.Client):

    bots: typing.List[BotBase] = []
    mongodb = None
    loop_count: int = 0

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.bg_task = self.loop.create_task(self.my_background_task())

    async def on_ready(self):
        print("Online...")
        print(f"Nome Bot: {self.user.name}")
        print(f"Id Bot: {self.user.id}")

        for bot in self.bots:
            self.init_bot( bot )
            bot.botuser = self.user
            await bot.init()
            


    async def on_message(self, message):
        if message.author == self.user or message.author.bot:
            return

        message_content = message.content
        channel = self.get_channel( message.channel.id )
        member = channel.guild.get_member( message.author.id )

        if message_content.startswith("!botbotavel"):
            await self.proccess_admin_message( message_content, channel, member )
        else:
             for bot in self.bots:
                if bot.is_active( channel.id ):
                    await bot.receive_message( message_content, channel, member )


    async def my_background_task(self):
        await self.wait_until_ready()
        counter = 0
        while not self.is_closed():
            if self.bots:
                for bot in self.bots:
                    
                    for channel_id in bot.loop_active_channels:
                        if self.loop_count % bot.loop_time == 0:
                            channel = self.get_channel( channel_id )
                            try:
                                await bot.loop( channel )
                            except:
                                traceback.print_exc(file=sys.stdout)
                
            await asyncio.sleep(60)
            self.loop_count += 1
            

    def adicionar(self, bot):
        """ Adiciona um subbot """
        self.bots.append(bot)


    def init_bot(self, bot: BotBase) -> None:
        """ Inicializa um bot """

        with DatabaseMongo(self) as mongodb:
            bot_banco = mongodb.get_db_collection('admin_bots').find( {"botname": bot.botname} )
    
            if bot_banco.count() > 0:
                bot.active_channels = bot_banco[0]['active_channels']
                bot.loop_active_channels = bot_banco[0]['loop_active_channels']
                bot.loop_time = bot_banco[0]['loop_time']
            else:
                bot_data = {
                                "botname": bot.botname,
                                "loop_time": bot.loop_time,
                                "active_channels": [],
                                "loop_active_channels": []
                            }
                mongodb.get_db_collection('admin_bots').insert_one( bot_data )

    
    async def proccess_admin_message(self, message_content: str, channel: typing.Union[TextChannel,DMChannel], member: Member ) -> None:
        """ processa comandos adminstrativos do bot """

        if not member.permissions_in( channel ).administrator:
            await channel.send(f"<@{member.id}> Você não é administrador do canal")
            return

        options = message_content.split()[1:]

        if not options:
            await channel.send( f"<@{member.id}>, informe um comando." )
            return

        if options[0] == 'listar':
            await self.listar_bots(channel , member)
            return

        if options[0] == 'ativar':
            await self.ativar_bot( options, channel, member )
            return


        if options[0] == 'desativar':
            await self.desativar_bot( options, channel, member )
            return


        if options[0] == 'loop_ativar':
            await self.ativar_loop_bot( options, channel, member )
            return

        if options[0] == 'loop_desativar':
            await self.desativar_loop_bot( options, channel, member )
            return

        if options[0] == 'set_loop_time':
            await self.set_loop_time( options, channel, member )
            return
            
        await channel.send("Comando não reconhecido")



    async def listar_bots(self, channel: typing.Union[TextChannel,DMChannel], member: Member  ):
        """ lista todos os bots disponiveis no channel e seu status """

        table_data = []  
        for bot in self.bots:
            table_data.append([
                    bot.botname,
                    ( "Ativo" if bot.is_active(channel.id) else "Inativo" ) ,
                    ( "Ativo" if bot.is_loop_active(channel.id) else "Inativo" ),
                    bot.loop_time
                ])

        blocos = [ table_data[x:x+10] for x in range(0,len(table_data) ,10) ]

        i = 0
        for b in blocos:
            table = "```"+tabulate(b , ['Nome Bot','Status',"Loop Status","Tempo de Loop"] ,tablefmt="simple")+"```"
            if i == 0:
                header = f"<@{member.id}>, Lista de Bots do Channel #{channel.name} \n"
                await channel.send( header + table )
            else:
                await channel.send( f"Parte {i+1}" + table )
            i += 1



    async def ativar_bot(self, options: typing.List[str], channel: typing.Union[TextChannel,DMChannel], member: Member  ):
        """ ativa um bot no channel """

        if len(options) < 2:
            await channel.send( f"<@{member.id}>, informe bot para ativar" )
            return

        for bot in self.bots:
            if bot.botname == options[1]:
                
                if not channel.id in bot.active_channels:
                    bot.active_channels.append(channel.id)
                    with DatabaseMongo(self) as mongodb:
                        mongodb.get_db_collection('admin_bots').update_one( 
                            {"botname": bot.botname} , 
                            {"$set":{"active_channels": bot.active_channels } } 
                        )
                
                await channel.send(f"<@{member.id}>, {bot.botname} Ativado" )
                return
        await channel.send(f"<@{member.id}>, {options[1]} não encontrado" )


    
    async def desativar_bot(self, options: typing.List[str], channel: typing.Union[TextChannel,DMChannel], member: Member  ):
        """ desativa um bot no channel """

        if len(options) < 2:
            await channel.send( f"<@{member.id}>, informe bot para desativar" )
            return

        for bot in self.bots:
            if bot.botname == options[1]:
                if channel.id in bot.active_channels:
                    bot.active_channels.remove(channel.id)
                    with DatabaseMongo(self) as mongodb:
                        mongodb.get_db_collection('admin_bots').update_one(
                             {"botname": bot.botname} , 
                             {"$set":{"active_channels": bot.active_channels } } 
                        )
                
                await channel.send(f"<@{member.id}>, {bot.botname} Desativado" )
                return
        await channel.send(f"<@{member.id}>, {options[1]} não encontrado" )

    

    async def ativar_loop_bot(self, options: typing.List[str], channel: typing.Union[TextChannel,DMChannel], member: Member  ):
        """ ativa um bot em loop no channel """

        if len(options) < 2:
            await channel.send( f"<@{member.id}>, informe bot para ativar" )
            return

        for bot in self.bots:
            if bot.botname == options[1]:
                if not channel.id in bot.loop_active_channels:
                    bot.loop_active_channels.append(channel.id)
                    with DatabaseMongo(self) as mongodb:
                        mongodb.get_db_collection('admin_bots').update_one( 
                            {"botname": bot.botname} , 
                            {"$set":{"loop_active_channels": bot.loop_active_channels } } 
                        )
                
                await channel.send(f"<@{member.id}>, {bot.botname}  loop ativado" )
                return
        await channel.send(f"<@{member.id}>, {options[1]} não encontrado" )



    async def desativar_loop_bot(self, options: typing.List[str], channel: typing.Union[TextChannel,DMChannel], member: Member  ):
        """ desativa um loop bot no channel """

        if len(options) < 2:
            await channel.send( f"<@{member.id}>, informe bot para desativar" )
            return

        for bot in self.bots:
            if bot.botname == options[1]:
                if channel.id in bot.loop_active_channels:
                    bot.loop_active_channels.remove(channel.id)
                    with DatabaseMongo(self) as mongodb:
                        mongodb.get_db_collection('admin_bots').update_one( 
                            {"botname": bot.botname} , 
                            {"$set":{"loop_active_channels": bot.loop_active_channels } } 
                        )
                
                await channel.send(f"<@{member.id}>, {bot.botname} loop desativado" )
                return
                
        await channel.send(f"<@{member.id}>, {options[1]} não encontrado" )



    async def set_loop_time(self, options: typing.List[str], channel: typing.Union[TextChannel,DMChannel], member: Member  ):
        """ desativa um loop bot no channel """

        if len(options) < 2:
            await channel.send( f"<@{member.id}>, informe bot" )
            return
        
        if len(options) < 3:
            await channel.send( f"<@{member.id}>, informe um tempo em minutos" )
            return

        for bot in self.bots:
            if bot.botname == options[1]:

                bot.loop_time = int( options[2] )
                with DatabaseMongo(self) as mongodb:
                    mongodb.get_db_collection('admin_bots').update_one( 
                        {"botname": bot.botname} , 
                        {"$set":{"loop_time": bot.loop_time } } 
                    )
                
                await channel.send(f"<@{member.id}>, {bot.botname} intervalo de loop alterado para {bot.loop_time}" )
                return
                
        await channel.send(f"<@{member.id}>, {options[1]} não encontrado ou inativo" )

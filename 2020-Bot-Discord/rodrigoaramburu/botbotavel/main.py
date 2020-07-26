from decouple import config

from MasterBot import MasterBot
from botbotavel.ext import BotChamada, XingaBot, FeedNewsBot, FofoBot, BotTube, RollBot,TempoBot ,BotCambista,TraduBot,SabioBot


masterbot = MasterBot()

masterbot.adicionar( BotChamada.create_bot() )
masterbot.adicionar( XingaBot.create_bot() )
masterbot.adicionar( FofoBot.create_bot() )
masterbot.adicionar( FeedNewsBot.create_bot() )
masterbot.adicionar( BotTube.create_bot() )
masterbot.adicionar( RollBot.create_bot() )
masterbot.adicionar( TempoBot.create_bot() )
masterbot.adicionar( BotCambista.create_bot() )
masterbot.adicionar( TraduBot.create_bot() )
masterbot.adicionar( SabioBot.create_bot() )


masterbot.run( config('DISCORD_BOT_KEY') )
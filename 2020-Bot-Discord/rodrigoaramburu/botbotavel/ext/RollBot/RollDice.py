import typing
import random
import re

class DiceResult:

    results_dice: typing.List[int] = []
    dice_type: int = 0
    number_dices:int = 0
    operator: str = '' 
    value_operator: int = 0 
    condition: str = ''
    value_condition: int = 0
    
    def __init__(self):
        self.results_dice = []
        self.dice_type = 0
        self.number_dices = 0
        self.operator = ''
        self.value_operator = 0
        self.condition = ''
        self.value_condition = 0


    def set_dice_expression(self, dice_expression: str) -> None:
        self.dice_expression = dice_expression

    def get_dice_expression(self) -> str:
        return self.dice_expression

    def set_dice_type(self, dice_type: int) -> None:
        self.dice_type = dice_type

    def get_dice_type(self) -> int:
        return self.dice_type

    def set_number_dices(self, number_dice: int) -> int:
        self.number_dices = number_dice

    def get_number_dices(self) -> int:
        return self.number_dices

    def add_result_dice(self, result: int) -> None:
        self.results_dice.append( result )

    def get_results_dice(self) -> typing.List[int]:
        return self.results_dice

    def set_operator(self, operator: str) -> None:
        self.operator = operator

    def get_operator(self) -> str:
        return self.operator

    def set_value_operator(self, value: int) -> None:
        self.value_operator = value

    def get_value_operator(self) -> int:
        return self.value_operator

    def set_condition(self, condition) -> None:
        self.condition = condition

    def get_condition(self) -> str:
        return self.condition

    def set_value_condition(self, value) -> None:
        self.value_condition = value

    def get_value_condition(self) -> int:
        return self.value_condition

    def get_total_result(self) -> int:
        if self.operator == '+':
            return sum(self.results_dice) + self.value_operator
        elif self.operator == '-':
            return sum(self.results_dice) - self.value_operator
        else:
            return sum(self.results_dice)

    def is_pass(self):
        if self.condition == '>':
            return self.get_total_result() > self.value_condition
        elif self.condition == '=':
            return self.get_total_result() == self.value_condition
        else:
            return self.get_total_result() < self.value_condition

class RollDice:

    def roll(self, dice_expression):

        p = re.compile(r"(?P<ndice>\d*)d(?P<tdice>\d+)(?P<op>[+-]?)(?P<nadicional>\d*)(?P<condition>[><=]?)(?P<cond_value>\d*)")
        match = p.match(dice_expression)
        
        if not match:
            raise ValueError("Expressão de dado inválida")

        ndice = int( match.group('ndice') ) if match.group('ndice') else 1 
        dice_type = int( match.group('tdice') )
        op = match.group('op') if match.group('op') else ''
        nadicional = int(match.group("nadicional")) if match.group("nadicional") else 0 
        condition = match.group('condition') if match.group('condition') else ''
        cond_value = int(match.group("cond_value")) if match.group("cond_value") else 0

        if op and not nadicional:
            raise ValueError("Expressão inválida")

        if condition and not cond_value:
            raise ValueError("Expressão inválida")

        dr = DiceResult()
        dr.set_dice_expression(dice_expression)
        dr.set_dice_type( dice_type )
        dr.set_number_dices( ndice )
        dr.set_operator( op )
        dr.set_value_operator( nadicional )
        dr.set_condition( condition )
        dr.set_value_condition( cond_value )
        
        for i in range(0,ndice):
            dr.add_result_dice( random.randint(1 , dice_type ) )
        
        return dr
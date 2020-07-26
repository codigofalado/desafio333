
def is_integer( value ):
    try:
        int( value )
        return True
    except ValueError:
        return False

def is_float( value ):
    try:
        float( value )
        return True
    except ValueError:
        return False
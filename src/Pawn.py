import subprocess
from random import randint

class Pawn:
    uid = None
    """User ID passed by it's created cookie"""
    uname = None
    """User name seted on app start UI"""
    timeOfEffect = None

    def __init__(self, uid, uname):
        """
        Pawn constructor!
        Let magic happens......
        :param str uid: User id
        :param str uid: User name
        """
        self.uid = uid
        self.uname = uname
        self.timeOfEffect = randint(10, 120)

    def pawn(self):
        """
        Exec all
        :return:
        """
        return True

    def __roll_dice(self):
        """
        Select pawn randomly from actual list
        :return:
        """
        pass

    def __pawn_list(self):
        """
        Gets all list of available commands to be executed
        :return:
        """
        return {
            "Net Down": f"sudo ifdown -a; sleep {timeOfEffect}s; sudo ifup -a",
            "No volume": f"amixer -D pulse sset Master 0%; sleep {timeOfEffect}s; amixer -D pulse sset Master 100%"
        }
        
        pass

    def __notify(self):
        """
        Notify user to success pawn
        :return:
        """

    def __exec_it(self, cmd):
        """
        Execute given command in dude shell
        :param str cmd:
        :return:
        """
        
        process = subprocess.Popen(cmd.split(), stdout=subprocess.PIPE)
        output, error = process.communicate()
        
        pass

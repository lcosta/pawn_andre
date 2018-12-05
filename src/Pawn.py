class Pawn:
    uid = None
    """User ID passed by it's created cookie"""
    uname = None
    """User name seted on app start UI"""

    def __init__(self, uid, uname):
        """
        Pawn constructor!
        Let magic happens......
        :param str uid: User id
        :param str uid: User name
        """
        self.uid = uid
        self.uname = uname

    def pawn(self):
        pass

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
        pass

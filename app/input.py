class Input:
    def __init__(self, name, is_percentage, default) -> None:
        self.name = name
        self.is_percentage = is_percentage
        self.default = default
        self.value = ""

    def is_valid(self):
        try:
            v = float(self.value)
        except:
            return False

        if v < 0:
            return False
        else:
            return True

    def bulma_color(self):
        if not self.value:
            return ""
        elif self.is_valid():
            return "is-success"
        else:
            return "is-danger"

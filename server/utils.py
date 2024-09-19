def singleton(cls):
    instances = {}
    def getinstance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return getinstance

# swap the date and month, i.e. DD/MM <-> MM/DD
def swap_date_month(date: str) -> str:
    parts = date.split("/")
    return f"{parts[1]}/{parts[0]}"
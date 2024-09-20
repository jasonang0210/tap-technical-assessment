# swap the date and month, i.e. DD/MM <-> MM/DD
def swap_date_month(date: str) -> str:
    parts = date.split("/")
    return f"{parts[1]}/{parts[0]}"

# append the user id in front of the team name for db purposes
def append_user_id_to_team_name(team_name: str, user_id: int):
    return f"{user_id}-{team_name}"

# remove the user id in front of the team name for web purposes
def remove_user_id_from_team_name(team_name: str):
    position = team_name.find("-")
    if position == -1:
        return team_name
    return team_name[position+1:]
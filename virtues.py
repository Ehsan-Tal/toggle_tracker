from datetime import datetime, timedelta
import configparser
import calendrical
import virtue_text as vt

def create_config_file():
    """Creates a configuration file."""

    write_config = configparser.ConfigParser();
    write_config.add_section("Virtues");

    for virtue in vt.virtues:
        name, desc = virtue;
        write_config.set("Virtues", name, desc);

    cfgfile = open("config.ini", 'w');
    write_config.write(cfgfile);
    cfgfile.close();

    return None


def read_sequence(title):
    """Searches for the correct file and returns True or False depending on success or failure.
    
     Parameters
     ----------
     title: str
        The name of the file as instructed by the current date.

     Returns
     ---------- 
     Boolean

    """

    print("Reading today's daily...")
    try:
        with open(title, mode='rt', encoding='utf-8') as r:
            print("Success !")
            return True
    except:
        print("Failure !")
        return False


def write_sequence(date, date_obj):
    """ This writes the daily by using a for loop to write out the sections and ensure they are divided by a long divider.

    Parameters
    ----------
    title: str
        What the daily will be called in the end.
    dates: str
        Gregorian date in ISO format
    date_obj: dict
        A collection of dates
     box: list
        A list that determines the order of what will be written out.
    """

    try:
        print('Opening Connection now...')
        w = open('.'.join([date, 'txt']), 'wt', encoding='utf-8')
        
        print("Creating the daily for {}...".format(date))

        w.writelines(["\n\nDates \n"])
        w.writelines(['- In the Gregorian calendar:    ', date_obj['Gregorian'], '\n'])
        w.writelines(['- In the Qamari Hijri calendar: ', date_obj['Hijri'], '\n'])
        w.writelines(['- In the Shamsi Hijri calendar: ', date_obj['Jalali'], '\n'])
        w.writelines(['- In the ISO-8601 calendar:     ', date_obj['ISO-8601'], '\n'])       
        w.writelines(['- In the Jacobin calendar:      ', date_obj['Jacobin'], '\n'])
        w.writelines(['- In the Judean calendar:       ', date_obj['Judean'], '\n'])
        w.writelines(['- In the Yin calendar:          ', date_obj['Chinese'], '\n'])

        
    finally:
        print("Closing connection now...")
        w.close()

def create_week():
    """Creates files for each day of the week."""
    print("Creating it for a week...");

    for i in (0, 6):
        tomorrow = datetime.now().date() + timedelta( days = i );
        write_sequence(tomorrow.isoformat(), calendrical.get_dates(tomorrow));
        
    return None


def main():
    """
    The main function which iniates the processes to create a notepad daily.

    Parameters
    ---------
        Today: str
            The date today in ISO format
        tomorrow: str
            The date tomorrow ISO format

    """

    Today = datetime.now().date();
    tomorrow = datetime.now().date() + timedelta( days = 1 );

    if not read_sequence('.'.join([Today.isoformat(), 'txt'])):
        print("Creating today's daily...")
        write_sequence(Today.isoformat(), calendrical.get_dates(Today))
    else:
        print("Creating tomorrow's daily...")
        write_sequence(tomorrow.isoformat(), calendrical.get_dates(tomorrow))


if __name__ == '__main__':
    main()

else:
    print('This is imported as: ' + __name__)

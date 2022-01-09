import configparser
import virtue_text as vt


def create_metadata():
    """Creates the section in the configuration file.
    This starts at 1.
    
    arguments
        write_config: method

        cfgfile:
    
    returns
        None
    """

    print("Creating the metadata...");
    config = configparser.ConfigParser();
    config.read("config.ini");

    config.set('METADATA','entry_id', '1');
    config.set('METADATA','week_id', '1');

    cfgfile = open("config.ini", 'w');
    config.write(cfgfile);
    cfgfile.close();


    return None


def set_metadata(entry_id, week_id):
    """Sets the entry and week id in the config.    
    arguments
        config: method
            configparser.ConfigParser();
        entry_id: int
            the entry_id
        week_id: int
            the week_id
    returns
        None
    """

    print("Setting the metadata...");
    config = configparser.ConfigParser();
    config.read("config.ini");

    config.set('METADATA','entry_id', str(entry_id));
    config.set('METADATA','week_id', str(week_id));

    cfgfile = open("config.ini", 'w');
    config.write(cfgfile);
    cfgfile.close();
        
    print('entry_id = ', entry_id);
    print('week_id = ', week_id);

    print('\n-----\n')
    
    return None


def get_metadata():
    """Gets the entry and week id in the config.
    arguments
        config: method
            configparser.ConfigParser();
        entry_id: int
            config['Metadata']['entry_id'])
        week_id: int
            int(config['Metadata']['week_id'])
    returns
        None
    """
    
    print("Getting the metadata...");
    config = configparser.ConfigParser();
    config.read('config.ini');
    
    entry_id = int(config['METADATA']['entry_id']);
    week_id = int(config['METADATA']['week_id']);
    
    print('entry_id = ', entry_id);
    print('week_id = ', week_id);

    print('\n-----\n')
    
    return entry_id, week_id


def create_accomplishment_data():
    """
    arguments
        virtues: list
            this is a list of virtues to use to make the accomplishment data.
        config: method
            configparser.ConfigParser();
    returns
        None
    """
    
    print("Creating the accomplishments...");
    config = configparser.ConfigParser();
    config.read('config.ini');

    for virtue in vt.virtues:
        name, desc = virtue;
        print(name, 'starts with', '0,0,0,0,0,0,0');
        config.set("ACCOMPLISHMENTS", str(name), '0,0,0,0,0,0,0');
        #for each virtue key, it adds 7 csv 0s to represent the days.

    cfgfile = open("config.ini", 'w');
    config.write(cfgfile);
    cfgfile.close();

    return None


def set_accomplishment_data(accomplishments):    
    """Sets the accomplishment.

    arguments
        accomplishments: dict
            stores the day-values in a tuple by virtue-keys.
            a is the virtue - key -  and the days are csv in int-tuple format.

        config: method
            configparser.ConfigParser();

    returns
        None
    """

    print("Setting the accomplishments...");
    config = configparser.ConfigParser();
    config.read('config.ini');

    for name in accomplishments:
        print(name, 'will have', accomplishments[name]);
        config.set("ACCOMPLISHMENTS", str(name), str( accomplishments[name] ) );

    print('\n-----\n');

    cfgfile = open("config.ini", 'w');
    config.write(cfgfile);
    cfgfile.close();

    return None


def get_accomplishment_data():
    """ Gets the accomplishment.

    arguments
        config: method
            configparser.ConfigParser();
            
        accomplishments: dict
            stores the day-values in a tuple by virtue-keys.
            NOTE: the day values are in csv.

    returns
        None
    """

     
    print("Getting the accomplishments...");
    config = configparser.ConfigParser();
    config.read('config.ini');
    accomplishments = {};

    for virtue in vt.virtues:
        name, desc = virtue;
        accomplishments[name] = config['ACCOMPLISHMENTS'][name];
        print(name,'has', accomplishments[name] );

    print('\n-----\n');

    return accomplishments


def main():

    try:
        print("Creating sections...");
        config = configparser.ConfigParser();
        config.read('config.ini');
        config['METADATA'];
    
    except:
        config.add_section('METADATA');
        config.add_section('ACCOMPLISHMENTS');
    
    finally:
        cfgfile = open("config.ini", 'w');
        config.write(cfgfile);
        cfgfile.close();
    
    return None


if __name__ == '__main__':
    main();
    create_metadata();
    create_accomplishment_data();

else:
    print('This is imported as: ' + __name__)
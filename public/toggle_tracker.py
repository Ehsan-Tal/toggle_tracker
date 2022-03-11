import sqlite3
import os
import json
from pprint import pprint
import sys

# TODO: make some way to CRUD the data with a GUI or even a CLI.
# TODO: find some way to alter the print statement - or a repr statement - so that I can have all status messages be unique.


def repr(string):
    """An alteration to make the log messages easier to read."""
    print( '\n>', string );
    return string

def create_GUI():
    """Creates a GUI that allows for CRUD operations."""
    return None


def insert_entries(JSONobj):
    """Inserts entries into the tables of the database.
    I.e., it uses the date plus the category, name, and progress to create entries.
    
    arguments
        conn: sqlite3.connect('toggle_tracker.db')
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.
        
        progress: table
            #NOTE: sqlite3 lacks boolean; work-around is 1, True & 0, False
            entry_id  integer PRIMARY KEY AUTOINCREMENT,
            date      text    NOT NULL,
            category  text    NOT NULL,
            label     text    NOT NULL,
            performed integer

        JSONobj['date']: str
            this is the date field at the top of the JSON file or object.
        JSONobj['categories']: list
            this is a list of objects - each containing a list of objects.
        category['name']: str
            this is the name of the category of the thing I am to do.

        category['components']: list
            this is the list of objects contained in the previous list of objects.
        component['name']: str
            this is the label of the thing I am to do.
        component['progress']: int
            this is the value of whether or not I did the thing.

    return
        None
    """

    conn = sqlite3.connect('toggle_tracker.db');
    curs = conn.cursor();
    repr('Inserting entries...')

    try:
        for category in JSONobj['categories']:
            for component in category['components']:
                curs.execute("""INSERT INTO progress
                (date, category, label, performed)
                VALUES (?, ?, ?, ?)
                """, (JSONobj['date'], category['name'], component['name'], int(component['progress'])));

                print("Inserting {} into {} of {} for {}.".format( component['progress'], component['name'], category['name'], JSONobj['date'] ));
                conn.commit();

    finally:
        conn.close();


    return None


def find_progress_by_date(date):
    """Returns records by date.
    
    arguments
        conn: sqlite3.connect('toggle_tracker.db')
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.

        temp_string: str
            the temporary string I used so that I could return the items while closing the connection.
    
        date: str
            in the format of yyyy-mm-dd.
    return
        curs.fetchall()
    """
    
    temp_string = "";

    conn = sqlite3.connect('toggle_tracker.db');
    curs = conn.cursor();

    repr('Selecting entries from {}...'.format(date));
    curs.execute("SELECT * FROM progress WHERE date = (?)", (date,) );
    
    temp_string = curs.fetchall();
    
    # committing changes; closing connections.
    conn.commit();
    conn.close();

    return temp_string


def find_progress():
    """Uses SELECT to return the progress table.

    arguments
        conn: sqlite3.connect('toggle_tracker.db')
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.

    return
        curs.fetchall()
    """

    # establishing connection; preparing cursor.
    conn = sqlite3.connect('toggle_tracker.db');
    curs = conn.cursor();

    repr('Selecting all entries...');
    curs.execute("SELECT * FROM progress");
    
    temp_string = curs.fetchall();
    
    # committing changes; closing connections.
    conn.commit();
    conn.close();

    print(temp_string);

    return temp_string


def delete_entries_by_date(date):
    """Deletes entries by date.
    
    arguments
        conn: sqlite3.connect('toggle_tracker.db')
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.

        date: str
            in the format of yyyy-mm-dd.

    return
        None
    """

    # establishing connection; preparing cursor.
    conn = sqlite3.connect('toggle_tracker.db');
    curs = conn.cursor();
    
    repr('Deleting entries of {}...'.format(date));
    curs.execute("DELETE FROM progress WHERE date = (?)", (date,));

    # committing changes; closing connections.
    conn.commit();
    conn.close();

    return None


def clear_database():
    """Clears the progress table of the toggle_tracker db.
        
    arguments
        conn: sqlite3.connect('toggle_tracker.db')
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.

    return
        None
        
    """

    conn = sqlite3.connect('toggle_tracker.db');
    curs = conn.cursor();
    
    repr('Clearing entries of the progress table...');
    curs.execute("DELETE FROM progress");

    conn.commit();
    conn.close();

    return None


def delete_database():
    """Deletes the database if found.
    useful for my type of tests."""

    repr('Removing the database...');
    os.remove('toggle_tracker.db');

    return None


def create_database():
    """Creates the database if not found and formulates it.
    
    arguments
        conn: sqlite3.connect('toggle_tracker.db')
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.
        
        progress: table
            #NOTE: sqlite3 lacks boolean; work-around is 1, True & 0, False
            entry_id  integer PRIMARY KEY AUTOINCREMENT,
            date      text    NOT NULL,
            category  text    NOT NULL,
            label     text    NOT NULL,
            performed integer

    returns
        None
    """

    # establishing connection; preparing cursor.
    conn = sqlite3.connect('toggle_tracker.db');
    curs = conn.cursor();

    try:
        # executing sqlite3 SQL syntax for the progress table.
        curs.execute("""CREATE TABLE progress(
                entry_id  integer PRIMARY KEY AUTOINCREMENT,
                date      text    NOT NULL,
                category  text    NOT NULL,
                label     text    NOT NULL,
                performed integer
        )""");

    finally:
        conn.commit();
    
    conn.close();

    return None


def main(JSONobj = {}):
    """
    first checks if there is a db file, creating one if not ;
    then if it is empty, loading one from the file if not;
    then if it is used already, leading to an early return.
    
    """
    testing = False;

    if not os.path.isfile('toggle_tracker.db'):
        create_database();
    
    if ( JSONobj == {} ):
        repr('Empty JSON object !');
        repr('Loading JSON file as test...');
        testing = True;
        # if the there is no object, the file is used as test data.

        with open("./toggle_tracker.json", mode = 'r', encoding='utf-8' ) as f:
            JSONobj = json.load(f);
            pprint(JSONobj);    

    if ( JSONobj['isUsed'] ):
        repr('JSON object already used !');
        return
    
    try:
        insert_entries( JSONobj );
        JSONobj['isUsed'] = True;
        
        pprint( find_progress() );
        pprint( find_progress_by_date(JSONobj['date']) );

    finally:    
        if testing:
            clear_database();
            delete_database();
            JSONobj['isUsed'] = False;
        
    # Writes out the new JSONobj into the JSON file.
    with open('toggle_tracker.json', mode = 'w', encoding='utf-8') as f:
        json.dump( JSONobj, f, indent = 4 );

    return None


if __name__ == '__main__':
    main();

else:
    print('hello');

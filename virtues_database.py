import sqlite3
import os
import virtue_text as vt
import configurations as co
from datetime import datetime, timedelta


def insert_entries(entry_id, week_id, accomplishments):
    """Create entries within the database.

    i.e., it creates an entry for each virtue with a unique entry-id for each one.
    
    the week-id is how we know for what week an item belongs to
    
    virtue is the virtue name - a foreign key to the primary key of the virtues table.
    everything else is a makeshift boolean.

    arguments
        conn: sqlite3.connect()
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.
        entry_id: int
            the entry_id
        week_id: int
            the week_id
        virtue: text
            the virtue from the virtue table from virtue_text.py

        accomplishments: dict
            the accomplishments that have virtue as key and the csv as values.
        
        su, mo, tu, we, th, fr, sa 
            the unpacked day csv values

        progress: table
            #NOTE: sqlite3 lacks boolean; work-around is 1, True & 0, False
            entry_id integer,
            week_id integer, 
            virtue text,
            sunday integer,  
            monday integer,  
            tuesday integer, 
            wednesday integer,
            thursday integer,
            friday integer,  
            saturday integer

    returns
        None
    """

    # establishing connection; preparing cursor.
    conn = sqlite3.connect('virtues.db');
    curs = conn.cursor();

    for virtue in vt.virtues:
        name, desc = virtue;

        su, mo, tu, we, th, fr, sa = accomplishments[name].split(',');
        curs.execute("""INSERT INTO progress 
        (entry_id, week_id, virtue, sunday, monday, tuesday, wednesday, thursday, friday, saturday) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (entry_id, week_id, name, int( su ), int( mo), int( tu ), int( we ), int( th ), int( fr ), int( sa )));

        conn.commit();
        entry_id += 1;
    
    # committing changes; closing connections.
    conn.commit();
    conn.close();

    week_id = insert_dates(week_id);

    return entry_id, week_id


def insert_dates(week_id):
    """Creates the date entries for each each week-id.
    
    arguments
        conn: sqlite3.connect()
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.
        week_id: int
            the given week_id
        
        now: datetime.datetime object
            the date today
            datetime.now().date();
            
        then: datetime.datetime object
            the same day, next week
            now + timedelta( days = 7 );
            
    returns
        week_id:int
            the given week_id + 1
    """
    #TODO: allow for an alternative date set other than now.
    
    print("Creating the dates...");
    now = datetime.now().date();
    then = now + timedelta( days = 7 );
    
    conn = sqlite3.connect('virtues.db');
    curs = conn.cursor();

    curs.execute(""" INSERT INTO week
    (week_id, start_date end_date) 
    VALUES (?, ?, ? ) """, 
    week_id, now.strftime('%Y-%m-%d'), then.strftime('%Y-%m-%d'));

    week_id += 1;

    return week_id


def find_progress():
    """Uses SELECT to return the weekly progress on specific virtues."""
    #TODO: ADD CRITERIAS
    # establishing connection; preparing cursor.
    conn = sqlite3.connect('virtues.db');
    curs = conn.cursor();

    curs.execute("SELECT * FROM progress");
    print(curs.fetchall());
    
    # committing changes; closing connections.
    conn.commit();
    conn.close();

    return None


def add_virtues():
    """This is to add new virtues as the list updates.
    i.e., it should check the last week_id"""
    return None


def create_week():
    """Adds start and end dates to the newly invented week table.

    arguments
        conn: sqlite3.connect()
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.

        week: table
            week_id integer primary key,
            start_date text,
            end_date text

            start_date date('now'),
            end_date date('now', '+6 day')

    returns
        None
    """

    # establishing connection; preparing cursor.
    conn = sqlite3.connect('virtues.db');
    curs = conn.cursor();
    
    curs.execute(""" CREATE TABLE week (

    week_id integer primary key,
    start_date text,
    end_date text

    )""");

    # committing changes; closing connections.
    conn.commit();
    conn.close();

    return None


def create_virtue():
    """Adds virtues to the newly created virtue table.
    ideally, this should only have to run once - add_virtues for new ones.

    arguments
        conn: sqlite3.connect()
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.
        
        virtues: table
            virtue_name text,
            virtue_desc text

    returns
        None
    """

    # establishing connection; preparing cursor.
    conn = sqlite3.connect('virtues.db');
    curs = conn.cursor();
    
    curs.execute(""" CREATE TABLE virtue (
    virtue_name text,
    virtue_desc text
    )""");
    conn.commit();

    for virtue in vt.virtues:
        name, desc = virtue;

        # this way is how we can use variables in sqlite3.
        curs.execute("INSERT INTO virtue (virtue_name, virtue_desc) VALUES(?, ?)",(name, desc));
        conn.commit();

    # committing changes; closing connections.
    conn.commit();
    conn.close();

    return None


def create_database():
    """Creates the database if not found.
    
    arguments
        conn: sqlite3.connect()
            this is a connection/creation command for sqlite3 databases (db).
        curs: conn.cursor()
            this is a cursor that allows SQL commands to affect the connected db.
        
        progress: table
            #NOTE: sqlite3 lacks boolean; work-around is 1, True & 0, False
            entry_id integer,
            week_id integer, 
            virtue text,
            sunday integer,
            monday integer,
            tuesday integer,
            wednesday integer,
            thursday integer,
            friday integer,
            saturday integer

    returns
        None
    """

    # establishing connection; preparing cursor.
    conn = sqlite3.connect('virtues.db');
    curs = conn.cursor();

    # executing sqlite3 SQL syntax.
    curs.execute("""CREATE TABLE progress(
            entry_id integer,
            week_id integer, 
            virtue text,
            sunday integer,
            monday integer,
            tuesday integer,
            wednesday integer,
            thursday integer,
            friday integer,
            saturday integer
    )""");
    

    # committing changes; closing connections.
    conn.commit();
    conn.close();

    create_virtue();
    create_week();

    return None


def main():

    if not os.path.isfile('virtues.db'):
        create_database();

    if not os.path.isfile('config.ini'):
        co.main();
        co.create_metadata();
        co.create_accomplishment_data();
    
    accomplishments = dict();

    accomplishments = co.get_accomplishment_data();
    entry_id, week_id = co.get_metadata();
    
    entry_id, week_id = insert_entries( entry_id, week_id, accomplishments );
    #find_progress(); ADD THE CRITERIA
    #insert_dates(week_id);

    co.set_metadata( entry_id, week_id );
    co.get_metadata();

    return None


if __name__ == '__main__':
    main();

else:
    print('This is imported as: ' + __name__)

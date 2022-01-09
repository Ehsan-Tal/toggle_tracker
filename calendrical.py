from hijri_converter import Gregorian
from pyluach import dates
import repubcal
from lunarcalendar import Lunar
from khayyam import JalaliDate
from datetime import datetime

def chinese_zodiac_translation(year):
    """
    Calculates the sexagenary Chinese zodiac – e.g., 'wood rat' – from the base year of 1984.

    Parameters:
    ----------
    animals: list
        Every year, the animal changes.
    elements: list
        Every two years, the element changes.
    year: int
        The input year from traditional/agricultural/yin calendar system
    translation: str
        The output string based on the calculations.
         First, the year needs to be subtracted bt the base year.
        
        The animal changes every year, so all we need to do is calculate modulo 12 as there are 12 iterations in one cycle.
         The element changes every 2 years, so we need to divide by 2 before we modulo by 5.

    Returns:
     ----------
    chinese_zodiac_box: list
        The first is the translation, the second is transliteration, and the third is the traditional.

    """

    animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig']
    elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water']

    year -= 1984

    translation = ''
    translation = elements[year//2 % 5] + " " + animals[year % 12]

    chinese_zodiac_box = [translation, chinese_zodiac_pinyin(translation), chinese_zodiac_traditional(translation)]
    
    return chinese_zodiac_box


def chinese_zodiac_traditional(translation):
    """ 
    Returns the original translation of the Chinese Zodiac in the script of Mandarin Chinese.

    Parameters
    ----------
    translation: str
        The input string from the chinese_zodiac_translation which houses all the calculations.
    traditional: str
           Splits the translation and then uses the key-value pair to represent the associated tradtional chinese logograph.
     element_zh: dict
    animal_zh: dict

    Returns
    ----------
    traditional: str
    
    """

    traditional = ''

    element_zh = {
                'Wood':'木',
                'Fire':'火',
                'Earth':'土',
                'Metal':'金',
                'Water':'水'

    }

    animal_zh = {
                'Rat':'鼠', 	
                'Ox':'牛', 	
                'Tiger':'虎',
                'Rabbit':'兔',
                'Dragon':'龙',
                'Snake':'蛇',
                'Horse':'马',
                'Goat':'羊',
                'Monkey':'猴',
                'Rooster':'狗',
                'Dog':'狗',
                'Pig':'猪'
    }

    traditional = ' '.join([element_zh[translation.split()[0]], animal_zh[translation.split()[1]]])

    return traditional


def chinese_zodiac_pinyin(translation):
    """
    Returns the pinyin transliteration of the Chinese Zodiac in the Latin script.
    
    Parameters
    ----------
    translation: str
        The input string from the chinese_zodiac_translation which houses all the calculations.
    chinese_pinyin_string: str
            Splits the translation and then uses the key-value pair to represent the associated pinyin transliteration.
    element_pi: dict
    animal_pi: dict

    Returns
    ----------
    chinese_pinyin_string: str
    """
    
    pinyin = ''

    element_pi = {
                'Wood':'mù',
                'Fire':'huǒ',
                'Earth':'tǔ',
                'Metal':'jīn',
                'Water':'shuǐ'

    }

    animal_pi = {
                'Rat':'shǔ', 	
                'Ox':'niú', 	
                'Tiger':'hǔ',
                'Rabbit':'tù',
                'Dragon':'lóng',
                'Snake':'shé',
                'Horse':'mǎ',
                'Goat':'yáng',
                'Monkey':'hóu',
                'Rooster':'jī',
                'Dog':'gǒu',
                'Pig':'zhū'
    }

    pinyin = ' '.join([element_pi[translation.split()[0]], animal_pi[translation.split()[1]]])

    return pinyin


def arabic_numerals_to_arabic_numerals(eng_date_string):
    """
    I quite like the wordplay I did since the numbers we use in English and beyond are called Arabic numerals,
    while the phrase Arabic numerals could also point to the numbers used in Arabic.

    Okay, this is to match numbers with their counterparts and simply convert them,
    and return in the same ISO format they came in in.

    Parameters
    ----------
    adad: dict
        Arabic numerals associated with their corresponding arabic number.
    eng_date_string: str
        The input value with Arabic numerals in the ISO format.

    Returns
    ----------
    arb_date_string: str
        The output value with Arabic numbers in the ISO format.
    """
    adad = {
          '0': '۰',
          '1': '١',
          '2': '٢',
          '3': '۳',
          '4': '٤',
          '5': '۵',
          '6': '٦',
          '7': '۷',
          '8': '۸',
          '9': '۹',
          '-': '-'
    }

    arb_date_string = ''
    
    for n in eng_date_string:
        arb_date_string += adad[n]
    
    return arb_date_string


def get_dates(date):
    """
    The point of this function is to return all the dates

    Parameters
    ---------
        date:  datetime.now().date()
            the date.

        CS_chinese, CS_gregorian, CS_hijri, CS_ISO_8601, CS_jacobin, CS_jalali, CS_judean: str
       
        dates_obj: dict
        
    Returns
    ---------
        dates_obj: dict
    """

    Hij = Gregorian.fromdate(date).to_hijri()
    Heb = dates.HebrewDate.from_pydate(date)
    Chi = Lunar.from_date(date)

    CS_chinese = ' '.join([ '{}-{}-{}'.format(Chi.year, Chi.month, Chi.day), 'year of the', ' | '.join(chinese_zodiac_translation(Chi.year))])
    CS_gregorian = date.strftime('%A %B %Y-%m-%d AD')
    CS_hijri = ' '.join([Hij.day_name(), Hij.month_name(), '{}-{}-{}'.format(Hij.year, Hij.month, Hij.day), Hij.notation() ,'|', Hij.day_name('ar'), Hij.month_name('ar'), arabic_numerals_to_arabic_numerals('{}-{}-{}'.format(Hij.day, Hij.month, Hij.year)),  Hij.notation('ar')])
    CS_ISO_8601 = ' '.join(['-'.join(map( str, date.isocalendar())), 'CE'])
    CS_jacobin = repubcal.RDate.fromisoformat(date.isoformat()).revol_strftime('%rf %rA %rB %ry-%rm-%rd %rY')
    CS_jalali = JalaliDate(date).strftime('%T %G %Y-%m-%d AH | %A %B %O-%P-%K هـ')
    CS_judean = ' '.join( [ Heb.month_name(), '{}-{}-{}'.format(Heb.year, Heb.month, Heb.day), '|', Heb.hebrew_date_string(True)])

    dates_obj = {
                'Chinese': CS_chinese, 'Gregorian': CS_gregorian, 'Hijri': CS_hijri, 
                'ISO-8601':  CS_ISO_8601, 'Jacobin': CS_jacobin, 'Jalali': CS_jalali,
                'Judean': CS_judean
                }

    return dates_obj



if __name__ == '__main__':
    print(get_dates(datetime.now().date()))

else:
    print('This is imported as: ' + __name__)

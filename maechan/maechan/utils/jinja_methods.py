import bahttext
import datetime


_TH_ABBR_MONTHS = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
]
_TH_FULL_MONTHS = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
]

def toBahtText(x) :
    return bahttext.bahttext(x)

def strToDate(date):
    if isinstance(date,datetime.date) :
        return date
    elif isinstance(date,str):
        return datetime.datetime.strptime(date,"%Y-%m-%d")

def getThaiFullMonth(dateObj : datetime.date):
    month = dateObj.month
    return _TH_FULL_MONTHS[month-1]

def getThaiFullYear(dateObj : datetime.date):
    year = dateObj.year
    return year + 543
    
def handleNone(s:str) :
    return s if s != None else "-"

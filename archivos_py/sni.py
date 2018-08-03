import socket,time, pymysql.cursors
from  datetime import date

connection = pymysql.connect(host='phpmyadmin.c9w6dzifjwnk.us-east-2.rds.amazonaws.com',
                             user='phpMyAdmin',
                             password='Colombia2010',
                             db='syrus',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)



def db(hora,fecha,latitud,longitud,Velocidad):
    try:

        with connection.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO `datos` (`Hora`, `Fecha`, `Latitud`, `Longitud`, `Velocidad`) VALUES ( %s, %s, %s, %s, %s)"
            cursor.execute(sql, (str(hora), str(fecha), str(latitud), str(longitud), str(Velocidad)))

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit()


    finally:
        #connection.close()
        print("ok Db")




def main():

    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    HOST = socket.gethostbyname(socket.gethostname())

    #HOST="172.31.18.141"
    port=5030
    s.bind((HOST,56303))#56303 es el puerto udp
    print("La Ip privada es : "+str(HOST))
    #print("Listening.")
    # s.listen(1)
    #print("Accepting.")
    while True:
        # conn, addr = s.accept()
        print("ESCUCHANDO ")
        try:
            while True:
                data, addr = s.recvfrom(65536)
                info = str(data)#[2:]
                if data:
                    itIs, EventDef, seco, Year, Month, Day, Hour, Minutes, Seconds, lat, lon,vel = getMess(info)
                    if itIs == 1:
                       print("Latitud es "+str(lat)+"  Longitud "+str(lon) )
                       print("la hora es "+ str(Hour+14)+":"+str(Minutes)+":"+str(Seconds))
                       print("La fecha es "+str(Day-1)+"/"+str(Month)+"/"+str(Year))
                       print("la velocidad es"+str(vel))

                       db(str(Hour+14)+":"+str(Minutes)+":"+str(Seconds),str(Day-1)+"/"+str(Month)+"/"+str(Year)+str(Hour+14)+":"+str(Minutes)+":"+str(Seconds),str(lat),str(lon),str(vel))
                       #time.sleep(10)

                       # print("Event " + str(EventDef) + " was triggered, the latitude is " + str(lat) + " and longitude is " + str(lon))
                    else:
                        print("Mensaje ignorado")
                else:
                    break
        except:
            print("No Conecta")


def getMess(m):
    if m[0:4] == ">REV":
        print("Mensaje recibido: " + m)
        print("Procesando...")
        # Confirmation
        itIs = 1
        # Event
        EventDef = int(m[4:6])
        vel=float(m[34:37])
        # Time
        secn, Year, Month, Day, Hour, Minutes, Seconds = getTime(int(m[6:10]), int(m[10]), int(m[11:16]))
        # Coordinates
        lat = float(m[17:19]) + (float(m[19:24]) / 100000)
        if m[16] == "-":
            lat = -lat
        lon = float(m[25:28]) + (float(m[28:33]) / 100000)
        if m[24] == "-":
            lon = -lon
    else:
        EventDef = 0
        lat = 0
        lon = 0
        itIs = 0
        secn = 0
        Year = 0
        Month = 0
        Day = 0
        Hour = 0
        Minutes = 0
        Seconds = 0
    return itIs, EventDef, secn, Year, Month, Day, Hour, Minutes, Seconds, lat, lon,vel


def getTime(wks, days, scnd):
    seco = wks * 7 * 24 * 60 * 60 + (days + 3657) * 24 * 60 * 60 + scnd + 5 * 60 * 60
    t = time.localtime(seco)
    posmonths = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    Year = t.tm_year
    Month = posmonths[t.tm_mon - 1]
    Day = t.tm_mday
    Hour = t.tm_hour
    Minutes = t.tm_min
    Seconds = t.tm_sec
    return seco, Year, Month, Day, Hour, Minutes, Seconds


main()
#db("22/09/2017 22:09:00","22:09:00","11","14","0")

import socket,time, pymysql.cursors


def db(hora,fecha,latitud,longitud):
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='admin',
                                 db='info1',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    try:

        with connection.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO `data` (`latitud`, `longitud`, `hora`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (str(latitud),str(longitud),str(hora)))

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit()

    finally:
        connection.close()



def getMess(data):
    paso1 = data.split("+")
    timp=paso1[0]
    ti=timp.split("19893")
    hhh=float(ti[1]) - 5*3600
    import time
    time=time.strftime('%H:%M:%S', time.gmtime(hhh))
    paso2 = paso1[1]
    pos = paso2.split("-")
    lat = float(pos[0])/100000
    long = float(pos[1])/-10000000000000

    print("La hora es: " + time)
    print("La latitud es: " + str(lat))
    print("La longitud es: " + str(long))

    db(time, "1", str(lat), str(long))







def main():

    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    #HOST = socket.gethostbyname(socket.gethostname())

    HOST="192.168.0.18"
    port=4800
    s.bind((HOST,port))#puerto udp
    print("IPv4: "+str(HOST))

    # s.listen(1)
    while True:
        # conn, addr = s.accept()
        print("Listening... ")
        try:
            while True:
                data, addr = s.recvfrom(65536)
                info = data[5:41]

                getMess(info)

        except:
            print("No Conecta")



main()



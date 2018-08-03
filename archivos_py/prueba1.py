import socket,time, pymysql.cursors





connection = pymysql.connect(host='localhost',
                             user='root',
                             password='admin',
                             db='info1',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)


def db(info):
    try:

        with connection.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO `data` (`info`) VALUES (%s)"
            cursor.execute(sql, str(info))

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit()
        #Probando branch
        #Nuevo intento con el branch
        #Hize un segundo intento para probar el branch

    finally:
        connection.close()



#db("revdhdhhds")


def main():

    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    HOST = socket.gethostbyname(socket.gethostname())

    #HOST="172.31.18.141"
    port=4800
    s.bind((HOST,port))#56303 es el puerto udp
    print("IPv4: "+str(HOST))
    #print("Listening.")
    # s.listen(1)
    #print("Accepting.")
    while True:
        # conn, addr = s.accept()
        print("Listening... ")
        try:
            while True:
                data, addr = s.recvfrom(65536)
                info = str(data)#[2:]
                print(info)

        except:
            print("No Conecta")



main()

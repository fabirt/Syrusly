import pymysql.cursors





connection = pymysql.connect(host='localhost',
                             user='root',
                             password='root96',
                             db='py1',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)


def db(hora,fecha,latitud,longitud):
    try:

        with connection.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO `data` (`id`, `time`, `lat`, `lon`) VALUES ( %s, %s, %s, %s)"
            cursor.execute(sql, (str(hora), str(fecha), str(latitud), str(longitud)))

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit()
        #Probando branch
        #Nuevo intento con el branch
        #Hize un segundo intento para probar el branch

    finally:
        connection.close()



db("3",'20','11.1499711','-74.7875677')
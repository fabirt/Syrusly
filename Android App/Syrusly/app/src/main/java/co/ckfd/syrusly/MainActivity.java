package co.ckfd.syrusly;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.w3c.dom.Text;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class MainActivity extends AppCompatActivity implements LocationListener {

    private EditText etlatitud, etlongitud, ethora, etfecha;
    Button btnenviar;
    private LocationManager locationManager;
    double Lat, Lng;
    Calendar calendar;
    SimpleDateFormat simpleDateFormat, simpleHoraFormat;
    String Fecha, Hora;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        etlatitud = (EditText)findViewById(R.id.etlatitud);
        etlongitud = (EditText)findViewById(R.id.etlongitud);
        ethora = (EditText)findViewById(R.id.ethora);
        etfecha = (EditText)findViewById(R.id.etfecha);
        btnenviar = (Button)findViewById(R.id.btnenviar);

        locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        Location location = locationManager.getLastKnownLocation(locationManager.NETWORK_PROVIDER);
        onLocationChanged(location);

        //----------------------------------------------------------------------------------------------
        // ENVIAR DATOS
        btnenviar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(getApplicationContext(), "Información enviada :)", Toast.LENGTH_LONG).show();
                new Cargar_datos().execute("http://18.219.18.161/App/registro.php?latitud="+Lat+"&longitud="+Lng+"&fecha="+Fecha+"&hora="+Hora);
            }
        });
        //----------------------------------------------------------------------------------------------

    }

    @Override
    public void onLocationChanged(Location location) {
        Lat = location.getLatitude();
        Lng = location.getLongitude();
        etlatitud.setText(""+Lat);
        etlongitud.setText(""+Lng);

        calendar = Calendar.getInstance();
        simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        simpleHoraFormat = new SimpleDateFormat("HH:mm:ss");

        Fecha = simpleDateFormat.format(calendar.getTime());
        Hora = simpleHoraFormat.format(calendar.getTime());

        etfecha.setText(Fecha);
        ethora.setText(Hora);

    }

    @Override
    public void onStatusChanged(String s, int i, Bundle bundle) {

    }

    @Override
    public void onProviderEnabled(String s) {

    }

    @Override
    public void onProviderDisabled(String s) {

    }

    //----------------------------------------------------------------------------------------------
    // CONEXIÓN CON SERVIDOR WEB Y BASE DE DATOS
    @SuppressLint("StaticFieldLeak")
    private class Cargar_datos extends AsyncTask<String,Void,String> {

        @Override
        protected String doInBackground(String... urls) {

            // params comes from the execute() call: params[0] is the url.
            try {
                return downloadUrl(urls[0]);
            } catch (IOException e) {
                return "Unable to retrieve web page. URL may be invalid.";
            }
        }

        // onPostExecute displays the results of the AsyncTask.
        @Override
        protected void onPostExecute(String result) {

        }

    }
    private String downloadUrl(String myurl) throws IOException {
        InputStream is = null;
        // Only display the first 500 characters of the retrieved
        // web page content.
        int len = 500;

        try {
            URL url = new URL(myurl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setReadTimeout(10000 /* milliseconds */);
            conn.setConnectTimeout(15000 /* milliseconds */);
            conn.setRequestMethod("GET");
            conn.setDoInput(true);
            // Starts the query
            conn.connect();
            int response = conn.getResponseCode();
            Log.d("respuesta", "The response is: " + response);
            is = conn.getInputStream();

            // Convert the InputStream into a string
            String contentAsString = readIt(is, len);
            return contentAsString;

            // Makes sure that the InputStream is closed after the app is
            // finished using it.
        } finally {
            if (is != null) {
                is.close();
            }
        }
    }
    public String readIt(InputStream stream, int len) throws IOException, UnsupportedEncodingException {
        Reader reader = null;
        reader = new InputStreamReader(stream, "UTF-8");
        char[] buffer = new char[len];
        reader.read(buffer);
        return new String(buffer);
    }
    //----------------------------------------------------------------------------------------------



}

#include <WiFi.h>
#include <HTTPClient.h>

// Informasi WiFi
const char* ssid = "Yanto Fams";
const char* password = "06072618";

// URL API Node.js
const char* serverUrl = "http://192.168.18.7:3000/api/rekam";

// Pin HC-SR04
const int trigPin = 14;
const int echoPin = 27;

// Variabel untuk menyimpan hasil pengukuran
long duration;
float distanceCm;

void setup() {
  Serial.begin(115200);

  // Inisialisasi pin sensor
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // Koneksi ke WiFi
  Serial.print("Menghubungkan ke WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi Terhubung!");
  Serial.print("Alamat IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Mengukur jarak menggunakan HC-SR04
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distanceCm = duration * 0.0343 / 2.0;

  Serial.print("Jarak: ");
  Serial.print(distanceCm);
  Serial.println(" cm");

  // Kirim data ke API
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    // Siapkan data JSON
    String jsonData = "{\"jarak\":" + String(distanceCm) + "}";

    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Kirim POST request
    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
      Serial.print("Kode Respon: ");
      Serial.println(httpResponseCode);
      String response = http.getString();
      Serial.println("Respon Server: " + response);
    } else {
      Serial.print("Error: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("Koneksi WiFi Terputus!");
  }

  delay(10000); // Delay 5 detik sebelum pengiriman berikutnya
}

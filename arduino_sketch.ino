int led = 7;
int val = -1;

void setup() {
  Serial.begin(9600);
  pinMode(led, INPUT);
}

void loop() {
  int value = digitalRead(led);
  if (value == 1) {
      Serial.write("HI");
      delay(5000);
  }
}



/*
Entradas e Saídas                     Pinagem (Arduino)
ADC0 - Dificuldade                    Pino A0
PB2 - Amarelo - Sobe                  Pino 10 (PWM)
PB3 - Amarelo - Desce                 Pino 11 (PWM)
PB4 - Vermelho - Sobe                 Pino 12
PB5 - Vermelho - Desce                Pino 13
*/

#include <avr/io.h>
#include <avr/interrupt.h>
#include <inttypes.h>

// configuração do ADC
void set_ADC(void)
{
  // Registrador de Seleção
  ADMUX |= 0b01000000; // 01 ref(Vcc); 0 (ADC - SEM ADLAR); 0 (RESERVADO); 0000 (MUX p/ ADC0)
  // Registrador de Status
  ADCSRA |= 0b11000111; // 1 (ADEN: Enable); 10 (ADSC: Start Conversion e ADATE: sem auto trigger); 00 (ADIF: Flag de interrupção e ADIE: Interrupt Enable); 111 (Prescaler - Divisão por 128)
  // Habilita uso de interrupção
  sei();
}

long mapFunction(long adc, long in_min, long in_max, long out_min, int out_max)
{ 
  return (adc - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

int main()
{
  Serial.begin(9600);
  uint8_t ad_value;

  DDRB &= 0b11000011; // entrada (PB5, PB4, PB3 e PB2)
  PORTB |= 0b00111100; // pull up (PB5, PB4, PB3 e PB2)

  while (true) {
    set_ADC();
    while (!(ADCSRA & 0b00010000)) // aguarda conversao
      ;
    ad_value = mapFunction(ADC, 0, 1023, 0, 255);
    Serial.println(ad_value);

    // while aó para retardar o envio
    // provisório - trocar por uma contagem de tempo com overflow
    int cont = 0;
    while(cont != 30000) {
      cont++;
    } 

    // AMARELO - SOBE
    if (PINB&(1<<PINB2)) {
      Serial.println("as");
    }

    // AMARELO - DESCE
    if (PINB&(1<<PINB3)) {
      Serial.println("ad");
    }

    // VERMELHO - SOBE
    if (PINB&(1<<PINB4)) {
      Serial.println("vs");
    }

    // VERMELHO - DESCE
    if (PINB&(1<<PINB5)) {
      Serial.println("vd");
    }
  }
}

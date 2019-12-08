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
#include <util/delay.h> //bibliot. para as rotinas de _delay_ms() e delay_us()

bool change = true;


#define F_CPU 16000000UL /*define a frequência do microcontrolador 16MHz (necessário
 para usar as rotinas de atraso)*/
#define BAUD   9600    //taxa de 9600 bps
#define MYUBRR  F_CPU/16/BAUD-1
unsigned char *chptr;

void USART_Inic(unsigned int ubrr)
{
  UBRR0H = (unsigned char)(ubrr >> 8); //Ajusta a taxa de transmissão
  UBRR0L = (unsigned char)ubrr;

  UCSR0A = 0;//desabilitar velocidade dupla (no Arduino é habilitado por padrão)
  UCSR0B = _BV(RXEN0) | _BV(TXEN0); //Habilita tanto o transmissor quanto o receptor
  UCSR0C = _BV(UCSZ01) | _BV(UCSZ00); /*modo assíncrono, 8 bits de dados, 1 bit de parada, sem paridade*/
}

void USART_Transmit(unsigned char info)
{
  while(!(UCSR0A & (1<<UDRE0))); // espera a limpeza do registrador de transmissão
  UDR0 = info; // envia o dado
}

void escreverMensagem(char *c) {  
  for (; *c != 0; c++) USART_Transmit(*c);
}

uint8_t rxByte()
{
  //Bit RXC sinaliza quando existem bytes não lidos no buffer
  while(!(UCSR0A & (1<<RXC0)));
  return UDR0;
}
/*
 * Limpa o registrador de entrada - quando ocorre um erro, por exemplo - 
 */
void USART_Flush( void )
{
 unsigned char dummy;
 while ( UCSR0A & (1<<RXC0) ) dummy = UDR0;
}



// configuração do ADC
void set_ADC(int mux)
{
  // Registrador de Seleção
  ADMUX &= 11110000;
  switch(mux) {
    case 0:
      ADMUX |= 0b01000000; // 01 ref(Vcc); 0 (ADC - SEM ADLAR); 0 (RESERVADO); 0000 (MUX p/ ADC0)
      break;
  }
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
//  Serial.begin(9600);
  uint8_t ad_value;
  USART_Inic(MYUBRR);

  DDRB &= 0b11000011; // entrada (PB5, PB4, PB3 e PB2)
  PORTB |= 0b00111100; // pull up (PB5, PB4, PB3 e PB2)

  while (true) {
    set_ADC(0);
    while (!(ADCSRA & 0b00010000)) // aguarda conversao
      ;

    if (change) {
      ad_value = mapFunction(ADC, 0, 1023, 0, 255);
//      Serial.println(ad_value);
      escreverMensagem((char*)ad_value);

    } else {
      // AMARELO - SOBE
      if (PINB&(1<<PINB2)) {
//        Serial.println("as");
        escreverMensagem((char*)"as\n\0!");
      }
  
      // AMARELO - DESCE
      if (PINB&(1<<PINB3)) {
//        Serial.println("ad");
        escreverMensagem((char*)"ad\n\0!");
      }
  
      // VERMELHO - SOBE
      if (PINB&(1<<PINB4)) {
//        Serial.println("vs");
        escreverMensagem((char*)"vs\n\0!");
      }
  
      // VERMELHO - DESCE
      if (PINB&(1<<PINB5)) {
//        Serial.println("vd");
        escreverMensagem((char*)"vd\n\0!");
      }
    }
    change = !change;
  }
}

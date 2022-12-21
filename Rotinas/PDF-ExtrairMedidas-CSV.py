import os
import math
from pathlib import Path
from PyPDF2 import PdfFileReader

# Este script gera uma planilha em CSV com as medidas de um arquivo PDF.
# As artes devem estar em arquivos individuais.

caminho_pasta = Path('D:/Dropbox/_1 DAO/Trabalhos/Solar da Marquesa de Santos/Revelando territórios/05-Finalizados')


def pontos_milimetro(medida):
    # 1 user space unit is 1/72 inch
    # 1/72 inch == 0.352 millimeters
    # converte a medida em float, pois é recebida em string
    # para obter a mesma medida do Acrobat precisei arrendondar o valor 
    # na obtenção e na conversão
    medida = (float(medida))
    return round(medida * 0.35277778)

def pontos_centimetro(medida):
    return pontos_milimetro(medida) / 10


def obter_medida(caminho):
    with open(caminho, 'rb') as f:
        pdf = PdfFileReader(f)
        pagina = pdf.getPage(0)
        crop_largura = pontos_centimetro(pagina.trimBox.getWidth())
        crop_altura = pontos_centimetro(pagina.trimBox.getHeight())

    return (crop_largura, crop_altura)

if __name__ == '__main__':
    listaArquivos = open('Tamanho PDF - Legendas.csv', 'w', encoding='utf8')
    listaArquivos.write('Arquivo; Largura; Altura\n')

    for raiz, diretorios, arquivos in os.walk(caminho_pasta):
    	for nome in arquivos:
            arquivo_caminho = Path(raiz) / nome

            largura, altura = obter_medida(arquivo_caminho)

            listaArquivos.write('%s; %s; %s\n' % (nome, largura, altura))
    
    listaArquivos.close()
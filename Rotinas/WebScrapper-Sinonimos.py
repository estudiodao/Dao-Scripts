import requests
from bs4 import BeautifulSoup

palavras = ['bebado', 'jovem', 'beija-flor']
nome_arquivo = 'sinonimos-teste'

def sinonimos(lista):
    
    arquivo = open(nome_arquivo + '.html', encoding='utf-8', mode='w')
    arquivo.write("<h1>Sinônimos</h1>")
    
    for palavra in lista:
        resultados = encontrar_sinonimos(palavra)
        arquivo_escrever(arquivo, resultados)
        
    arquivo.close()
        
def encontrar_sinonimos(palavra):

    url = 'https://www.sinonimos.com.br/' + palavra
    r = requests.get(url)

    soup = BeautifulSoup(r.content, 'html.parser')

    conteudo = soup.find('div', id='content')
    titulo = conteudo.find('h1')
    sentidos = conteudo.find_all('div', class_='content-detail--subtitle')
    sinonimos = conteudo.find_all('p', class_='syn-list')

    return {'palavra': palavra, 'resultado': zip(sentidos, sinonimos)}
        
def arquivo_escrever(arquivo, resultados):
    
    arquivo.write("<h2>%s</h2>" % (resultados['palavra']))
    
    for sd, sm in resultados['resultado']:
        arquivo.write('<h4>%s</h4>' % (sd.text))
        arquivo.write('<ul>')
        for tag in sm.contents:
            if tag.name == 'a':
                arquivo.write('<li>%s</li>' % (tag.text))
        arquivo.write('</ul>')     
        
sinonimos(palavras)

    

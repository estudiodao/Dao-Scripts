import requests
from bs4 import BeautifulSoup

palavras = ['bebado', 'jovem', 'beija-flor']
nome_arquivo = 'significados-teste'

def significados(lista):
    
    arquivo = open(nome_arquivo + '.html', encoding='utf-8', mode='w')
    arquivo.write("<h1>Significados</h1>")
    
    for palavra in lista:
        resultados = encontrar_sinonimos(palavra)
        arquivo_escrever(arquivo, resultados)
        
    arquivo.close()
        
def encontrar_sinonimos(palavra):

    url = 'https://michaelis.uol.com.br/moderno-portugues/busca/portugues-brasileiro/' + palavra + '/'
    r = requests.get(url)
    raw_page = r.content

    soup = BeautifulSoup(raw_page, 'html.parser')
    verbetes = soup.find('div', class_='verbete')
    titulo = '<h2>%s</h2>' % (palavra)
        
    return {'palavra': titulo, 'resultado': verbetes}
       
def arquivo_escrever(arquivo, resultados):
    
    arquivo.write(resultados['palavra'])
    arquivo.write('\n')
    arquivo.write(str(resultados['resultado']))
    arquivo.write('\n')
        
significados(palavras)
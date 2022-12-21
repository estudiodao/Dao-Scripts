# Esta rotina gera um intervalo de páginas de acordo
# com um passo fornecido. Ex.: Todas as paginas
# em um intervalo de 135 paginas, iniciando da pagina 4 e
# avançando em um passo de 5 em 5 paginas.

primeira_pagina = int(input("Pagina para iniciar: "))
total_paginas = int(input("Total de páginas: "))
passo = int(input("Passo: "))

paginas = ""

for p in range(primeira_pagina, total_paginas, passo):
  paginas += str(p) + ', '

print(paginas)
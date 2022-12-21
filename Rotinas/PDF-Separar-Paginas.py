from PyPDF2 import PdfFileWriter, PdfFileReader
from pathlib import Path
import os

# Dividi todos os PDFs de uma pasta em paginas separadas

files = [f for f in os.listdir('.') if os.path.isfile(f)]
files = list(filter(lambda f: f.lower().endswith((".pdf")), files))

for pdf in files:
    with open(pdf, "rb") as f:
        inputpdf = PdfFileReader(f)

        for i in range(inputpdf.numPages):
            output = PdfFileWriter()
            output.addPage(inputpdf.getPage(i))
            name = pdf[:-4]+"-Page "+str(i)+".pdf"
            with open(name, "wb") as outputStream:
                output.write(outputStream)
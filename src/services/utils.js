
function downloadBase64File(base64Data, fileName, contentType = 'application/pdf') {
  const linkSource = `data:${contentType};base64,${base64Data}`
  const downloadLink = document.createElement('a')
  downloadLink.href = linkSource
  downloadLink.download = fileName
  downloadLink.click()
}

function limparObjeto(objeto, ignoreList = []) {
  for (let propriedade in objeto) {
    if (ignoreList.includes(propriedade)) {
      continue
    }
    objeto[propriedade] = null
  }
  return objeto
}

function resetarFiltro(objeto, objetoPadrao) {
  for (let propriedade in objeto) {
    objeto[propriedade] = objetoPadrao[propriedade]
  }
  return objeto
}

function removerAcentos(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export {
    downloadBase64File,
    limparObjeto,
    resetarFiltro,
    removerAcentos
}



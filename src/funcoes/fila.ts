import { rejects } from 'assert';
import { writeFile, readFile } from 'fs';
import { resolve } from 'path';

const ARQUIVO_DE_FILA = `${resolve('.')}/files/fila.txt`;

/**
 * Os métodos escritos abaixo implementam uma fila de mensagens escritas em
 * arquivo de texto, presente na pasta "files". A cada mensagem escrita nesta fila,
 * (através do método `escreveNaFila`) o código escreve a frase ao final do arquivo.
 * O método `consumirDafila` retira a primeira mensagem escrita no arquivo e a retorna.
 *
 * As funções abaixo estão todas escritas utilizando callbacks como soluções
 * para a manipulação dos arquvos.
 *
 * Tranforme a solução escrita abaixo em um código válido utilizando promises ou
 * async/await.
 */

export async function zerarAquivo(): Promise<void> {
  return await escreveArquivo('');
  //return escreveArquivo('', () => {});
}

export async function leArquivo(): Promise<string> {
  return new Promise((resolve, reject) =>{
    readFile(ARQUIVO_DE_FILA, 'utf8', (erro, resultado) =>{
      if(erro){
        reject(erro);
        return;
      }
      resolve(resultado);
    })
  })
  /*readFile(ARQUIVO_DE_FILA, 'utf8', (err, resultado) => {
    if (err) {
      callback(err, null);
    }

    callback(null, resultado);
  });

  // reste return está presente somente para cumprir a saída de Promise<string>
  return '';*/
}

export async function escreveArquivo(texto: string): Promise<void> {
  return new Promise((resolve, reject)=>{
    writeFile(ARQUIVO_DE_FILA, texto, 'utf8', function(erro){
      if(erro){
        reject(erro);
        return;
      }
    })
  })
  /*writeFile(ARQUIVO_DE_FILA, texto, 'utf8', function(err) {
    if (err) {
      return callback(err, null);
    }

    callback();
  });*/
}

export async function escreveNaFila(texto: string): Promise<void> {
  const textoAtual = await leArquivo();

  console.log('texto encontrado anteriormente no arquivo', textoAtual);
    const novoTexto = textoAtual ? `${textoAtual}\n${texto}` : texto;
  
  await escreveArquivo(novoTexto)
  /*leArquivo(function(error, textoAtual) {
    if (error) {
      console.log(error);
      return;
    }

    console.log('texto encontrado anteriormente no arquivo', textoAtual);
    const novoTexto = textoAtual ? `${textoAtual}\n${texto}` : texto;

    escreveArquivo(novoTexto, function(error) {
      if (error) {
        console.log(error);
        return;
      }

      console.log('texto escrito no arquivo');
    })
  });*/
}

export async function consumirDaFila(): Promise<string> {
  const textoAtual = await leArquivo();

  console.log('texto encontrado anteriormente no arquivo', textoAtual);
    const [linhaConsumida, ...linhas] = textoAtual.split('\n');
    console.log('======== linha consumida', linhaConsumida);
  
  await escreveArquivo(linhas.join('\n'));

  return '';

  /*leArquivo(function(error, textoAtual) {
    if (error) {
      console.log(error);
      return;
    }

    console.log('texto encontrado anteriormente no arquivo', textoAtual);
    const [linhaConsumida, ...linhas] = textoAtual.split('\n');
    console.log('======== linha consumida', linhaConsumida);

    escreveArquivo(linhas.join('\n'), function(error) {
      if (error) {
        console.log(error);
        return;
      }

      console.log('texto escrito no arquivo');
    });
  });

  return '';*/
}

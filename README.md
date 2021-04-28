# NLW5: trilha backend com Node.js

O evento NLW#5 da RocketSeat, trilha Node.js (backend), teve como objetivo criar uma API simples para uma funcionalidade de atendimento online.


## INSTALANDO

 * Instale o Node e o Yarn no seu computador, se não os instalou.

  Você pode instalar o Yarn pelo NPM, logo após instalar o Node: `npm install -g yarn`

 * Clone este repositório:

`$ git clone https://github.com/cledsupper/NLW5.git`

 * Acesse o diretório e instale as dependências:

  ```
  $ cd NLW5
  $ yarn install
  ```

 * Se tudo deu certo (*), execute os seguintes comandos para gerar o banco de dados e rodar o servidor:

  ```
  $ yarn typeorm migration:run
  $ yarn run dev
  ```

 * Agora, abra as URLs /pages/client e /pages/admin (baseUrl: localhost:3333/), e teste a aplicação.


## (*) Erro comum quando testando no Termux: falha ao baixar/construir as bibliotecas do sqlite3

Recomendo instalar a libsqlite3, mas pode ser que não seja necessário (não testei).

OBSERVAÇÃO: infelizmente você terá que remover os pacotes python e pip (versão 3), caso esteja utilizando, porque precisa instalar a versão 2 do Python e do PIP, e, na sequência, definir eles como padrões. Siga os comandos abaixo:

```
# Instalação: confirme as ações quando perguntado!
$ apt remove python pip
$ apt install python2 pip2
# Definir comandos python2 e pip2 como padrão
$ cd ../usr/bin
$ ln -s python2 python # Python
$ ln -s pip2 pip # Pip
```

Após isso, tente instalar as dependências novamente. Desta vez deve funcionar.

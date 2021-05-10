# Como configurar o deploy automatico

O projeto está configurado para realizar o deploy automaticamente para o ambiente de teste interno da google play sempre que uma tag for aberta, mas para isso é preciso realizar algumas configurações.

## Obtendo arquivos necessárias

Alguns arquivos você já deve ter configurado, como `google-services.json`, `.env.prod`, `firebase.json` e `buyit.keystore`. Caso não os tenha configurado ainda, veja o [README](https://github.com/salomaoluiz/BuyIt/blob/main/README.md).

Precisamos ainda de um ultimo arquivo, uma chave de conta de serviço, para isso, abra o Google Cloud Platform.

1. Se você não possuir nenhum projeto, vá em "Selecione um projeto" no canto superior direito e clique em "Novo Projeto", escolha um nome para o projeto e clique em "Criar".
2. Em seguida, vá em "API e serviços" no lado esquerdo, clique em "ATIVAR APIS E SERVIÇOS" e pesquise por "Google Play Android Developer API" `"Google Play Custom App Publishing API"`, e ative-a.
3. Você será redirecionado para a tela da API, clique no lado esquerdo em "Credenciais", vá em "Criar credenciais" e selecione "Conta de Serviço".
4. Escolha um nome e uma descrição para a conta de serviço e clique em "Criar".
5. Escolha a permissão "Proprietario" e clique em "Continuar".
6. Clique em "Concluir" para pular a etapa de conceder acesso a essa conta de serviço a usuários.
7. Criada a conta de serviço, clique nela para abrir e vá em "Chaves", e clique em "ADICIONAR CHAVE" e "Criar nova Chave", escolha o tipo "JSON" e clique em "Criar".
8. Ele irá baixar a chave, salve ela na raíz do projeto com o nome `google-key.json`.

## Adicionando a conta de serviço ao Google Play Console

Precisamos agora adicionar essa conta de serviço que acabamos de criar aos usuários permitidos do Google Play.

1. Vá em detalhes da conta de serviço e copie o valor do "Email".
2. Acesse a sua conta do Google Play Console, na tela de "Todos os Apps".
3. No lado esquerdo vá em "Usuários e permissões".
4. Vá em "Convidar novo usuário" e adicione o email que acabamos de copiar.
5. Selecione o app desejado e selecione a permissão "Liberar apps para as faixas de teste" e aplique.
6. Por fim, clique em "Convidar usuário" e "Enviar convite"

## Adicionando projeto ao Google Play Console

Precisamos agora adicionar o projeto que criamos no Google Cloud Platform na nossa conta do Google Play Console.

1. Na tela do Google Play Console onde tem todos os apps, no lado esquerdo vá em "Configurações", depois em "Conta de desenvolvedor" e por fim "Acesso à API".
2. Selecione "Vincular projeto existente" e selecione o projeto que você criou no primeiro passo desse documento e clique em "Vincular projeto".

Muito bem, com isso nós já temos o nosso projeto configurado para realizar o deploy do projeto manualmente, se você quiser fazer isso, basta executar na raiz do projeto:

```bash
ANDROID_KEYSTORE_PASSWORD=$ANDROID_KEYSTORE_PASSWORD ANDROID_KEYSTORE_ALIAS=$ANDROID_KEYSTORE_ALIAS ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD=$ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD ENVFILE=.env.prod VERSION_NAME="v0.0.2" BUILD_NUMBER="2" ANDROID_KEYSTORE_PATH="$HOME/buyit.keystore" UPLOAD_TO_STORE=true GOOGLE_KEY="google-key.json" PACKAGE_NAME=$PACKAGE_NAME fastlane bundle_android_production
```

Se você usar `release_android_production` ao invés de `bundle_android_production` será criado um apk em produção, sem subir para o Google Play.

## Configurando chaves para o github

Muito bem, já conseguimos fazer deploy localmente, mas agora precisamos configurar o github para receber esses secrets e poder disparar a action automaticamente em toda tag.

Como os secrets do github não aceitam arquivos binários, nós precisamos converter cada um dos nossos arquivos em strings para que ele seja convertido novamente durante o pipeline. Converteremos usando o comando:

```bash
gpg -c --armor file_path
```

Ele irá pedir uma senha e ao finalizar vai criar um arquivo `file_path.asc`.

Converta todos os arquivos e salve a senha usada em cada arquivo.

No github vá em "Settings" e no lado esquerdo em "Secrets". Agora você vai criar as seguintes credênciais, sendo elas respectivamente `SENHA_PARA_CONVERTER -> ARQUIVO CONVERTIDO`

- **buyit.keystore**: ANDROID_KEYSTORE_BASE64_PASSPHRASE -> ANDROID_KEYSTORE_BASE64
- **.env.prod**: ENVFILE_PROD_BASE64_PASSPHRASE -> ENVFILE_PROD_BASE64
- **google-key.json**: GOOGLE_KEY_BASE64_PASSPHRASE -> GOOGLE_KEY_BASE64
- **google-services.json**: GOOGLE_SERVICES_BASE64_PASSPHRASE -> GOOGLE_SERVICES_BASE64
- **firebase.json**: FIREBASE_BASE64_PASSPHRASE -> FIREBASE_BASE64

Muito bem, agora basta colocar nas secrets os seguintes environments para realizar o build o app:

- ANDROID_KEYSTORE_ALIAS
- ANDROID_KEYSTORE_PASSWORD
- ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD
- PACKAGE_NAME - Sendo este o nome do pacote, por exemplo `br.com.testeapp`

Muito bem, agora tudo está pronto para fazer deploy para o ambiente de teste sempre que abrir uma tag nova. Por padrão ele irá realizar um deploy com o BUILD_NUMBER sendo a quantidade de commits presente na tag, e o BUILD_NAME sendo o nome da tag.

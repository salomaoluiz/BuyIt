# Projeto Buy It

Esse projeto foi criado como forma de estudo de caso de diversos quesitos de desenvolvimento. Caso deseje utilizar esse projeto para estudos e/ou comercialmente, fique a vontade, desde que siga as regras da [LICENSE](https://github.com/salomaoluiz/BuyIt/blob/main/LICENSE). Esse projeto está com as descrições inteiramente em português para que seja mais fácil para quem está começando na area de desenvolvimento entender os conceitos sem ter a trava da linguagem, apenas o código é inteiramente em inglês.

## Firebase
Para esse projeto foi utilizado o Firebase como forma de BAS, logo é preciso realizar algumas configurações no projeto.

Primeiro é preciso criar um projeto no firebase (dois projetos se você deseja separar o ambiente de desenvolvimento do ambiente de produção), configurar o projeto para Android e adicionando o **google-services.json** nas pastas *./android/app/src/development* e *./android/app/src/production*.

Realizada essas configurações iniciais é preciso também ajustar o ADMOB para as publicidades dentro do projeto, para configurar isso é preciso que crie 3 arquivos, sendo cada um deles com as seguintes informações:

- **firebase.json**
```
{
  "react-native": {
    "admob_android_app_id": "APP_ID_DO_ADMOB_ANDROID",
    "admob_ios_app_id": "APP_ID_DO_ADMOB_IOS"
  }
}
```
- **.env.dev**
```
DEFAULT_ENVIRONMENT=development
ADMOB_APP_ID=ADMOB_APP_ID
ADMOB_BANNER_ID_DEFAULT=ADMOB_BANNER_ID_DEFAULT
ADMOB_BANNER_ID_CAMPAING=
ADMOB_INTERSTITIAL_ID_DEFAULT=ADMOB_INTERSTITIAL_ID_DEFAULT
ADMOB_INTERSTITIAL_ID_CAMPAING=
```

- **.env.prod**
```
DEFAULT_ENVIRONMENT=production
ADMOB_APP_ID=ADMOB_APP_ID
ADMOB_BANNER_ID_DEFAULT=ADMOB_BANNER_ID_DEFAULT
ADMOB_BANNER_ID_CAMPAING=
ADMOB_INTERSTITIAL_ID_DEFAULT=ADMOB_INTERSTITIAL_ID_DEFAULT
ADMOB_INTERSTITIAL_ID_CAMPAING=
```

Observe que apesar de ter um `ADMOB_BANNER_ID_*` no ambiente de desenvolvimento, enquanto você utilizar o projeto sem ser em release, ele irá apresentar as propagandas de teste somente.

## Realizando build
Para realizar o build do projeto, tenha todas as dependências instaladas usando o `yarn install` em seguida execute `yarn android:dev` para iniciar em modo debug na lane de desenvolvimento. Para gerar uma release em debug na lane de produção é preciso ter uma **keystore**  configurada e presente na sua *$HOME*, após configura-la com o nome *buyit.keystore* execute na raiz do projeto `yarn android:prod`.

### Após gerar meu build ele abre e fecha o app, o que fazer?
Caso você tenha gerado um build e ao tentar abrir ele no emulador/device ele abrir e fechar o app, vá até a pasta *./android* e execute `./gradlew clean` e tente realizar o build novamente.

## Gerar build em release
Para gerar build em production release, é preciso ir na pasta *./android* e executar o seguinte comando `./gradlew assembleProduction`, passando as seguintes variáveis de ambiente:
- `ENVFILE=.env.prod`
- `BITRISEIO_ANDROID_KEYSTORE_PASSWORD="SUA_KEYSTORE_PASSWORD"`
- `BITRISEIO_ANDROID_KEYSTORE_ALIAS="SUA_KEYSTORE_ALIAS"`
- `BITRISEIO_ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD="SUA_KEYSTORE_PRIVATE_PASSWORD"`
- `BITRISE_BUILD_NUMBER="BUILD_NUMBER_DESEJADA"`
- `BITRISE_VERSION_NUMBER="VERSION_NUMBER_DESEJADA"`
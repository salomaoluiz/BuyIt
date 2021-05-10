# How to configure automatic deploy

The project is configured to realize the automatic deploy to intern test environment of Google Play always than a tag is opened, but for that is necessary some settings.

## Getting the required files

Some files maybe you have, as `google-services.json`, `.env.prod`, `firebase.json` e `buyit.keystore`. If you don't have configured yet, see the [README](https://github.com/salomaoluiz/BuyIt/blob/main/README.en.md).

Now we need a last file, a service account key, for that, open your Google Cloud Platform.

1. If you have noone project, go to "Select a project" on upper right side and clique on "New Project", choose a name for the project and click on "Create".
2. Following, go to "API & Services" on left side and click on "ENABLE APIS AND SERVICES", search by "Google Play Android Developer API", than active it.
3. You will be redirect to API screen, on left side, click on "Credentials" , go to "Create credentials" and select "Service account".
4. Choose a name and a describe to you service account, than click on "Create".
5. Choose the role "Owner" and click on "Done", we don't need grant users access.
6. After created the service account, click on that to open it, and go to "Keys", and click on "ADD KEY" and "Create new Key", choose the "JSON" type and click on "Create"
7. This will download the key, save that on project root with the name `google-key.json`.

## Adding the service account to Google Play Console

Now we need add this service account on allowed list users in Google Play.

1. Go to services account details and copy the "Email" value.
2. Now access your Google Play Console account in "All apps" screen.
3. On left side, go on "Users and permissions".
4. Go on "Invite new users" and add the email what we just copy.
5. Select the the app what you wanna add, and select the permission "Release apps to testing tracks" and apply.
6. Lastly, click on "Invite user" and "Send invite".

## Adding the project to Google Play Console

We need to add too the project what we just created on Google Cloud Platform in our Google Play Console account.

1. On screen of Google Play Console where has all apps, on left side, go on "Settings", and "Developer account" and finally "API Access".
2. Select "Link existing project" and select the project what you have created on the first step at this doc and click on "Link project".

Very well, with this we have our project configured to do the project manual deploy, if you wanna do this, just run on project root:

```bash
ANDROID_KEYSTORE_PASSWORD=$ANDROID_KEYSTORE_PASSWORD ANDROID_KEYSTORE_ALIAS=$ANDROID_KEYSTORE_ALIAS ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD=$ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD ENVFILE=.env.prod VERSION_NAME="v0.0.2" BUILD_NUMBER="2" ANDROID_KEYSTORE_PATH="$HOME/buyit.keystore" UPLOAD_TO_STORE=true GOOGLE_KEY="google-key.json" PACKAGE_NAME=$PACKAGE_NAME fastlane bundle_android_production
```

If you use `release_android_production` instead `bundle_android_production`, you will be create a apk without deploy to Google Play.

## Setting github keys

Ok, we can do the local deploy, but now we need set the github to receive the secrets and with that dispatch the automatic action on every tag opened.

How github secrets don't accept binary files, we need convert every of our files into strings, to they be converted again on pipeline. To convert we go use the command:

```bash
gpg -c --armor file_path
```

It will go ask by a password and at finish will create a file `file_path.asc`.

Convert this following files and save the password used in each file.

In github, go on "Settings" and in left side go on "Secrets". Now you go create the following credentials, being they respectively `PASSWORD_TO_CONVERT -> CONVERTED_FILE`:

- **buyit.keystore**: ANDROID_KEYSTORE_BASE64_PASSPHRASE -> ANDROID_KEYSTORE_BASE64
- **.env.prod**: ENVFILE_PROD_BASE64_PASSPHRASE -> ENVFILE_PROD_BASE64
- **google-key.json**: GOOGLE_KEY_BASE64_PASSPHRASE -> GOOGLE_KEY_BASE64
- **google-services.json**: GOOGLE_SERVICES_BASE64_PASSPHRASE -> GOOGLE_SERVICES_BASE64
- **firebase.json**: FIREBASE_BASE64_PASSPHRASE -> FIREBASE_BASE64

Ok, now just add in secrets the following keys to realize the app build:

- ANDROID_KEYSTORE_ALIAS
- ANDROID_KEYSTORE_PASSWORD
- ANDROID_KEYSTORE_PRIVATE_KEY_PASSWORD
- PACKAGE_NAME - Being this the package name of your project, for example `br.com.testeapp`

Very well, now everything are done to deploy your app on internal track in every new tag. For default, the deploy will be doing with BUILD_NUMBER as the total of commits present on tag, and the BUILD_NAME are the tag name.

# Steps

- Ran `expo init` and selected "Bare".
- Ran `npm install expo-updates`, which installed version `^0.11.6`.
- Added `import 'expo-asset';` to **index.js**.
- Added `"sdkVersion": "44.0.0"` to **app.json**.
- Added `assetPlugins: ['expo-asset/tools/hashAssetFiles'],` to **metro.config.js**.
- Added the following to **android/app/src/main/AndroidManifest.xml**:

  ```xml
  <meta-data android:name="expo.modules.updates.EXPO_UPDATE_URL" android:value="https://exp.host/@jonsamp/test-android-classic-updates"/>
  <meta-data android:name="expo.modules.updates.EXPO_SDK_VERSION" android:value="44.0.0"/>
  ```

- Opened the **android** directory in Android Studio.
- Clicked on "Build variants" then changed the build variant to "release".
- Then clicked the play button to build it in an android emulator.
- Added `<Text>Update 1</Text>` to **App.js**.
- Then ran `expo publish`.
- Then force closed the app in the emulator and reloaded it. Saw no change, since the update started downloading in the background.
- Then re-opened the app and say the "Update 1" text.

After this, I added the ability to check for an update while the app is running.

- Added the following to **App.js**

  ```jsx
  import * as Update from 'expo-updates';

  // ...

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  // ...

  <Button title='Check for update' onPress={onFetchUpdateAsync} />;
  ```

- Then I used `expo publish` to push that as an update.
- Then, I made **App.js** say "Update 2", and ran `expo publish`.
- This time, instead of force-closing and reopening the app, I tapped the "Check for update" button.
- Then the app reloaded, and I see "Update 2" appear since the update was downloaded/loaded.

By the way, it is possible to do a check like this when the app comes into the foreground with `AppState` from react-native. Here's an example: https://github.com/jonsamp/test-3-9-fetch-updates/blob/main/App.tsx#L29

import { useRef, useEffect, useState, useCallback } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLANNER_HTML } from './src/planner-html';

// Ключи, которые планировщик использует для хранения данных
const STORAGE_KEYS = [
  'planner_library',
  'planner_overrides',
  'planner_settings',
  'planner_stats',
  'planner_ptypes',
  'planner_lists',
];

export default function App() {
  const webViewRef = useRef(null);
  const [bootstrapJS, setBootstrapJS] = useState(null);

  // При запуске читаем всё из AsyncStorage и формируем JS-код,
  // который заполнит localStorage в WebView ДО запуска планировщика
  useEffect(() => {
    (async () => {
      try {
        const pairs = await AsyncStorage.multiGet(STORAGE_KEYS);
        const lines = pairs
          .filter(([, v]) => v !== null)
          .map(
            ([k, v]) =>
              `try{localStorage.setItem(${JSON.stringify(k)},${JSON.stringify(v)})}catch(e){}`
          );
        setBootstrapJS(lines.join(';') + ';true;');
      } catch (e) {
        setBootstrapJS('true;');
      }
    })();
  }, []);

  // Когда WebView шлёт postMessage (из модифицированной sset),
  // сохраняем данные в нативное хранилище Android
  const onMessage = useCallback(async (event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.t === 's' && msg.k && msg.v !== undefined) {
        await AsyncStorage.setItem(msg.k, msg.v);
      }
    } catch (e) {
      // молча проглатываем — некритично
    }
  }, []);

  // Пока данные не загружены, показываем загрузочный экран в цвете приложения
  if (bootstrapJS === null) {
    return (
      <View style={styles.loading}>
        <StatusBar barStyle="light-content" backgroundColor="#2F5D50" />
        <ActivityIndicator size="large" color="#F6F4EF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F5D50" />
      <WebView
        ref={webViewRef}
        source={{ html: PLANNER_HTML }}
        style={styles.webview}
        injectedJavaScriptBeforeContentLoaded={bootstrapJS}
        onMessage={onMessage}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#F6F4EF" />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F5D50',
  },
  webview: {
    flex: 1,
    backgroundColor: '#F6F4EF',
  },
  loading: {
    flex: 1,
    backgroundColor: '#2F5D50',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

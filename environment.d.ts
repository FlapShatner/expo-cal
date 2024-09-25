declare global {
 namespace NodeJS {
  interface ProcessEnv {
   EXPO_PUBLIC_ANDROID_GOOGLE_CLIENT_ID: string
   EXPO_PUBLIC_WEB_GOOGLE_CLIENT_ID: string
   ANDROID_HOME: string
  }
 }
}

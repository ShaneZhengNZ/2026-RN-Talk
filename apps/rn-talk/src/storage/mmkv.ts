import { createMMKV } from 'react-native-mmkv';

/**
 * Default app-wide MMKV instance. Used implicitly by react-native-mmkv's
 * hooks (useMMKVString, useMMKVBoolean, …) and exposed here for imperative
 * operations like `clearAll()`.
 */
export const mmkv = createMMKV();

/**
 * 从 sessionStorage 获取数据
 * @param key 存储键名
 * @param defaultValue 默认值
 * @returns 存储的数据或默认值
 */
export const getStoredData = <T,>(key: string, defaultValue: T): T => {
  try {
    const saved = sessionStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * 保存数据到 sessionStorage
 * @param key 存储键名
 * @param value 要存储的值
 */
export const saveToStorage = (key: string, value: any): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to sessionStorage:', error);
  }
};

/**
 * 存储键名常量
 */
export const STORAGE_KEYS = {
  TABS: 'requestTabs',
  ACTIVE_TAB: 'activeTab',
} as const;

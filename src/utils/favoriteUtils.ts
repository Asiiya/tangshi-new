const FAVORITES_KEY = 'tangshi_favorites';

// 获取所有收藏的诗歌ID
export const getFavorites = (): string[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

// 检查诗歌是否已收藏
export const isFavorite = (poemId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(poemId);
};

// 切换收藏状态
export const toggleFavorite = (poemId: string): boolean => {
  const favorites = getFavorites();
  const index = favorites.indexOf(poemId);
  
  if (index === -1) {
    // 添加收藏
    favorites.push(poemId);
  } else {
    // 取消收藏
    favorites.splice(index, 1);
  }
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return index === -1; // 返回新的收藏状态
};
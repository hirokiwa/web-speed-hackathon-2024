type Params = {
  query: string;
  target: string;
};

export const isContains = ({ query, target }: Params): boolean => {
  // 全角、半角、ひらがな、カタカナを区別せずに正規化する関数
  const normalizeString = (str: string) => {
      return str
          // カタカナをひらがなに変換
          .replace(/[ァ-ヿ]/g, match => String.fromCharCode(match.charCodeAt(0) + 0x60))
          // 全角を半角に変換
          .replace(/[！-～]/g, match => String.fromCharCode(match.charCodeAt(0) - 0xfee0));
  }

  // 正規化した文字列で比較を行う
  const normalizedTarget = normalizeString(target);
  const normalizedQuery = normalizeString(query);

  // 検索を実行
  return normalizedTarget.includes(normalizedQuery);
}

import LangSwitch from "./LangSwitch";

/**
 * home/business/company は参照サイトの生HTMLをそのまま埋め込んでおり、
 * そちら側のヘッダーにはJA/EN切り替えが存在しない。ヘッダーの配色・レイアウトに
 * 依存せず常に視認できるよう、独立した固定位置バッジとして重ねて表示する。
 * LangSwitch自体が常にハードナビゲーション(<a>タグ)を使うため、
 * ここでもnext-intlのソフト遷移との競合は発生しない。
 */
export default function ReferenceLangSwitch() {
  return (
    <div className="fixed right-6 top-1/2 z-[1200] hidden -translate-y-1/2 rounded-full bg-black/80 px-fluid-sm py-2 text-white shadow-lg backdrop-blur md:block">
      <LangSwitch />
    </div>
  );
}

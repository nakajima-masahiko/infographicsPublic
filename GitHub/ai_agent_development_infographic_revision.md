AIエージェント開発プロセス・インフォグラフィック 修整案

## 目的
`GitHub/ai_agent_development_infographic.html` が `GitHub/NewAIAgentProcesses.md` の内容を正確に反映しているかを確認し、差分や表現強化のための修整案を整理する。

## 修整案（反映候補）
1. **「作業 20%」→「作業 20%未満」へ表現調整**
   - 参照元では「作業 20%未満（将来的にはさらなる自動化）」と記載されているため、インフォグラフィック側も同趣旨で表現を揃えることを推奨。`shift-box` の「次世代プロセス」内の文章を「価値定義 80% / 作業 20%未満」に変更すると原文に忠実。  
     - 原文: 「次世代: 価値定義・評価 80% + 作業 20%未満」。【F:GitHub/NewAIAgentProcesses.md†L55-L57】
     - 現状HTML: 「価値定義 80% / 作業 20%」。【F:GitHub/ai_agent_development_infographic.html†L466-L473】

2. **GitHubフローに「AIレビューの軽微変更自動承認」要素を補強**
   - 原文では GitHub Actions に加えて、AIがPRレビューを行い「軽微変更はAIレビューのみで自動承認、重要変更は人間レビュー」と判断する仕組みが示されているため、フロー内に一言補足すると内容の網羅性が向上。  
     - 原文: 「AIがPRレビュー」「軽微変更ならAIレビューのみで自動承認」等。【F:GitHub/NewAIAgentProcesses.md†L97-L103】
     - 現状HTML: PRステップは「GitHub Actionsで品質検証」まで。【F:GitHub/ai_agent_development_infographic.html†L571-L579】
   - 例: Step 4 の説明文に「AIレビューによる重要度判定」などの短い文言を追加。

3. **Slack連携の「AIサポート役（Brain）」と「実装役（Hands）」の分担を追記**
   - 原文では Slack 連携フロー内で「AIサポートエンジニア（要件整理）」と「AIエンジニア（実装）」を分担する“AIマイクロチーム”の概念を提示しているため、Slackフローの注釈や補足テキストで触れると原文の特徴が伝わりやすい。  
     - 原文: 「AIサポートエンジニア」「AIエンジニア (Devin)」などの役割分担。【F:GitHub/NewAIAgentProcesses.md†L160-L167】
     - 現状HTML: Slack → GitHub → AIエージェント → プレビュー → 承認の簡略フローのみ。【F:GitHub/ai_agent_development_infographic.html†L606-L650】
   - 例: Slackセクションの説明文に「要件整理AI（Brain）→ 実装AI（Hands）」の補足を追加。

## 影響範囲
- 文章表現の調整・補足のみ（レイアウト変更は不要）。
- 反映箇所は `GitHub/ai_agent_development_infographic.html` の本文のみ。

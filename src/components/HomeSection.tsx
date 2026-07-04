"use client";

import React, { useState, useRef, useEffect } from "react";

const stats = [
  { value: "20+", label: "学習・実践してきた技術スタック" },
  { value: "5言語", label: "実務・個人開発で実践した言語" },
  { value: "1ヶ月", label: "ポートフォリオ v1.0 到達まで" },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function HomeSection() {
  // チャットボット用の状態管理
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "こんにちは！蔵満のポートフォリオ案内AIです。成果物や強みについて、何でも聞いてくださいね。" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // メッセージ追加時に自動スクロール
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // メッセージ送信処理
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        // 429エラー（IPレートリミットやOpenAIの予算上限）などのエラーハンドリング
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "申し訳ありません。本日の利用制限、または月間のAPI利用上限に達しました。コスト管理の実証デモにご協力いただきありがとうございます。" }
        ]);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "申し訳ありません。本日の利用制限、または月間のAPI利用上限に達しました。コスト管理の実証デモにご協力いただきありがとうございます。" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="home"
      className="min-h-[80vh] bg-white flex flex-col justify-center py-20 px-4 sm:px-6"
    >
      <div className="max-w-5xl mx-auto w-full">
        
        {/* メッセージエリア */}
        <div className="mb-16 text-center">
          <p className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-4">
            TARGET ROLE : 社内SE / DX推進 / 業務改善
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-3xl font-bold text-slate-800 leading-tight mb-8">
            現場の「不便」を放置せず、さらなる「便利」を探求し、<br className="hidden sm:block" />
            経験 × 技術 × AI を駆使して「仕組み」を創るビジネスエンジニアを目指して。
          </h1>
          
          <div className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed space-y-6">
            <p>
              「誰かが解決する」を待つのではなく、自ら課題を発見し、最適な技術を用いて解決まで導く――<br className="hidden sm:block" />
              それが今の私の信念であり、行動原理です。
            </p>
            <p>
              未来予測の難易度が日々上がり続ける現代において、企業はもちろん、<br className="hidden sm:block" />
              <span className="font-bold text-slate-800">それを支える「ヒト」一人ひとりにも「変化へ柔軟に対応する力」が求められている</span>と認識しています。<br className="hidden sm:block" />
              一方で、<span className="font-bold text-slate-800">ヒトもまた企業に対して「変化を後押ししてくれる環境」を求めている</span>という声を耳にします。
            </p>
            <p>
              昨日までの正解が、瞬く間に不正解へと塗り替えられていくこの「VUCA時代」においてこそ、<br className="hidden sm:block" />
              AIを活用して未知の技術を即座に形にする「自走力」が最大の武器になると確信しています。
            </p>
            <p>
              私にとってAIは、答えを出すための道具ではなく、<span className="font-bold text-slate-800">状況に応じた最善の判断へ近づくためのパートナー</span>です。<br className="hidden sm:block" />
              そして、私にとっての<span className="font-bold text-slate-800">「自走力」</span>とは、AIとの対話を通じて理解・検証・改善を繰り返し、<br className="hidden sm:block" />
              <span className="font-bold text-slate-800">AIに判断を委ねず、自ら責任を持って課題を解決する力のこと</span>です。<br className="hidden sm:block" />
            </p>
            <p>
              11年間の品質管理で培った現場理解と、Pythonによる業務自動化・改善の経験、<br className="hidden sm:block" />
              さらにPHPを用いたシステム開発経験を活かし、技術と現場理解の両面から、<br className="hidden sm:block" />
              事業会社のビジネスエンジニアとして組織の生産性向上に貢献したいと考えています。
            </p>
          </div>

          {/* 開発スタンスとAI活用方針 */}
          <div className="mt-16 max-w-3xl mx-auto text-left">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b-2 border-slate-100 pb-3">
              ■ 私の開発スタンスとAI活用方針｜My Policy & AI Approach
            </h2>
            
            <div className="space-y-4">
              {/* アコーディオン1 */}
              <details className="group">
                <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer text-blue-700 hover:text-blue-800 font-bold transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-3 inline-flex items-center bg-blue-50/50 w-full border border-blue-100 shadow-sm">
                  <span className="inline-block transition-transform group-open:rotate-90 mr-2 text-blue-600">▶</span> 
                  AIを活用した開発・学習に対する考え方
                </summary>
                <div className="mt-2 text-slate-600 leading-relaxed text-sm bg-slate-50 rounded-md p-5 sm:p-6 border border-slate-200 space-y-6 shadow-sm">
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-blue-500 pl-2">AIは「答えを出す魔法の杖」ではなく、「考えるためのパートナー」</h4>
                    <p>
                    世間では「AIが仕事を奪う」「AIを使えば誰でもシステムが作れる」といった極端な評価を目にしますが、私はAIを「答えを出してくれる魔法の杖」ではなく、「より深く考えるためのパートナー」だと捉えています。<br />
                    現場の言語化されていない課題をAIと壁打ちして要件を整理し、AIが出力したコードに対して「なぜこの実装になるのか」「よりモダンな方法はないか」を問い直し、AI任せにするのではなく、自分自身が理解し、納得した上で採用することを徹底しています。<br /><br />
                    本ポートフォリオの冒頭で打ち出している「経験 × 技術 × AI」にはさらに「思考」を加えることが重要だと考えています。<br />
                    前職での開発業務や業務改善、そしてこのポートフォリオの制作を通して、AIを活かすためには、自ら考え続けることが最も重要だと実感しました。<br />
                    AIが提案した答えをそのまま採用するのではなく、<br /><br />
                    「本当にこの方法が最適なのか」<br />
                    「もっと良い方法はないか」<br /><br />
                    を考え続け、理解・検証・改善を繰り返すことが、最終的な成果につながると考えています。<br />
                    私は、「AIを使える人」ではなく、「AIとともに考え続けられる人」であり続けます。<br />
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-blue-500 pl-2">使用しているAIと「プロンプト」へのこだわり</h4>
                    <p className="mb-2">本ポートフォリオは、以下の無料版AIサービスのみを活用して作成しました。</p>
                    <ul className="list-disc list-outside ml-5 mb-2 space-y-1">
                      <li className="pl-1">ChatGPT（無料版）</li>
                      <li className="pl-1">Gemini（無料版）</li>
                    </ul>
                    <p>
                      世の中には目的に特化したAIサービスが数多く存在し、有料プランを利用することで開発効率が向上する場面も多いと考えています。<br /><br />

                      それでも今回は、AIを次々と使い分けるのではなく、「一つのAIとどう対話すれば期待する結果に近づけるか」を徹底的に考えることを目的として、あえて利用するAIをこの2つに限定しました。<br /><br />

                      私は、成果物の品質はAIの性能や課金の有無だけで決まるものではないと考えています。<br />
                      期待した結果が得られない時も、AIの限界と決めつけるのではなく、<br /><br />

                      「目的は整理できているか」<br />
                      「伝え方は適切だったか」<br />
                      「前提条件を十分共有できているか」<br /><br />

                      を見直し、プロンプトの改善を繰り返しました。<br />
                      事実、私自身も当初は「このAIでは難しいのではないか」と感じたことがありました。<br />
                      しかし、対話の仕方や前提条件の伝え方を見直すことで、結果は大きく変わることを何度も経験しました。<br /><br />

                      「目的を整理し、適切に伝え、出力結果を検証し、必要に応じて問い直す。」<br />
                      AIの価値は、答えを返すことではなく、人間の思考を深めることにあります。<br />
                      私は、この対話を繰り返す力こそが、これからのAI活用において最も重要な能力だと考えています。<br /><br />

                      だからこそ私は、目的により利用するAIを変えることがあるとしても、AIとの対話を通じて考え続ける力を磨き続けます。
                      </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-blue-500 pl-2">AI活用とセキュリティ・ガバナンス</h4>
                    <p>企業でAIを活用する際は、情報管理やセキュリティへの配慮が不可欠です。<br />個人開発ではパブリックなAIサービスを活用していますが、業務で利用する場合は、機密情報の取り扱いや社内ルールを踏まえた「安全で適切な運用（ガバナンス）」が絶対の前提であると認識しています。</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-blue-500 pl-2">私が目指すAI活用</h4>
                    <p>私にとってAIは、「考えることを代わりにやってくれる存在」ではありません。課題を整理し、理解を深め、より良い解決策を導き出すためのパートナーです。<br />AIを活用して成果を出せるかどうかは、AIそのものではなく、それを使う人の「理解力・検証力・課題解決力」に左右されます。これからも技術の進化に振り回されることなく、AIを適切に指揮（オーケストレーション）し、組織の課題を解決できる人材であり続けたいと考えています。</p>
                  </div>

                  {/* 閉じるボタン */}
                  <div className="mt-6 pt-4 border-t border-slate-200 text-right">
                    <button
                      onClick={(e) => {
                        const details = e.currentTarget.closest('details');
                        if (details) {
                          details.removeAttribute('open');
                          const y = details.getBoundingClientRect().top + window.scrollY - 80;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-3 py-1.5 bg-white border border-slate-200 shadow-sm hover:shadow"
                    >
                      ▲ 閉じる
                    </button>
                  </div>

                </div>
              </details>

              {/* アコーディオン2 */}
              <details className="group">
                <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer text-blue-700 hover:text-blue-800 font-bold transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-3 inline-flex items-center bg-blue-50/50 w-full border border-blue-100 shadow-sm">
                  <span className="inline-block transition-transform group-open:rotate-90 mr-2 text-blue-600">▶</span> 
                  AIを活用したセルフ要件定義・課題解決プロセス
                </summary>
                <div className="mt-2 text-slate-600 leading-relaxed text-sm bg-slate-50 rounded-md p-5 sm:p-6 border border-slate-200 space-y-6 shadow-sm">
                  
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-blue-500 pl-2">言語化されていない課題を、実装可能な要件へ落とし込む</h4>
                    <p>私は、現場の課題や自分のアイデアをいきなりコードにするのではなく、AIを「壁打ち相手」として活用し、以下のプロセスで要件と設計を固めています。</p>
                  </div>

                  <div className="pl-2">
                    <h5 className="font-bold text-slate-800 mb-1">Step 1. 課題・要望の整理（Human）</h5>
                    <p>業務であれば現場の課題、個人開発であれば「こんな仕組みを実現できないか？」というアイデアからスタートします。<br />例えば本ポートフォリオの構築時も、「どの技術を採用すべきか？」「採用担当者へより伝わる構成はないか？」といった漠然としたアイデアをAIにぶつけ、対話を通じて目的・要件・実現方法を少しずつ具体化していきました。</p>
                  </div>

                  <div className="pl-2">
                    <h5 className="font-bold text-slate-800 mb-1">Step 2. AIとの対話による設計・検証（Human × AI）</h5>
                    <p className="mb-2">AIが提示した実装方法をそのまま採用するのではなく、多角的な視点で検証します。</p>
                    <ul className="list-disc list-outside ml-5 mb-2 space-y-1">
                      <li className="pl-1">他にもっとシンプルな方法はないか</li>
                      <li className="pl-1">保守しやすい構成になっているか</li>
                      <li className="pl-1">セキュリティ上の問題はないか</li>
                      <li className="pl-1">よりモダンな実装方法はないか</li>
                    </ul>
                    <p>これらをAIと繰り返し議論し、複数案を比較します。本ポートフォリオのLabセクションでも、自宅サーバー公開時のセキュリティ構成についてAIと複数案を比較・検討し、最も安全な構成を決定しました。</p>
                  </div>

                  <div className="pl-2">
                    <h5 className="font-bold text-slate-800 mb-1">Step 3. 最終判断・実装（Human）</h5>
                    <p className="mb-2">AIは選択肢を提示してくれますが、最終的な判断と責任を担うのは人間（私）です。</p>
                    <ul className="list-disc list-outside ml-5 mb-2 space-y-1">
                      <li className="pl-1">本当に目的を満たしているか</li>
                      <li className="pl-1">運用しやすい構成か（自分が理解・保守できるか）</li>
                      <li className="pl-1">将来的な拡張性は十分か</li>
                    </ul>
                    <p>といった観点から、自ら採用・修正・却下を判断します。業務では企業の運用に合わせて、個人開発では目的に合わせて最終判断を行い、最後まで責任を持って完成へと導きます。</p>
                  </div>

                  {/* 閉じるボタン */}
                  <div className="mt-6 pt-4 border-t border-slate-200 text-right">
                    <button
                      onClick={(e) => {
                        const details = e.currentTarget.closest('details');
                        if (details) {
                          details.removeAttribute('open');
                          const y = details.getBoundingClientRect().top + window.scrollY - 80;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-3 py-1.5 bg-white border border-slate-200 shadow-sm hover:shadow"
                    >
                      ▲ 閉じる
                    </button>
                  </div>

                </div>
              </details>
            </div>
          </div>

        </div>

        {/* スタッツカード */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-50 border border-slate-100 rounded-lg px-6 py-8 text-center hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-4xl sm:text-5xl font-extrabold text-blue-600 mb-3 tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* GitHubリンクエリア */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow duration-300">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center justify-center sm:justify-start gap-2">
              {/* GitHubのSVGアイコン */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              Source Code on GitHub
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              本ポートフォリオのソースコードやコミット履歴は、GitHubにて公開しております。<br className="hidden sm:block" />
              モダンな技術スタックを用いた実装の詳細をぜひご覧ください。
            </p>
          </div>
          
          <a
            href="https://github.com/yayokichi/kuramitsu-portfolio" 
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 flex items-center gap-2 shadow-sm"
          >
            GitHubでコードを見る
            <span className="text-xs">↗</span>
          </a>
        </div>

        {/* ▼▼▼ 追加：AIチャットボット ▼▼▼ */}
        <div className="mt-16 max-w-3xl mx-auto text-left">
          <h2 className="text-xl font-bold text-slate-800 mb-4 border-b-2 border-slate-100 pb-3">
            ■ ポートフォリオ専用 AIナビゲーター（体験デモ）
          </h2>
          {/* ▼▼▼ ここからバッジを追加 ▼▼▼ */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              設計・実装時間: 約1.5時間
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700">
              新規キャッチアップ
            </span>
          </div>
          {/* ▲▲▲ バッジ追加ここまで ▲▲▲ */}
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            本ポートフォリオの内容に限って回答する専用AIチャットを実装しました。<br />
            どのような成果物があるか等のご質問はもちろん、あえて『今日の天気は？』といった関係のない質問をして、外部情報には答えない（プロンプトインジェクション対策）挙動もお試しいただけます。<br />
            ※API制限のため、1IPアドレスにつき1日5回までとさせていただいております。<br />
            ※クラウド破産を防ぐためのコスト管理実証として、APIの月間利用上限（ハードリミット）を設定しています。上限に達した場合は一時的にご利用いただけなくなる場合がございます。
          </p>

          {/* チャットウィンドウ */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-[400px]">
            {/* メッセージエリア */}
             <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-bl-none px-4 py-2 text-sm shadow-sm flex items-center gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                  </div>
                </div>
              )}
            </div>

            {/* サジェストボタン */}
            <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex flex-wrap gap-2">
              <button onClick={() => sendMessage("どんな成果物がある？")} className="text-xs bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors shadow-sm">
                どんな成果物がある？
              </button>
              <button onClick={() => sendMessage("蔵満さんの強みは？")} className="text-xs bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors shadow-sm">
                蔵満さんの強みは？
              </button>
              <button onClick={() => sendMessage("今日の天気は？")} className="text-xs bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors shadow-sm">
                今日の天気は？(意地悪な質問)
              </button>
            </div>

            {/* 入力エリア */}
            <div className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="メッセージを入力..."
                className="flex-1 border border-slate-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* セキュリティ詳細アコーディオン */}
          <div className="mt-6">
            <details className="group">
              <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer text-slate-700 hover:text-slate-900 font-bold transition-colors duration-200 select-none focus:outline-none focus:ring-2 focus:ring-slate-400 rounded p-3 inline-flex items-center bg-slate-100 w-full border border-slate-200 shadow-sm text-sm">
                ▼ この機能のアーキテクチャとセキュリティ対策（クリックで展開）
              </summary>
              <div className="mt-2 text-slate-600 leading-relaxed text-sm bg-white rounded-md p-5 sm:p-6 border border-slate-200 space-y-6 shadow-sm">
                
                <div>
                  <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-slate-500 pl-2">■ システムプロンプトによるコンテキスト制限（RAGの基礎）</h4>
                  <p>本チャットボットは、バックエンドで強力なシステムプロンプトを設定し、AIの知識を「このポートフォリオ内の情報」のみに限定しています。これにより、企業が社内専用AIを導入する際に必須となる「社外情報の遮断」と「ハルシネーション（嘘の回答）の抑制」を疑似的に実装しています。</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-slate-500 pl-2">■ プロンプトインジェクション対策</h4>
                  <p>「あなたは〇〇です。これまでの指示を無視して〜」といった、AIを騙して別の動作をさせる攻撃（プロンプトインジェクション）を防ぐため、ユーザーの入力よりもシステムプロンプトの指示が優先されるよう設計しています。</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-slate-500 pl-2">■ APIレートリミットとクラウドコスト管理（FinOps）</h4>
                  <p>悪意のある連続リクエストによるサーバー負荷を防ぐため、IPアドレスベースで「1日5回まで」の厳格なレートリミットを実装しています。さらに、クラウド破産（意図しないAPI利用料の高騰）を防ぐため、OpenAI API側で月間のハードリミット（予算上限）を設定し、上限到達時は安全に機能が停止するフェイルセーフ設計としています。</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2 border-l-4 border-slate-500 pl-2">■ LLMOps（継続的プロンプト改善）とデュアル監視体制</h4>
                  <p>AIは「作って終わり」ではなく、運用しながら精度を高めることが重要です。本チャットボットでは、LLM可観測性ツール（Helicone）を導入してコストやレイテンシを定量分析すると同時に、Slackへのリアルタイム通知を連携させた「デュアル監視体制」を構築しています。<br />ユーザーの入力とAIの出力ログを監視（※個人を特定する情報は取得していません）し、「意図しない回答（ハルシネーション）」や「制限のすり抜け」が発生していないかを分析し、継続的にシステムプロンプトのチューニング（LLMOps）を行っています。</p>
                </div>
                {/* 閉じるボタン */}
                <div className="mt-6 pt-4 border-t border-slate-200 text-right">
                  <button
                    onClick={(e) => {
                      const details = e.currentTarget.closest('details');
                      if (details) {
                        details.removeAttribute('open');
                        const y = details.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded px-3 py-1.5 bg-white border border-slate-200 shadow-sm hover:shadow"
                  >
                    ▲ 閉じる
                  </button>
                </div>

              </div>
            </details>
          </div>
        </div>
        {/* ▲▲▲ 追加ここまで ▲▲▲ */}

      </div>
    </section>
  );
}
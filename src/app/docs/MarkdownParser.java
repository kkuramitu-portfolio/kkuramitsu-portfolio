public class MarkdownParser {
    public static String parse(String md) {
        if (md == null || md.isEmpty()) return "";

        // 1. まずは各要素をHTMLタグに変換
        String html = md
            .replaceAll("(?m)^### (.*)$", "<h3>$1</h3>")
            .replaceAll("(?m)^## (.*)$", "<h2>$1</h2>")
            .replaceAll("(?m)^# (.*)$", "<h1>$1</h1>")
            .replaceAll("(?m)^    - (.*)$", "<li style='margin-left: 30px; list-style-type: square;'>$1</li>")
            .replaceAll("(?m)^  - (.*)$", "<li style='margin-left: 10px; list-style-type: circle;'>$1</li>")
            .replaceAll("(?m)^- (.*)$", "<li style='margin-left: -10px; list-style-type: disc;'>$1</li>");

        // 2. 見出し(h1~h3)やリスト(li)の「閉じタグの直後」にある改行を1つだけ削除する
        // ※Javaの正規表現では、JSの /g (グローバルマッチ) は replaceAll を使うことで自動的に適用されます
        html = html.replaceAll("(</h[1-3]>|</li>)\n", "$1");

        // 3. 残った改行を <br> に変換
        return html.replace("\n", "<br>");
    }
}
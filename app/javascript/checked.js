function check() {
  // 表示されているすべてのメモを取得している↑
  // cssでのクラス名（セレクタ名）↓
  const posts = document.querySelectorAll(".post");
  // 複数取得した要素に対して、forEachで繰り返し処理を行い要素1つずつに対して処理↓
  posts.forEach(function (post) {
    // 重複したイベント発火を回避
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    // 要素にdata-load = "true"と属性を追加
    post.setAttribute("data-load", "true");
    // 要素1つずつに対して、クリックした際に動作するイベント駆動
    post.addEventListener("click", () => {
      // どのメモをクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスのタイプを指定する
      XHR.responseType = "json";
      // sendでリクエストを送信する
      XHR.send();
      // レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        if (XHR.status != 200) {
          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了している
          return null;          
        }
        // レスポンスされたデータを変数itemに代入している
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
// window.addEventListener("load", check);だとページを読み込むごとに実行される関数なので、一定の時間ごとに自動でcheckを実行する仕様に変更するためにsetIntervalを使う
setInterval(check, 1000);

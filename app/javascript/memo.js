function memo () {
  // idがありますので、getElementByIdを用いて「投稿する」ボタンの情報
  const submit = document.getElementById("submit");
  // 投稿するボタンを「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
  // FormDataとsendを使用して、メモ投稿のフォームに入力された情報を送信
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // openメソッドを使用して、リクエストの内容を引数へ,HTTPメソッドはPOST、パスは/posts、非同期通信はtrue
    XHR.open("POST", "/posts", true);
    // 返却されるデータ形式はJSON
    XHR.responseType = "json";
    // FormDataとsendを使用して、メモ投稿のフォームに入力された情報を送信
    XHR.send(formData);
    XHR.onload = () => {
      // 200以外のHTTPステータスが返却された場合の処理
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      // itemは、レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // listは,HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // formTextを取得する理由は、メモの入力フォームをリセットするため。この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、リセットする必要があり,ここではリセット対象の要素であるcontentという要素を取得
      const formText = document.getElementById("content");
      // メモとして描画する部分のHTMLを定義している。HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画される
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // listという要素に対して、insertAdjacentHTMLでHTMLを追加し、第一引数にafterendを指定することで、要素listの直後に挿入できる
      list.insertAdjacentHTML("afterend", HTML);
      // このコードにより、「メモの入力フォームに入力されたままの文字」はリセットされ、正確には、空の文字列に上書きされる
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);
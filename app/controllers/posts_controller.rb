class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    # メモ作成時に未読の情報を保存する
    post = Post.create(content: params[:content], checked: false)
    # Ajaxを実現するためレスポンスをJSONに変更
    render json:{ post: post }
  end

  def checked
    # binding.pry
    post = Post.find(params[:id])
    if post.checked 
      # 既読であれば「既読を解除するためにfalseへ変更」
      post.update(checked: false)
    else
      # 既読でなければ「既読にするためtrueへ変更」
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end

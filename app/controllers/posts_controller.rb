class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
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
